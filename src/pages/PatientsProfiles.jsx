/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { Empty, message, Modal, Pagination, Card } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Meta } = Card;

function PatientsProfiles() {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });
  const [patients, setPatients] = useState([]);
  const [filteredPatient, setFilteredPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAccounts = async () => {
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
        setPatients(response.data.data);
        console.log("photo patient", response.data.data);
      } else {
        setPatients([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user._id]);

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  useEffect(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.Account?.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        patient.History?.PatientDemographics?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredPatient(filtered);
  }, [searchQuery, patients]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/patient/PatientAccount/${currentPatientId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response) {
        messageApi.open({
          type: "success",
          content: "Patient deleted successfully",
        });

        fetchAccounts();
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== currentPatientId)
        );
        setFilteredPatient(
          filteredPatient.filter((patient) => patient._id !== currentPatientId)
        );
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
    setDeleteModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("name", formData.name);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/patient/PatientAccount/${currentPatientId}`,
        formDataToSend,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        messageApi.open({
          type: "success",
          content: "Patient updated successfully",
        });

        setModalOpen(false);
        fetchAccounts();
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === currentPatientId
              ? { ...patient, ...response.data.data }
              : patient
          )
        );
        setFilteredPatient(
          filteredPatient.map((patient) =>
            patient._id === currentPatientId
              ? { ...patient, ...response.data.data }
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
    setCurrentPatientId(patient?._id);
    setFormData({
      email: patient?.Account?.email || "",
      password: "",
      name: patient?.History?.PatientDemographics?.name || "",
      photo: "",
    });
    setModalOpen(!isModalOpen);
  };

  const showDeleteConfirm = (patientId) => {
    setCurrentPatientId(patientId);
    setDeleteModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination calculation
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPatients = filteredPatient.slice(startIndex, endIndex);

  return (
    <Lyout>
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
                      value={searchQuery}
                      onChange={handleSearch}
                      required=""
                      className="border-black text-black text-sm rounded-lg block w-full pl-10 p-2"
                    />
                  </div>
                </form>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                Loading...
              </div>
            ) : paginatedPatients.length > 0 ? (
              <div className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedPatients.map((patient) => (
                  <Card
                    key={patient._id}
                    className="flex transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
                    cover={
                      <div className="flex-shrink-0">
                        {patient?.History?.PatientDemographics?.patientPhoto ? (
                          <img
                            alt={
                              patient?.History?.PatientDemographics?.name ||
                              "Patient photo"
                            }
                            src={`http://localhost:3000/api/patient/uploads/${patient?.History?.PatientDemographics?.patientPhoto}`}
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-md"
                          />
                        ) : (
                          <div className="w-32 h-32 flex items-center justify-center border border-gray-300 rounded-lg">
                            <span className="text-gray-500">No Photo</span>
                          </div>
                        )}
                      </div>
                    }
                  >
                    <div className="flex-1 ml-4">
                      <Meta
                        title={patient.History.PatientDemographics?.name}
                        description={patient.Account?.email}
                      />
                      <div className="mt-4 flex justify-between space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleModal(patient)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => showDeleteConfirm(patient._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-10">
                <Empty description="No Comptes Patients Found" />
              </div>
            )}

            <Pagination
              className="py-4 px-4"
              current={currentPage}
              pageSize={pageSize}
              total={filteredPatient.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {/* Update Modal */}
      <Modal
        title="Update Patient"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setModalOpen(false)}
      >
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border-gray-300 border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-gray-300 border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handlePhotoChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="photo"
              required
            />
          </div>
        </form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this patient?</p>
      </Modal>
    </Lyout>
  );
}

export default PatientsProfiles;
