import Lyout from "../components/lyout/Lyout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Empty, Pagination } from "antd";
import { Link } from "react-router-dom";

function Appointement() {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const toggleDropdown = (index) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null);
    } else {
      setVisibleDropdown(index);
    }
  };
  const { user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  // or useNavigate for react-router-dom v6
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const [patientsPerPage] = useState(6); // Nombre de patients par page

  useEffect(() => {
    fetchPatients();
  }, []);
  const doctorId = user._id;
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/provider/${doctorId}/Patients`,
        {
          headers: {
            "Content-Type": "application/json",
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour n'avoir que la date
    const futureAppointments = appointments.filter(
      (appointment) => new Date(appointment.AppointmentDate) >= today
    );

    if (futureAppointments.length === 0) return null;

    // Trier les rendez-vous futurs par date
    futureAppointments.sort(
      (a, b) => new Date(a.AppointmentDate) - new Date(b.AppointmentDate)
    );

    const nextAppointment = futureAppointments[0];
    const polygraphyFiles = nextAppointment.ProviderFiles
      ? nextAppointment.ProviderFiles.filter(
          (file) => file.type === "polygraphy"
        )
      : [];
    const downloadsFiles = nextAppointment.ProviderFiles
      ? nextAppointment.ProviderFiles.filter(
          (file) => file.type === "Downloads"
        )
      : [];

    const polygraphyStatuses = polygraphyFiles.map((file) => file.status);
    const downloadsStatuses = downloadsFiles.map((file) => file.status);

    return {
      ...nextAppointment,
      polygraphyStatuses,
      downloadsStatuses,
    };
  };

  const filteredPatients = patients.filter((patient) => {
    const name = patient?.History?.PatientDemographics?.name || "";
    const residency = patient?.History?.PatientDemographics?.residency || "";
    const hasNextAppointment = patient?.nextAppointment?.AppointmentDate;

    const searchTermLower = searchTerm.toLowerCase();

    return (
      hasNextAppointment &&
      (name.toLowerCase().includes(searchTermLower) ||
        residency.toLowerCase().includes(searchTermLower))
    );
  });
  const sortedPatients = filteredPatients.sort((a, b) => {
    if (!a.nextAppointment || !b.nextAppointment) {
      return 0; // Gardez leur ordre initial si aucun rendez-vous n'existe
    }
    return (
      new Date(a.nextAppointment.AppointmentDate) -
      new Date(b.nextAppointment.AppointmentDate)
    );
  });
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const paginatedPatients = sortedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-700 bg-orange-100";
      case "Acceptable":
        return "text-green-700 bg-green-100";
      case "Unacceptable":
        return "text-red-700 bg-red-100";
      default:
        return "";
    }
  };
  const canDownloadPolygraphy = (polygraphyStatuses) => {
    return polygraphyStatuses.includes("Acceptable");
  };

  const canDownloadDownloads = (downloadsStatuses) => {
    return downloadsStatuses.includes("Acceptable");
  };

  const handleDownload = async (appointmentId, fileType) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/appointment/${appointmentId}/download/${fileType}`,
        {
          responseType: "blob",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileType}-${appointmentId}.pdf`); // ou autre extension selon le fichier
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
    }
  };
  return (
    <Lyout>
      <section className="p-3 sm:p-5 overflow-y-auto scroll ">
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
                      placeholder="Search"
                      required=""
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto ">
              {filteredPatients.length === 0 ? (
                <Empty className="py-10" description="No Appointments Found" />
              ) : (
                <>
                  <table className="w-full text-sm text-left text-black ">
                    <thead className="text-xs text-black uppercase bg-gray-200 ">
                      <tr>
                        <th scope="col" className="px-7 py-3"></th>
                        <th scope="col" className="px-4 py-3">
                          Patient Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Diagnosis
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Next appointment
                        </th>
                        <th scope="col" className="px-4 py-3">
                          respiratory support
                        </th>
                        <th scope="col" className="px-4 py-3">
                          ABG pending
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Downloads pending
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Polygraphy
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Spirometry
                        </th>
                        <th scope="col" className="px-4 py-3">
                          CNAM request pending
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Chest Film pending
                        </th>
                        <th scope="col" className="px-4 py-3">
                          APCI pending
                        </th>
                        <th scope="col" className="px-4 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedPatients.length === 0 ? (
                        <tr>
                          <td colSpan="8">
                            <Empty />
                          </td>
                        </tr>
                      ) : (
                        paginatedPatients.map((patient, index) => (
                          <tr
                            className=" dark:border-gray-700"
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
                              {patient?.History?.PatientDemographics?.name}
                            </th>
                            <td className="px-4 py-3">
                              {
                                patient?.History?.underlyingConditions
                                  ?.chronicDiseases
                              }
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment
                                ? new Date(
                                    patient.nextAppointment.AppointmentDate
                                  ).toLocaleDateString()
                                : "No appointment"}
                            </td>
                            <td className="px-4 py-3">
                              {" "}
                              {patient?.icuPdDischarge?.Biomarkers
                                ?.RespiratoryPolygraphyAtICU === "Yes" ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment?.Biomarkers?.ABG ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment?.downloadsStatuses ==
                              "Acceptable" ? (
                                patient?.nextAppointment.downloadsStatuses.map(
                                  (status, index) => (
                                    <span
                                      key={index}
                                      className={getStatusClass(status)}
                                    >
                                      {status}
                                    </span>
                                  )
                                )
                              ) : (
                                <span className="text-orange-700 bg-orange-100">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {" "}
                              {patient?.nextAppointment?.polygraphyStatuses ==
                              "Acceptable" ? (
                                patient?.nextAppointment?.polygraphyStatuses.map(
                                  (status, index) => (
                                    <span
                                      key={index}
                                      className={getStatusClass(status)}
                                    >
                                      {status}
                                    </span>
                                  )
                                )
                              ) : (
                                <span className="text-orange-700 bg-orange-100">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment?.Biomarkers?.PFT ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {" "}
                              {patient?.nextAppointment?.FollowUpPurpose ===
                              "Insurance Request" ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {patient?.nextAppointment?.Biomarkers
                                ?.ChestFilm ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {" "}
                              {patient?.nextAppointment?.FollowUpPurpose ===
                              "Insurance Request" ? (
                                <span className="text-green-700 bg-green-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-red-700 bg-red-100">
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                id="DropdownButton"
                                data-dropdown-toggle="DropdownButton"
                                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-black hover:text-gray-800 rounded-lg focus:outline-none "
                                type="button"
                                onClick={() => toggleDropdown(index)}
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
                              {visibleDropdown === index && (
                                <div
                                  id="DropdownButton"
                                  className={`${
                                    visibleDropdown === index
                                      ? "block"
                                      : "hidden"
                                  } absolute z-10 my-4 mr-60  list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 `}
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
                                        Details
                                      </Link>
                                    </li>
                                    {patient.nextAppointment && (
                                      <>
                                        {canDownloadPolygraphy(
                                          patient.nextAppointment
                                            .polygraphyStatuses
                                        ) && (
                                          <li>
                                            <button
                                              onClick={() =>
                                                handleDownload(
                                                  patient.nextAppointment._id,
                                                  "polygraphy"
                                                )
                                              }
                                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                              Download Polygraphy
                                            </button>
                                          </li>
                                        )}
                                        {canDownloadDownloads(
                                          patient.nextAppointment
                                            .downloadsStatuses
                                        ) && (
                                          <li>
                                            <button
                                              onClick={() =>
                                                handleDownload(
                                                  patient.nextAppointment._id,
                                                  "Downloads"
                                                )
                                              }
                                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                              Download Downloads
                                            </button>
                                          </li>
                                        )}
                                      </>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    current={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    pageSize={patientsPerPage}
                    total={filteredPatients.length}
                    className="my-4"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Lyout>
  );
}

export default Appointement;
