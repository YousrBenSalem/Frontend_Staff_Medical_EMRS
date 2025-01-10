import Lyout from "../components/lyout/Lyout";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { message, Modal } from "antd";

const localizer = momentLocalizer(moment);

function CalendarAddAppointement() {
  const [messageApi, contextHolder] = message.useMessage();
  const { patientId } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [patient, setPatient] = useState(null);
  const { user } = useSelector((state) => state.user);
  const doctorId = user.doctorId ? user.doctorId : user._id;
  console.log(doctorId);
  const modalRef = useRef(null);
  const [appointments, setAppointments] = useState([]);
  const [eventsCountByDate, setEventsCountByDate] = useState({});
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/patient/patients/${patientId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setPatient(response.data.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du patient:",
          error
        );
      }
    };

    fetchPatientDetails();
  }, [patientId]);
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
            start: startDate,
            end: endDate,
            title: appointment.FollowUpPurpose,
          };
        });

        // Calculate the number of events per day
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
  }, []);
  const handleDateSelect = (date) => {
    console.log("Selected Date:", date);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const [formData, setFormData] = useState({
    name: "",
    icuPdFileNumber: "",
    AppointmentDate: "",
    AppointmentType: "",
    FollowUpPurpose: "",
    ABG: false,
    Polygraphy: false,
    chestFilm: false,
    Downloads: false,
    PFT: false,
    patientId: patientId,
    doctorId: user._id,
  });
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
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const isTimeSlotAvailable = (newStart, newEnd) => {
    return !appointments.some((appointment) => {
      return (
        (newStart >= appointment.start && newStart < appointment.end) ||
        (newEnd > appointment.start && newEnd <= appointment.end) ||
        (newStart <= appointment.start && newEnd >= appointment.end)
      );
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const getValue = (field) => event.target[field]?.value || "";
    const getCheckbox = (field) => event.target[field]?.checked || false;

    const formValue = {
      name: getValue("name"),
      icuPdFileNumber: getValue("icuPdFileNumber"),
      AppointmentDate: getValue("AppointmentDate"),
      start: getValue("start"),
      end: getValue("end"),
      AppointmentType: getValue("AppointmentType"),
      FollowUpPurpose: getValue("FollowUpPurpose"),
      ABG: getCheckbox("ABG"),
      Polygraphy: getCheckbox("Polygraphy"),
      chestFilm: getCheckbox("chestFilm"),
      Downloads: getCheckbox("Downloads"),
      PFT: getCheckbox("PFT"),
      doctorId: user.doctorId ? user.doctorId : user._id,
    };
    // Convert start and end times to Date objects for comparison
    const startDate = new Date(
      `${formValue.AppointmentDate}T${formValue.start}`
    );
    const endDate = new Date(`${formValue.AppointmentDate}T${formValue.end}`);
    // Check if the time slot is available
    if (!isTimeSlotAvailable(startDate, endDate)) {
      messageApi.open({
        type: "error",
        content:
          "The selected time slot is not available. Please choose a different time.",
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/appointment/${patientId}/createAppointment`,
        formValue,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        messageApi.open({
          type: "success",
          content: "Appointment added with success",
        });
        console.log("Appointment saved:", response.data);
      } else {
        messageApi.open({
          type: "error",
          content: "Appointment didn't add with success",
        });
      }

      setModalIsOpen(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }

    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const formatTime = (time) => {
    if (!time) return "";
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <Lyout>
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
          dayPropGetter={dayPropGetter} // Add this prop
        />
      </div>
      <Modal
        title="Create a new follow-up appointment"
        visible={modalIsOpen}
        onCancel={handleModalClose}
        footer={null}
        width={720}
      >
        <form onSubmit={handleFormSubmit} className="p-4 md:p-5">
          {contextHolder}
          {patient ? (
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Name / Surname
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={
                      formData.name ||
                      patient.History?.PatientDemographics?.name
                    }
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    placeholder="Patient Name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="icuPdFileNumber"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    ICU/PD File number
                  </label>
                  <input
                    type="text"
                    name="icuPdFileNumber"
                    id="icuPdFileNumber"
                    onChange={handleChange}
                    value={
                      formData.icuPdFileNumber ||
                      patient.History?.ID?.icuPdFileNumber
                    }
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    placeholder="ICU/PD File number"
                    required=""
                  />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="AppointmentDate"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="AppointmentDate"
                    id="AppointmentDate"
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.AppointmentDate || formatDate(selectedDate)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="AppointmentType"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Appointment Type
                  </label>
                  <input
                    type="text"
                    name="AppointmentType"
                    id="AppointmentType"
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.AppointmentType}
                    required=""
                  />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="AppointmentTimeStart"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Appointment&apos;s time start
                  </label>
                  <input
                    type="time"
                    name="start"
                    id="start"
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.start || formatTime(selectedTime)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="appointmentTimeend"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Appointment&apos;s Time end
                  </label>
                  <input
                    type="time"
                    name="end"
                    id="end"
                    className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-500"
                    onChange={handleChange}
                    value={formData.end || formatTime(selectedTime)}
                    required=""
                  />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="Follow-upPurpose"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Follow-up Purpose
                  </label>
                  <select
                    onChange={handleChange}
                    value={formData.FollowUpPurpose}
                    name="FollowUpPurpose"
                    id="FollowUpPurpose"
                    className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400"
                  >
                    <option value="" disabled>
                      Select Follow-up Purpose
                    </option>

                    <option value="Regular Check">Regular check</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Check After A Treatment">
                      Check after a treatment
                    </option>
                    <option value="Modification">Modification</option>
                    <option value="Insurance Request">Insurance request</option>
                  </select>
                </div>
                <div>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-black">
                      Biomarkers needed
                    </legend>
                    <div className="space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="ABG"
                            name="ABG"
                            checked={formData.ABG || false}
                            onChange={handleChange}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="ABG"
                            className="font-medium text-gray-900"
                          >
                            ABG
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="Polygraphy"
                            name="Polygraphy"
                            checked={formData.Polygraphy || false}
                            onChange={handleChange}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="Polygraphy"
                            className="font-medium text-gray-900"
                          >
                            Polygraphy
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="chestFilm"
                            name="chestFilm"
                            checked={formData.chestFilm || false}
                            onChange={handleChange}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="chestFilm"
                            className="font-medium text-gray-900"
                          >
                            Chest Film
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="Downloads"
                            name="Downloads"
                            checked={formData.Downloads || false}
                            onChange={handleChange}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="Downloads"
                            className="font-medium text-gray-900"
                          >
                            Downloads
                          </label>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="PFT"
                            name="PFT"
                            checked={formData.PFT || false}
                            onChange={handleChange}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="PFT"
                            className="font-medium text-gray-900"
                          >
                            Pulmonary Functional Testing (PFT)
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          ) : (
            <p>Chargement des détails du patient...</p>
          )}

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save appointment
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </Lyout>
  );
}

export default CalendarAddAppointement;
