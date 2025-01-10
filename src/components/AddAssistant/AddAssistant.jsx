/* eslint-disable react/prop-types */
import { message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

function AddAssistant({ onSubmit, onSuccess }) {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((state) => state.user);
  const userId = user._id;

  const initialFormData = {
    name: "",
    email: "",
    PhoneNumber: "",
    address: "",
    password: "",
    photo: null,
    userId: userId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Clé pour réinitialiser l'élément file

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/assistant/addassistant",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        messageApi.open({
          type: "success",
          content: "Assistant added successfully",
        });
        onSuccess();
        onSubmit();
        // Réinitialiser les champs du formulaire après la soumission réussie
        setFormData(initialFormData);
        setFileInputKey(Date.now()); // Forcer la réinitialisation de l'élément file
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to add assistant",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <h1 className="text-3xl font-semibold mb-3 text-center">
        Add New Resident
      </h1>
      <div className="grid grid-cols-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-2">Phone Number:</label>
            <input
              type="tel"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-2">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Photo:</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              key={fileInputKey} // Utilisez la clé pour réinitialiser l'élément file
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white mt-5 py-2 px-4 text-center rounded shadow-md transform hover:scale-105 transition duration-300"
            >
              Add Assistant
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAssistant;
