import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Lyout from "../components/lyout/Lyout";

import { Button, Empty, Pagination } from "antd";

function PatientDetails() {
  const { patientId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [patient, setPatient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [searchNotificationTerm, setSearchNotificationTerm] = useState("");

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(5);

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [consultationPerPage] = useState(5);
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null);
    } else {
      setVisibleDropdown(index);
    }
  };

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
    const fetchPatientConsultation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/consultations/patient/${patientId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.data && response.data.data) {
          setConsultations(response.data.data);
          console.log(response.data.data);
        } else {
          setConsultations([]);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des rendez-vous du patient:",
          error
        );
        setLoading(false);
      }
    };
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notification/patient/${patientId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setNotifications(response.data.data);
        setLoadingNotifications(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des notifications:",
          error
        );
        setLoadingNotifications(false);
      }
    };
    fetchPatientDetails();
    fetchPatientConsultation();
    fetchNotifications();
  }, [patientId]);
  const handleAddConsultationClick = () => {
    navigate(`/patient/${patientId}/add-consultation`);
  };

  const deleteConsultation = async (consultationId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/consultations/${consultationId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const updatedConsultations = consultations.filter(
        (consultation) => consultation._id !== consultationId
      );
      setConsultations(updatedConsultations);
    } catch (error) {
      console.error("Failed to delete consultation:", error);
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const doctorName = consultation.PatientFollowUpFindings?.doctorName || "";
    const showUpDate =
      new Date(
        consultation.PatientFollowUpFindings?.showUpDate
      ).toLocaleDateString() || "";
    const PH =
      consultation?.Biomarkers?.PH !== undefined
        ? consultation.Biomarkers.PH.toString()
        : "";
    const pCO2 =
      consultation?.Biomarkers?.pCO2 !== undefined
        ? consultation.Biomarkers.pCO2.toString()
        : "";
    const PO2 =
      consultation?.Biomarkers?.PO2 !== undefined
        ? consultation.Biomarkers.PO2.toString()
        : "";
    const searchTermLower = searchTerm.toLowerCase();

    return (
      doctorName.toLowerCase().includes(searchTermLower) ||
      showUpDate.toLowerCase().includes(searchTermLower) ||
      PH.toLowerCase().includes(searchTermLower) ||
      pCO2.toLowerCase().includes(searchTermLower) ||
      PO2.toLowerCase().includes(searchTermLower)
    );
  });
  // Pagination logic
  const indexOfLastConsultation = currentPage * consultationPerPage;
  const indexOfFirstConsultation =
    indexOfLastConsultation - consultationPerPage;
  const paginatedConsultations = filteredConsultations.slice(
    indexOfFirstConsultation,
    indexOfLastConsultation
  );
  const getRenewalDate = () => {
    const dischargeDate = new Date(
      patient?.icuPdDischarge?.Autonomy?.DateOfDischarge
    );
    const currentDate = new Date();
    let renewalDate = new Date(dischargeDate);

    while (renewalDate <= currentDate) {
      renewalDate.setDate(renewalDate.getDate() + 180);
    }
    return renewalDate.toLocaleDateString();
  };
  // Filtrer les notifications en fonction du terme de recherche
  useEffect(() => {
    const result = notifications.filter((notification) => {
      const detail = notification.detail;
      const type = notification.type;
      const searchNotificationLower = searchNotificationTerm.toLowerCase();
      return (
        detail.toLowerCase().includes(searchNotificationLower) ||
        type.toLowerCase().includes(searchNotificationLower)
      );
    });

    setFilteredNotifications(result);
  }, [searchNotificationTerm, notifications]);

  // Pagination des notifications
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  return (
    <Lyout>
      <div>
        {patient ? (
          <div>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="md:shrink-0 mt-8">
                  {patient?.History?.PatientDemographics?.patientPhoto ? (
                    <Link to={`/profilePatient/${patientId}`}>
                      <img
                        alt={
                          patient?.History?.PatientDemographics?.name ||
                          "Patient photo"
                        }
                        src={`http://localhost:3000/api/patient/uploads/${patient?.History?.PatientDemographics?.patientPhoto}`}
                        className="w-56 h-80 object-cover rounded-lg border border-gray-300 shadow-md"
                      />
                    </Link>
                  ) : (
                    <Link to={`/profilePatient/${patient?._id}`}>
                      <div className="w-56 h-80 flex items-center justify-center border border-gray-300 rounded-lg">
                        <span className="text-gray-500">No Photo</span>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Name :
                    <span className=" ml-2">
                      {patient?.History?.PatientDemographics?.name}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-500 font-semibold">
                    DIAGNOSIS:
                    <span className=" ml-2 font-normal">
                      {patient?.History?.underlyingConditions?.chronicDiseases}
                    </span>
                  </p>
                  <div className="mt-2 text-slate-500 font-semibold">
                    <p>Ventilatory Support During Acute Setting:</p>
                    <ul>
                      <li>
                        O2:
                        <span className=" ml-2 font-normal">
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting?.O2
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        NIV:
                        <span className=" ml-2 font-normal">
                          {" "}
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting?.NIV
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        CPAP:
                        <span className=" ml-2 font-normal">
                          {" "}
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting?.CPAP
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        HFNC:
                        <span className=" ml-2 font-normal">
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting?.HFNC
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        IMV:
                        <span className=" ml-2 font-normal">
                          {" "}
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting?.IMV
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                      <li>
                        Tracheotomy:
                        <span className=" ml-2 font-normal">
                          {" "}
                          {patient?.IcuPdAcutePresentation
                            ?.VentilatorySupportDuringTheAcuteSetting
                            ?.Tracheotomy
                            ? "Yes"
                            : "No"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2 text-slate-500 font-semibold">
                    ICU DISCHARGE :
                    <span className=" ml-2 font-normal">
                      {" "}
                      {patient?.icuPdDischarge?.Autonomy?.DateOfDischarge
                        ? new Date(
                            patient?.icuPdDischarge?.Autonomy?.DateOfDischarge
                          ).toLocaleDateString()
                        : "No Date"}
                    </span>
                  </p>
                  <Button
                    type="primary"
                    className="mt-4 ml-64 "
                    onClick={() =>
                      navigate(`/patient/${patientId}/patientDashboard`)
                    }
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
            <section className="p-3 sm:p-5 overflow-y-auto ">
              <div className=" w-full lg:px-12 scroll sm:scroll">
                <div className="bg-whiterelative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
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
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search consultation"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                      <button
                        onClick={handleAddConsultationClick}
                        type="button"
                        id="createConsultationButton"
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      >
                        <svg
                          className="h-3.5 w-3.5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          />
                        </svg>
                        Add Consultation
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-black">
                      <thead className="text-xs text-black uppercase bg-gray-200 ">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            doctor Name
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Consultation date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Stop NIV
                          </th>
                          <th scope="col" className="px-4 py-3">
                            When
                          </th>
                          <th scope="col" className="px-4 py-3">
                            pH
                          </th>
                          <th scope="col" className="px-4 py-3">
                            pCO2
                          </th>
                          <th scope="col" className="px-4 py-3">
                            PO2
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Renewal Date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <div className="flex justify-center items-center py-10">
                            Loading...
                          </div>
                        ) : paginatedConsultations.length === 0 ? (
                          <tr>
                            <td colSpan="8">
                              <Empty />
                            </td>
                          </tr>
                        ) : (
                          paginatedConsultations.map((consultation, index) => (
                            <tr
                              key={consultation._id}
                              className="border-b dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-black whitespace-nowrap "
                              >
                                {
                                  consultation.PatientFollowUpFindings
                                    ?.doctorName
                                }
                              </th>
                              <td className="px-4 py-3">
                                {new Date(
                                  consultation.PatientFollowUpFindings?.showUpDate
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                {consultation?.Ventilatory?.NIVwithdrawal}
                              </td>
                              <td className="px-4 py-3">
                                {" "}
                                {consultation?.Ventilatory?.NIVwithdrawal ==
                                "Yes"
                                  ? new Date(
                                      consultation.PatientFollowUpFindings?.showUpDate
                                    ).toLocaleDateString()
                                  : "No Date"}
                              </td>
                              <td className="px-4 py-3">
                                {consultation?.Biomarkers?.PH.toString()}
                              </td>
                              <td className="px-4 py-3">
                                {consultation?.Biomarkers?.pCO2.toString()}
                              </td>
                              <td className="px-4 py-3">
                                {consultation?.Biomarkers?.PO2.toString()}
                              </td>
                              <td className="px-4 py-3">{getRenewalDate()}</td>

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
                                    visibleDropdown === index
                                      ? "block"
                                      : "hidden"
                                  } absolute z-10 my-4 mr-8 list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                                >
                                  <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="DropdownButton"
                                  >
                                    <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                      <Link
                                        to={`/consultation/${consultation._id}`}
                                        className="w-full h-full block"
                                      >
                                        Show
                                      </Link>
                                    </li>

                                    <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                      <Link
                                        to={`/consultations/edit/${consultation._id}`}
                                        className="w-full h-full block"
                                      >
                                        Edit
                                      </Link>
                                    </li>
                                    <li className="cursor-pointer">
                                      <a
                                        onClick={() =>
                                          deleteConsultation(consultation._id)
                                        }
                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    current={currentPage}
                    pageSize={consultationPerPage}
                    total={filteredConsultations.length}
                    onChange={(page) => setCurrentPage(page)}
                    className="my-4"
                  />
                </div>
              </div>
            </section>
            <section className="p-3 sm:p-5 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className=" w-full lg:px-12 scroll sm:scroll">
                <div className="bg-whiterelative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
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
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search notification"
                            value={searchNotificationTerm}
                            onChange={(e) =>
                              setSearchNotificationTerm(e.target.value)
                            }
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-black">
                      <thead className="text-xs text-black uppercase bg-gray-200">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Type
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Detail
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {loadingNotifications ? (
                          <div className="flex justify-center items-center py-10">
                            Loading notifications...
                          </div>
                        ) : paginatedNotifications.length === 0 ? (
                          <div className="flex justify-center items-center py-10">
                            <tr>
                              <td colSpan="8">
                                <Empty />
                              </td>
                            </tr>
                          </div>
                        ) : (
                          paginatedNotifications.map((notification) => (
                            <tr
                              key={notification._id}
                              className="border-b dark:border-gray-700"
                            >
                              <td className="px-4 py-3">
                                {new Date(
                                  notification.date
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">{notification.type}</td>
                              <td className="px-4 py-3">
                                {notification.detail}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    current={currentPage}
                    pageSize={notificationsPerPage}
                    total={filteredNotifications.length}
                    onChange={(page) => setCurrentPage(page)}
                    className="my-4"
                  />
                </div>
              </div>
            </section>
          </div>
        ) : (
          <p>Chargement des détails du consultations...</p>
        )}
      </div>
    </Lyout>
  );
}

export default PatientDetails;
