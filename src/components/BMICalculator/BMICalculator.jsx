import { useState } from "react";

// eslint-disable-next-line react/prop-types
const BMICalculator = ({ onClose, updateBMI }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("male"); // Default to male

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const calculateBMI = () => {
    if (!weight || !height) {
      alert("Please enter both weight and height.");
      return;
    }

    const heightInMeters = height / 100; // Convert height to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2); // Round BMI to two decimal places
  };

  const handleSubmit = () => {
    const bmiResult = calculateBMI();
    if (bmiResult) {
      updateBMI(bmiResult);
      onClose(); // Close the modal after updating BMI
    }
  };

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
        <h3 className="text-2xl font-semibold">
          Body Mass Index (BMI) Calculator
        </h3>
      </div>
      <div className="relative p-6 flex-auto">
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={weight || 0}
                onChange={handleWeightChange}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Height (cm):
              <input
                type="number"
                name="height"
                value={height || 0}
                onChange={handleHeightChange}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Sex:
              <select
                name="sex"
                value={sex}
                onChange={handleSexChange}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 px-4  bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Calculate BMI
          </button>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;
