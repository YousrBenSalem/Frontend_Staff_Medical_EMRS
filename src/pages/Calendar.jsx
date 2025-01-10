import { useState, useEffect } from "react";
import Layout from "../components/lyout/Lyout";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, List, Typography, Divider } from "antd";
import { useSelector } from "react-redux";

const { Text } = Typography;

const localizer = momentLocalizer(moment);

function Calender() {
  const [appointments, setAppointments] = useState([]);
  const [eventsCountByDate, setEventsCountByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
    useState([]);
  const { user } = useSelector((state) => state.user);
  const doctorId = user.doctorId ? user.doctorId : user._id;
  console.log(doctorId);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointment/getAppointment",
          {
            params: { doctorId },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const appointmentsData = response.data.data.appointments;

        if (!appointmentsData || !Array.isArray(appointmentsData)) {
          throw new Error("Appointments data is invalid or not found");
        }

        const formattedAppointments = appointmentsData.map((appointment) => {
          const date = new Date(appointment.AppointmentDate);
          const startTime = appointment.start.split(":");
          const endTime = appointment.end.split(":");

          const startDate = new Date(date);
          startDate.setHours(startTime[0], startTime[1]);

          const endDate = new Date(date);
          endDate.setHours(endTime[0], endTime[1]);

          return {
            id: appointment._id,
            name: appointment.name,
            icuPdFileNumber: appointment.icuPdFileNumber,
            start: startDate,
            end: endDate,
            AppointmentType: appointment.AppointmentType,
            ABG: appointment.Biomarkers.ABG,
            Polygraphy: appointment.Biomarkers.Polygraphy,
            ChestFilm: appointment.Biomarkers.ChestFilm,
            Downloads: appointment.Biomarkers.Downloads,
            PFT: appointment.Biomarkers.PFT,
            title: appointment.FollowUpPurpose,
            patientId: appointment.patientId, // Assuming patientId is part of appointment
          };
        });

        const countByDate = formattedAppointments.reduce((acc, appointment) => {
          const date = moment(appointment.start).format("YYYY-MM-DD");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        setEventsCountByDate(countByDate);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [user._id]);

  const handleDateSelect = (date) => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const selectedAppointments = appointments.filter(
      (appointment) =>
        moment(appointment.start).format("YYYY-MM-DD") === dateStr
    );
    setSelectedDate(date);
    setAppointmentsForSelectedDate(selectedAppointments);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAppointmentClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const eventComponent = ({ event }) => <div>{event.title}</div>;

  const dayPropGetter = (date) => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const eventCount = eventsCountByDate[dateStr] || 0;
    let style = {};

    if (eventCount > 0 && eventCount < 9) {
      style = { backgroundColor: "orange" };
    } else if (eventCount >= 9) {
      style = { backgroundColor: "red" };
    }

    return {
      style,
    };
  };

  return (
    <Layout>
      <div style={{ position: "relative", marginTop: "10px" }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "650px" }}
          components={{
            event: eventComponent,
          }}
          onSelectSlot={(slotInfo) =>
            handleDateSelect(new Date(slotInfo.start))
          }
          selectable={true}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          dayPropGetter={dayPropGetter}
        />
      </div>
      <Modal
        title={`Appointments for ${
          selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""
        }`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800} // Adjust modal width
        bodyStyle={{ padding: "20px" }} // Add padding to modal body
      >
        <List
          dataSource={appointmentsForSelectedDate}
          renderItem={(appointment) => (
            <List.Item
              onClick={() => handleAppointmentClick(appointment.patientId)} // Handle click
              style={{
                cursor: "pointer",
                border: "1px solid #e8e8e8", // Light border
                borderRadius: "8px", // Rounded corners
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
                backgroundColor: "#fff", // Background color
              }}
            >
              <div>
                <Text strong style={{ fontSize: "16px" }}>
                  {appointment.title}
                </Text>
                <Divider style={{ margin: "10px 0" }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text strong>Name:</Text> {appointment.name} <br />
                    <Text strong>ICU PD File Number:</Text>{" "}
                    {appointment.icuPdFileNumber} <br />
                    <Text strong>Appointment Type:</Text>{" "}
                    {appointment.AppointmentType} <br />
                    <Text strong>From:</Text>{" "}
                    {moment(appointment.start).format("HH:mm")} <br />
                    <Text strong>To:</Text>{" "}
                    {moment(appointment.end).format("HH:mm")} <br />
                  </div>
                  <div>
                    <Text strong>Biomarkers:</Text> <br />
                    <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                      <li>
                        <Text>ABG: {appointment.ABG ? "Yes" : "No"}</Text>
                      </li>
                      <li>
                        <Text>
                          Polygraphy: {appointment.Polygraphy ? "Yes" : "No"}
                        </Text>
                      </li>
                      <li>
                        <Text>
                          Chest Film: {appointment.ChestFilm ? "Yes" : "No"}
                        </Text>
                      </li>
                      <li>
                        <Text>
                          Downloads: {appointment.Downloads ? "Yes" : "No"}
                        </Text>
                      </li>
                      <li>
                        <Text>PFT: {appointment.PFT ? "Yes" : "No"}</Text>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </Layout>
  );
}

export default Calender;
