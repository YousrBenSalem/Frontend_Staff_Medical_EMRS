import Lyout from "../components/lyout/Lyout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Empty, Pagination, message, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const [patientsPerPage] = useState(7); // Nombre de patients par page
  const { user } = useSelector((state) => state.user);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = user._id;
  const dropdownRef = useRef(null);
  const toggleDropdown = (index) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null);
    } else {
      setVisibleDropdown(index);
    }
  };

  useEffect(() => {
    fetchPatients();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisibleDropdown(null);
    }
  };
  console.log(user._id);
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/patient/Patients",
        {
          params: { userId: user._id },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data && response.data.data) {
        const patientsWithAppointments = await Promise.all(
          response.data.data.map(async (patient) => {
            const appointmentsResponse = await axios.get(
              `http://localhost:3000/api/appointment/${patient._id}/getAppointment`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            const appointments = appointmentsResponse.data.data;
            const nextAppointment = getNextAppointment(appointments);

            return { ...patient, nextAppointment };
          })
        );

        setPatients(patientsWithAppointments);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des patients:", error);
    }
  };
  const getNextAppointment = (appointments) => {
    const futureAppointments = appointments.filter(
      (appointment) => new Date(appointment.AppointmentDate) >= new Date()
    );

    if (futureAppointments.length === 0) return null;

    futureAppointments.sort(
      (a, b) => new Date(a.AppointmentDate) - new Date(b.AppointmentDate)
    );
    return futureAppointments[0];
  };
  const deletePatient = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/patient/Patient/${patientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete patient: ${response.statusText}`);
      }
      if (response.ok) {
        messageApi.open({
          type: "success",
          content: "Patient deleted successfully",
        });
      }
      const updatedPatients = patients.filter(
        (patient) => patient._id !== patientId
      );
      setPatients(updatedPatients);
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const name = patient?.History?.PatientDemographics?.name || "";
    const cnamId = patient?.History?.Insurance?.cnamId || "";
    const icuPdFileNumber = patient?.History?.ID?.icuPdFileNumber || "";
    const icuPdDischargeDate = patient?.History?.ID?.icuPdDischargeDate || "";
    const appointment = patient?.nextAppointment?.AppointmentDate || "";
    const chronicDiseases =
      patient?.History?.underlyingConditions?.chronicDiseases || "";
    const provider = patient?.History?.Insurance?.provider || "";
    const otherProvider = patient?.History?.Insurance?.otherProvider || "";

    const searchTermLower = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(searchTermLower) ||
      cnamId.toLowerCase().includes(searchTermLower) ||
      icuPdFileNumber.toLowerCase().includes(searchTermLower) ||
      icuPdDischargeDate.toLowerCase().includes(searchTermLower) ||
      appointment.toLowerCase().includes(searchTermLower) ||
      chronicDiseases.toLowerCase().includes(searchTermLower) ||
      provider.toLowerCase().includes(searchTermLower) ||
      otherProvider.toLowerCase().includes(searchTermLower)
    );
  });

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const paginatedPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const showDeleteConfirm = (patientId) => {
    setPatientToDelete(patientId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await deletePatient(patientToDelete);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const downloadExcel = async () => {
    const response = await fetch(
      `http://localhost:3000/api/patient/download-excel/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "patients_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      console.error("Failed to download the file");
    }
  };
  const downloadConsultationExcel = async () => {
    const response = await fetch(
      "http://localhost:3000/api/Consultations/download-consultations-excel",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "consultations_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      console.error("Failed to download the file");
    }
  };
  return (
    <Lyout>
      <section className="p-3 sm:p-5 overflow-y-auto ">
        <div className="w-full lg:px-12 scroll sm:scroll">
          <div className="bg-whiterelative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4">
              <div className="w-full md:w-1/2">
                {contextHolder}
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      placeholder="Search patients"
                      required=""
                      className="border-black text-black text-sm rounded-lg block w-full pl-10 p-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-between">
                <Button
                  type="primary"
                  onClick={downloadExcel}
                  style={{ marginLeft: "10px" }}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    style={{ marginRight: "8px" }}
                  />
                  Download Patient Data
                </Button>
                <Button
                  type="primary"
                  onClick={downloadConsultationExcel}
                  style={{ marginLeft: "10px" }}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    style={{ marginRight: "8px" }}
                  />
                  Download Consultation Data
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredPatients.length === 0 ? (
                <Empty className="py-10" description="No Patients Found" />
              ) : (
                <>
                  <table className="w-full text-sm text-left text-black">
                    <thead className="text-xs text-black uppercase bg-gray-200 ">
                      <tr>
                        <th scope="col" className="px-4 py-3"></th>
                        <th scope="col" className="px-4 py-3">
                          Name/Surname
                        </th>
                        <th scope="col" className="px-4 py-3">
                          CNAM ID
                        </th>
                        <th scope="col" className="px-4 py-3">
                          ICU/PD file Number
                        </th>
                        <th scope="col" className="px-4 py-3">
                          ICU/PD discharge date
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Next appointment
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Chronic disease
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Provider
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPatients.length === 0 ? (
                        <tr>
                          <td colSpan="8">
                            <Empty />
                          </td>
                        </tr>
                      ) : (
                        paginatedPatients.map((patient, index) => (
                          <tr
                            className="border-b dark:border-gray-700"
                            key={patient._id}
                          >
                            <td className="px-3 py-3">
                              {/* Affichez la photo du patient */}
                              {patient.History.PatientDemographics
                                .patientPhoto ? (
                                <img
                                  src={`http://localhost:3000/api/patient/uploads/${patient?.History?.PatientDemographics?.patientPhoto}`}
                                  alt="Patient Photo"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300"></div> // Placeholder
                              )}
                            </td>
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-black whitespace-nowrap "
                            >
                              {patient.History.PatientDemographics.name}
                            </th>
                            <td className="px-4 py-3">
                              {patient.History.Insurance.cnamId}
                            </td>
                            <td className="px-4 py-3">
                              {patient.History.ID.icuPdFileNumber}
                            </td>
                            <td className="px-4 py-3">
                              {patient.History.ID.icuPdDischargeDate
                                ? new Date(
                                    patient.History.ID.icuPdDischargeDate
                                  ).toLocaleDateString()
                                : "No Date"}
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment
                                ? new Date(
                                    patient.nextAppointment.AppointmentDate
                                  ).toLocaleDateString()
                                : "No appointment"}
                            </td>
                            <td className="px-4 py-3">
                              {
                                patient.History.underlyingConditions
                                  .chronicDiseases
                              }
                            </td>
                            <td className="px-4 py-3">
                              {patient.History.Insurance.provider
                                ? patient.History.Insurance.provider
                                : patient.History.Insurance.otherProvider}
                            </td>

                            <td className="px-4 py-3 flex items-center justify-end ">
                              <button
                                id="DropdownButton"
                                onClick={() => toggleDropdown(index)}
                                data-dropdown-toggle="DropdownButton"
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-black hover:text-gray-800 rounded-lg focus:outline-none "
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6 10a4 4 0 100-8 4 4 0 000 8zm4-4a4 4 0 100 8 4 4 0 000-8zM2 6a6 6 0 1112 0 6 6 0 01-12 0z"
                                  />
                                </svg>
                                <span className="sr-only">Actions</span>
                              </button>
                              <div
                                id="DropdownButton"
                                className={`${
                                  visibleDropdown === index ? "block" : "hidden"
                                } absolute z-10 my-4 mr-8 list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                              >
                                <ul
                                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="DropdownButton"
                                >
                                  <li>
                                    <Link
                                      to={`/patient/${patient._id}`}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Show
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/edit-patient/${patient._id}`}
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        showDeleteConfirm(patient._id)
                                      }
                                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    current={currentPage}
                    pageSize={patientsPerPage}
                    total={filteredPatients.length}
                    onChange={(page) => setCurrentPage(page)}
                    className="my-4"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this patient?</p>
      </Modal>
    </Lyout>
  );
}

export default PatientsList;
