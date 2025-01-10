import { useEffect, useState } from "react";
import Lyout from "../components/lyout/Lyout";
import { Button, Empty, message, Modal, Pagination, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import AddProvider from "../components/AddProvider/AddProvider";
import { motion } from "framer-motion";

const { Meta } = Card;

function ProviderList() {
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
  const [providers, setProviders] = useState([]);
  const [filteredProvider, setFilteredProvider] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProviderId, setCurrentProviderId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const fetchAccounts = async () => {
    try {
      const doctorId = user._id;
      const response = await axios.get(
        `http://localhost:3000/api/provider/${doctorId}/getAllproviders`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data && response.data.data) {
        setProviders(response.data.data);
        console.log("providers", providers);
      } else {
        setProviders([]);
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
    const filtered = providers.filter(
      (provider) =>
        provider?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider?.PhoneNumber.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        provider?.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProvider(filtered);
  }, [searchQuery, providers]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/provider/providers/${currentProviderId}`,
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
          content: "provider deleted successfully",
        });
        refreshProviders();
        setProviders((prevProviders) =>
          prevProviders.filter((provider) => provider._id !== currentProviderId)
        );
        setFilteredProvider(
          filteredProvider.filter(
            (provider) => provider._id !== currentProviderId
          )
        );
      }
    } catch (error) {
      console.error("Error deleting provider :", error);
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("PhoneNumber", formData.PhoneNumber);
      formDataToSend.append("address", formData.address);
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }
      const response = await axios.put(
        `http://localhost:3000/api/provider/providers/${currentProviderId}`,
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
          content: "Provider updated successfully",
        });
        refreshProviders();

        setProviders((prevProviders) =>
          prevProviders.map((provider) =>
            provider._id === currentProviderId
              ? { ...provider, ...response.data.data }
              : provider
          )
        );
        setFilteredProvider(
          filteredProvider.map((provider) =>
            provider._id === currentProviderId
              ? { ...provider, ...response.data.data }
              : provider
          )
        );
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating provider:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred. Please try again.",
      });
    }
  };
  const refreshProviders = () => {
    fetchAccounts();
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModal = (provider) => {
    setCurrentProviderId(provider?._id);
    setFormData({
      email: provider?.email || "",
      password: "",
      name: provider?.name || "",
      PhoneNumber: provider?.PhoneNumber || "",
      address: provider?.address || "",
      photo: "",
    });
    setModalOpen(!isModalOpen);
  };

  const showDeleteConfirm = (providerId) => {
    setCurrentProviderId(providerId);
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
  const paginatedProviders = filteredProvider.slice(startIndex, endIndex);

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
                        placeholder="Search providers"
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
                Add Provider
              </Button>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  Loading...
                </div>
              ) : paginatedProviders.length > 0 ? (
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedProviders.map((provider) => (
                      <motion.div
                        key={provider._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col"
                      >
                        <Card
                          className="rounded-lg shadow-md"
                          title={provider.name}
                          actions={[
                            <Button
                              key="edit"
                              type="link"
                              onClick={() => toggleModal(provider)}
                            >
                              Edit
                            </Button>,
                            <Button
                              key="delete"
                              type="link"
                              danger
                              onClick={() => showDeleteConfirm(provider._id)}
                            >
                              Delete
                            </Button>,
                          ]}
                        >
                          <div className="flex flex-col md:flex-row items-center">
                            {provider.photo ? (
                              <img
                                alt="provider"
                                src={`http://localhost:3000/api/provider/uploads/${provider.photo}`}
                                className="w-32 h-32 object-cover border border-gray-300 rounded-lg mb-4 md:mb-0 md:mr-8"
                              />
                            ) : (
                              <div className="w-32 h-32 flex items-center justify-center border border-gray-300 rounded-lg mb-4 md:mb-0 md:mr-8">
                                <span className="text-gray-500">No Photo</span>
                              </div>
                            )}
                            <div className="text-left">
                              <Meta
                                description={
                                  <>
                                    <p>
                                      <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="mr-2"
                                      />
                                      {provider.email}
                                    </p>
                                    <p>
                                      <FontAwesomeIcon
                                        icon={faPhone}
                                        className="mr-2"
                                      />
                                      {provider.PhoneNumber}
                                    </p>
                                    <p>
                                      <FontAwesomeIcon
                                        icon={faHome}
                                        className="mr-2"
                                      />
                                      {provider.address}
                                    </p>
                                  </>
                                }
                              />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center py-10">
                  <Empty description="No Providers Found" />
                </div>
              )}
            </div>
            <div className="flex justify-center py-4">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProvider.length}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>

        <Modal
          title="Edit Provider"
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
          <AddProvider
            onCancel={handleAddCancel}
            onSuccess={() => handleAddCancel()}
            onSubmit={() => refreshProviders()}
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
          <p>Are you sure you want to delete this provider?</p>
        </Modal>
      </div>
    </Lyout>
  );
}

export default ProviderList;
