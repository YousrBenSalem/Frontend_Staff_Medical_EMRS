import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { Empty, message } from "antd";
import axios from "axios";

function PatientsProfiles() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalAddOpen, setModalAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Accountpatient/profilesPatients"
        );
        setPatients(response.data.data.profiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/Accountpatient/signupPatient",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        messageApi.open({
          type: "success",
          content: "Patient added with success",
        });
        setModalAddOpen(false);
        setPatients([...patients, response.data.data.profile]);
      }
    } catch (error) {
      console.error("Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "Account already exists!") {
          messageApi.open({
            type: "error",
            content: "Account already exists! Please use a different email.",
          });
        } else {
          messageApi.open({
            type: "error",
            content: errorMessage,
          });
        }
      } else {
        messageApi.open({
          type: "error",
          content: "An error occurred. Please try again.",
        });
      }
    }
  };
  const handleDelete = async (patientId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/Accountpatient/deleteAccount/${patientId}`
      );

      if (response.data.status === "success") {
        messageApi.open({
          type: "success",
          content: "Patient deleted successfully",
        });
        setPatients(patients.filter((patient) => patient._id !== patientId));
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/Accountpatient/updateAccount/${currentPatientId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        messageApi.open({
          type: "success",
          content: "Patient updated successfully",
        });
        setModalOpen(false);
        setPatients(
          patients.map((patient) =>
            patient._id === currentPatientId
              ? { ...patient, ...response.data.data.profile }
              : patient
          )
        );
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleModal = (patient) => {
    setCurrentPatientId(patient._id);
    setFormData({
      email: patient.email,
      password: "",
      name: patient.name,
    });
    setModalOpen(!isModalOpen);
  };
  const toggleModalAdd = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
    });
    setModalAddOpen(!isModalAddOpen);
  };

  return (
    <Lyout>
      <>
        <div className="p-3 sm:p-5 antialiased">
          <div className="mx-auto w-full px-4 lg:px-12">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
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
                      />
                    </div>
                  </form>
                </div>
                <button
                  onClick={toggleModalAdd}
                  className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add Profile
                </button>
                {isModalAddOpen && (
                  <div
                    id="add-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
                  >
                    <div className="relative w-full max-w-md p-4 max-h-full">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-400">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-xl font-semibold text-black">
                            Add account
                          </h3>
                          <button
                            onClick={() => setModalAddOpen(false)}
                            type="button"
                            className="end-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

                        <div className="p-4 md:p-5">
                          <form className="space-y-4" onSubmit={handleRegister}>
                            <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Name/Surname
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                placeholder="Name / Surname"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                placeholder="name@company.com"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-10">
                    Loading...
                  </div>
                ) : patients.length > 0 ? (
                  <table className="w-full text-sm text-left text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="p-4">
                          Name / Username
                        </th>

                        <th scope="col" className="p-4">
                          Email
                        </th>

                        <th scope="col" className="p-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr
                          key={patient._id}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 "
                        >
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-black whitespace-nowrap"
                          >
                            {patient.name}
                          </th>

                          <td className="px-4 py-3 font-medium text-black whitespace-nowrap ">
                            {patient.email}
                          </td>

                          <td className="px-4 py-3 font-medium text-black  whitespace-nowrap ">
                            <div className="flex items-center space-x-4 justify-center ">
                              <button
                                type="button"
                                onClick={() => toggleModal(patient)}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 -ml-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Edit
                              </button>
                              {isModalOpen && (
                                <form onSubmit={handleUpdate}>
                                  <div
                                    id="update-modal"
                                    tabIndex="-1"
                                    aria-hidden="true"
                                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-full"
                                  >
                                    <div className="relative p-4 w-full max-w-md max-h-full">
                                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-400">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                          <h3 className="text-xl font-semibold text-black">
                                            Update account
                                          </h3>
                                          <button
                                            onClick={() => setModalOpen(false)}
                                            type="button"
                                            className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="authentication-modal"
                                          >
                                            <svg
                                              className="w-3 h-3"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 14 14"
                                            >
                                              <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                              />
                                            </svg>
                                            <span className="sr-only">
                                              Close modal
                                            </span>
                                          </button>
                                        </div>

                                        <div className="p-4 md:p-5">
                                          <form
                                            className="space-y-4"
                                            action="#"
                                          >
                                            <div>
                                              <label
                                                htmlFor="name"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                              >
                                                Name
                                              </label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                                placeholder="Name"
                                                required
                                              />
                                            </div>
                                            <div>
                                              <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                              >
                                                Email
                                              </label>
                                              <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                                placeholder="name@company.com"
                                                required
                                              />
                                            </div>
                                            <div>
                                              <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                              >
                                                Password
                                              </label>
                                              <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                                required
                                              />
                                            </div>

                                            <button
                                              type="submit"
                                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                              Update
                                            </button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              )}
                              <button
                                onClick={() => handleDelete(patient._id)}
                                type="button"
                                data-modal-target="delete-modal"
                                data-modal-toggle="delete-modal"
                                className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 -ml-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex justify-center items-center py-10">
                    <Empty />
                  </div>
                )}
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10
                  </span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1000
                  </span>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
    </Lyout>
  );
}

export default PatientsProfiles;
