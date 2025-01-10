import { useState } from "react";
import Lyout from "./../components/lyout/Lyout";
import axios from "axios";
import { message } from "antd";

function Predict() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Clean up object URL when the component unmounts
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      messageApi.open({
        type: "warning",
        content: "Please upload an image first.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", document.querySelector("#imageUpload").files[0]);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/doctor/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        messageApi.open({
          type: "success",
          content: "Prediction successful",
        });
        setResult(response.data.result || "No result data available");
      } else {
        messageApi.open({
          type: "error",
          content: "Prediction failed",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Lyout>
      {contextHolder}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Pneumonia Detection Using Chest X-Ray
        </h2>

        <form
          id="upload-file"
          method="post"
          encType="multipart/form-data"
          className="mb-6"
        >
          <input
            type="file"
            name="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
        </form>

        {image && (
          <div className="mb-6 flex justify-center">
            <img
              id="imagePreview"
              className="w-full max-w-md h-96 rounded-lg shadow-lg object-cover"
              src={image}
              alt="Preview"
            />
          </div>
        )}

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          id="btn-predict"
          onClick={handlePredict}
        >
          Predict
        </button>

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="loader">Loading...</div>
          </div>
        )}

        {result && (
          <h3 id="result" className="mt-6 text-lg text-center text-gray-800">
            {typeof result === "string" ? result : JSON.stringify(result)}
          </h3>
        )}
      </div>
    </Lyout>
  );
}

export default Predict;
