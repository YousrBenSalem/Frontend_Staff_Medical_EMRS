import Layout from "../components/lyout/Lyout";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);
function Calender() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointment/getAppointment"
        );
        const appointmentsData = response.data.data.appointments;

        if (!appointmentsData || !Array.isArray(appointmentsData)) {
          throw new Error("Appointments data is invalid or not found");
        }

        const formattedAppointments = appointmentsData.map((appointment) => ({
          id: appointment._id,
          start: moment(appointment.start).add(1, "hours").toDate(),
          end: moment(appointment.end).add(1, "hours").toDate(),
          title: appointment.followUpPurpose,
        }));
        console.log(
          formattedAppointments.map((appointment) => appointment.title)
        );

        console.log(formattedAppointments);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
  };

  const eventComponent = ({ event }) => <div>{event.title}</div>;

  return (
    <Layout>
      <div style={{ position: "relative" }}>
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
          onSelectEvent={(event) => alert(event.title)}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        />
      </div>
    </Layout>
  );
}

export default Calender;
