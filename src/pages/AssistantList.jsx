import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { Button, Empty, message, Modal, Pagination, Collapse } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";
import AddAssistant from "../components/AddAssistant/AddAssistant";
const { Panel } = Collapse;

function AssistantList() {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((state) => state.user);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    PhoneNumber: "",
    address: "",
    photo: "",
  });
  const [assistants, setAssistants] = useState([]);
  const [filteredAssistant, setFilteredAssistant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAssistantId, setCurrentAssistantId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const fetchAccounts = async () => {
    try {
      const doctorId = user._id;
      const response = await axios.get(
        `http://localhost:3000/api/assistant/${doctorId}/getAllAssistants`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data && response.data.data) {
        setAssistants(response.data.data);
      } else {
        setAssistants([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);
  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };
  useEffect(() => {
    // Filter patients based on the search query
    const filtered = assistants.filter(
      (assistant) =>
        assistant?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assistant?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assistant?.PhoneNumber.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        assistant?.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssistant(filtered);
  }, [searchQuery, assistants]);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/assistant/assistants/${currentAssistantId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setDeleteModalOpen(false);
      if (response) {
        messageApi.open({
          type: "success",
          content: "assistant deleted successfully",
        });
        refreshassistants();
        refreshassistants();
        setAssistants((prevAssistants) =>
          prevAssistants.filter(
            (assistant) => assistant._id !== currentAssistantId
          )
        );
        setFilteredAssistant(
          filteredAssistant.filter(
            (assistant) => assistant._id !== currentAssistantId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting assistant :", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
    setDeleteModalOpen(false);
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("PhoneNumber", formData.PhoneNumber);
    formDataToSend.append("address", formData.address);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/assistant/assistants/${currentAssistantId}`,
        formDataToSend,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Assistant updated successfully",
        });
        refreshassistants();

        setAssistants((prevAssistants) =>
          prevAssistants.map((assistant) =>
            assistant._id === currentAssistantId
              ? { ...assistant, ...response.data.data }
              : assistant
          )
        );
        setFilteredAssistant(
          filteredAssistant.map((assistant) =>
            assistant._id === currentAssistantId
              ? { ...assistant, ...response.data.data }
              : assistant
          )
        );
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating resident:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };
  const refreshassistants = () => {
    fetchAccounts();
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = (assistant) => {
    setCurrentAssistantId(assistant?._id);
    setFormData({
      email: assistant?.email || "",
      password: "",
      name: assistant?.name || "",
      PhoneNumber: assistant?.PhoneNumber || "",
      address: assistant?.address || "",
      photo: "",
      isAssistant: assistant?.isAssistant || false,
    });
    setModalOpen(!isModalOpen);
  };

  const showDeleteConfirm = (assistantId) => {
    setCurrentAssistantId(assistantId);
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
  const paginatedassistants = filteredAssistant.slice(startIndex, endIndex);

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
                  <div className="relative w-full ">
                    <div>
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
                        placeholder="Search resident"
                        value={searchQuery}
                        onChange={handleSearch}
                        required=""
                        className="border-black text-black text-sm rounded-lg block w-full pl-10 p-2"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <Button
                type="primary"
                onClick={() => setAddModalOpen(true)}
                style={{ marginLeft: "10px" }}
              >
                Add Resident
              </Button>
            </div>
            <div className="overflow-x-auto p-4 ">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  Loading...
                </div>
              ) : paginatedassistants.length > 0 ? (
                <>
                  <Collapse
                    accordion
                    expandIconPosition="right"
                    className="text-sm p-8"
                  >
                    {paginatedassistants.map((assistant) => (
                      <Panel
                        header={assistant.name}
                        key={assistant._id}
                        className="rounded-lg shadow-lg my-3 border text-lg font-semibold border-gray-200 transition-transform transform hover:scale-105	"
                      >
                        <div className="p-4 flex items-start">
                          {assistant.photo ? (
                            <img
                              alt={assistant.name}
                              src={`http://localhost:3000/api/assistant/uploads/${assistant.photo}`}
                              className="w-32 h-32 flex-shrink-0 border border-gray-300 rounded-lg mr-10"
                            />
                          ) : (
                            <div className="w-32 h-32 flex-shrink-0 border border-gray-300 rounded-lg flex items-center justify-center mr-10">
                              <span className="text-gray-500">No Photo</span>
                            </div>
                          )}

                          {/* Text information */}
                          <div className="mt-2">
                            <p className="text-textColor flex items-center">
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-lg mr-2"
                              />
                              <span className="text-m ml-1">
                                {assistant.email}
                              </span>
                            </p>
                            <p className="text-textColor flex items-center mt-2">
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="text-lg mr-2"
                              />
                              <span className="text-m ml-1">
                                {assistant.PhoneNumber}
                              </span>
                            </p>
                            <p className="text-textColor flex items-center mt-2">
                              <FontAwesomeIcon
                                icon={faHome}
                                className="text-lg mr-2"
                              />
                              <span className="text-m ml-1">
                                {assistant.address}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                          <Button
                            type="primary"
                            onClick={() => toggleModal(assistant)}
                          >
                            Edit
                          </Button>
                          <Button
                            danger
                            onClick={() => showDeleteConfirm(assistant._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                  <div className="flex justify-center mt-4 pb-4">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={filteredAssistant.length}
                      onChange={handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center py-10">
                  <Empty description="No Assistants Found" />
                </div>
              )}
            </div>
          </div>
        </div>

        <Modal
          title="Edit Resident"
          open={isModalOpen}
          onOk={handleUpdate}
          onCancel={() => setModalOpen(false)}
          okText="Save"
          cancelText="Cancel"
        >
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Email"
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
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
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
            </div>
          </form>
        </Modal>
        <Modal
          visible={isAddModalOpen}
          onCancel={handleAddCancel}
          onOk={handleAddCancel}
          footer={null}
        >
          <AddAssistant
            onCancel={handleAddCancel}
            onSuccess={() => handleAddCancel()}
            onSubmit={() => refreshassistants()}
          />
        </Modal>
        <Modal
          title="Confirm Deletion"
          open={isDeleteModalOpen}
          onOk={handleDelete}
          onCancel={() => setDeleteModalOpen(false)}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this resident?</p>
        </Modal>
      </div>
    </Lyout>
  );
}

export default AssistantList;
