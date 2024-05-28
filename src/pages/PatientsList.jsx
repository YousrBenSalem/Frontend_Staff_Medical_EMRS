import Lyout from "../components/lyout/Lyout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Empty } from "antd";

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null);
    } else {
      setVisibleDropdown(index);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm]);
  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/patient?page=${currentPage}&limit=9&search=${searchTerm}`
      );
      if (response.data && response.data.data) {
        setPatients(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des patients:", error);
    }
  };
  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`http://localhost:3000/api/patient/${patientId}`);
      const updatedPatients = patients.filter(
        (patient) => patient._id !== patientId
      );
      setPatients(updatedPatients);
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
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
  const filteredPatients = patients.filter((patient) => {
    return (
      patient.PatientDemographics.name.toLowerCase().includes(searchTerm) ||
      patient.Insurance.cnamId.toLowerCase().includes(searchTerm) ||
      patient.ID.icuPdFileNumber.toLowerCase().includes(searchTerm) ||
      patient.ID.icuPdDischargeDate.toString().includes(searchTerm) ||
      patient.underlyingConditions.chronicDiseases
        .toLowerCase()
        .includes(searchTerm) ||
      patient.Insurance.provider.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Lyout>
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
                      required=""
                      onChange={handleSearchChange}
                      value={searchTerm}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-black">
                <thead className="text-xs text-black uppercase bg-gray-200 ">
                  <tr>
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
                      next appointment
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
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <Empty />
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient, index) => (
                      <tr
                        className="border-b dark:border-gray-700"
                        key={patient._id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-black whitespace-nowrap "
                        >
                          {patient.PatientDemographics?.name}
                        </th>
                        <td className="px-4 py-3">
                          {patient.Insurance?.cnamId}
                        </td>
                        <td className="px-4 py-3">
                          {patient.ID?.icuPdFileNumber}
                        </td>
                        <td className="px-4 py-3">
                          {patient.ID?.icuPdDischargeDate}
                        </td>
                        <td className="px-4 py-3">{patient.appointement}</td>
                        <td className="px-4 py-3">
                          {patient.underlyingConditions?.chronicDiseases}
                        </td>
                        <td className="px-4 py-3">
                          {patient.Insurance?.provider}
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
                                    to={`/patient/${patient._id}`}
                                    className="w-full h-full block"
                                  >
                                    Show
                                  </Link>
                                </li>
                                <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  <Link
                                    to={`/edit-patient/${patient._id}`}
                                    className="w-full h-full block"
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <a
                                    onClick={() => deletePatient(patient._id)}
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
                Page
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
    </Lyout>
  );
}

export default PatientsList;
