import Lyout from "../components/lyout/Lyout";
import doctorImage from "../assets/images/doctor-img02.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { message } from "antd";

function DoctorProfile() {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useSelector((state) => state.user);
  const id = user._id;
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    hospital: user?.hospital || "",
    photo: user?.photo || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("hospital", formData.hospital);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/doctor/${id}/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (result.success) {
        messageApi.open({
          type: "success",
          content: "Profile updated successfully!",
        });
      } else {
        messageApi.open({
          type: "error",
          content: result.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred while updating the profile.",
      });
    }
  };

  return (
    <Lyout>
      {contextHolder}
      <div className="p-4">
        <h1 className="text-3xl font-semibold mb-10 text-center">
          Doctor Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center mt-20">
            <div className="mb-4">
              {formData.photo ? (
                <img
                  src={`http://localhost:3000/api/admin/uploads/${formData.photo}`}
                  alt="Doctor"
                  className="rounded-full w-48 h-48 object-cover shadow-md"
                />
              ) : (
                <img
                  src={doctorImage}
                  alt="Doctor"
                  className="rounded-full w-48 h-48 object-cover shadow-md"
                />
              )}
            </div>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="surname" className="block text-gray-700 mb-2">
                  First Name:
                </label>
                <input
                  type="text"
                  name="surname"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="hospital" className="block text-gray-700 mb-2">
                  Hospital:
                </label>
                <input
                  type="text"
                  name="hospital"
                  className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.hospital}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 text-center rounded shadow-md transform hover:scale-105 transition duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Lyout>
  );
}

export default DoctorProfile;
