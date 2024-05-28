import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Lyout from "../components/lyout/Lyout";
import { Link } from "react-router-dom";
import avatar from "../assets/images/doctor-img01.png";
import { Empty } from "antd";

function PatientDetails() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
          `http://localhost:3000/api/patient/${patientId}`
        );
        setPatient(response.data);
        const consultationResponse = await axios.get(
          `http://localhost:3000/api/consultations/patient/${patientId}?page=${currentPage}&limit=5`
        );
        if (consultationResponse.data) {
          setConsultations(consultationResponse.data.data);
          setTotalPages(
            Math.ceil(consultationResponse.data.totalConsultations / 5)
          );
        } else {
          setConsultations([]);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du patient:",
          error
        );
      }
    };

    fetchPatientDetails(currentPage);
  }, [patientId, currentPage, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const filteredConsultations = consultations.filter(
    (consultation) =>
      consultation.doctorName.toLowerCase().includes(searchTerm) ||
      consultation.reason.toLowerCase().includes(searchTerm) ||
      consultation.consultationDate.toString().includes(searchTerm) ||
      (consultation.noShow ? "yes" : "no").includes(searchTerm.toLowerCase()) ||
      consultation.Biomarkers.pH.toString().includes(searchTerm) ||
      consultation.Biomarkers.pCO2.toString().includes(searchTerm) ||
      consultation.Biomarkers.PO2.toString().includes(searchTerm)
  );
  const handleAddConsultationClick = () => {
    navigate(`/patient/${patientId}/add-consultation`);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const deleteConsultation = async (consultationId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/consultations/${consultationId}`
      );
      const updatedConsultations = consultations.filter(
        (consultation) => consultation._id !== consultationId
      );
      setConsultations(updatedConsultations);
    } catch (error) {
      console.error("Failed to delete consultation:", error);
    }
  };
  return (
    <Lyout>
      <div>
        {patient ? (
          <div>
            {/* Ajoutez plus de détails selon les données disponibles
            <h1>{patient.PatientDemographics.name}</h1>
            <p>CNAM ID: {patient.Insurance.cnamId}</p> */}
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src={avatar}
                    alt="avatar"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Name and Surname :{patient.PatientDemographics.name}
                  </div>

                  <p className="mt-2 text-slate-500">
                    CNAM ID: {patient.Insurance.cnamId}
                  </p>
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
                            placeholder="Search"
                            onChange={handleSearchChange}
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
                            No Show
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Reason
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
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredConsultations.length === 0 ? (
                          <tr>
                            <td colSpan="8">
                              <Empty />
                            </td>
                          </tr>
                        ) : (
                          filteredConsultations.map((consultation, index) => (
                            <tr
                              key={consultation._id}
                              className="border-b dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-black whitespace-nowrap "
                              >
                                {consultation.doctorName}
                              </th>
                              <td className="px-4 py-3">
                                {new Date(
                                  consultation.consultationDate
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                {" "}
                                {consultation.noShow ? "Yes" : "No"}
                              </td>
                              <td className="px-4 py-3">
                                {consultation.reason}
                              </td>
                              <td className="px-4 py-3">
                                {consultation.Biomarkers.pH}
                              </td>
                              <td className="px-4 py-3">
                                {consultation.Biomarkers.pCO2}
                              </td>
                              <td className="px-4 py-3">
                                {consultation.Biomarkers.PO2}
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
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                  </svg>
                                </button>
                                <div
                                  className={` absolute w-44 mr-10 mt-18 rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
                                  style={{ zIndex: 1000 }}
                                >
                                  {visibleDropdown === index && (
                                    <ul
                                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                      aria-labelledby="apple-imac-27-dropdown-button"
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
                                      <li>
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
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <nav
                    className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation"
                  >
                    <span className="text-sm font-normal text-black ">
                      Page{" "}
                      <span className="font-semibold text-gray-900">
                        {currentPage}
                      </span>
                      of
                      <span className="font-semibold text-gray-900 ">
                        {totalPages}
                      </span>
                    </span>

                    <div className="inline-flex items-stretch -space-x-px">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5H1m0 0 4 4M1 5l4-4"
                          />
                        </svg>
                        Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        Next
                        <svg
                          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <p>Chargement des détails du patient...</p>
        )}
      </div>
    </Lyout>
  );
}

export default PatientDetails;
