import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const SixMinuteWalkTest = ({ onClose, updateSixMWT }) => {
  const [form, setForm] = useState({
    oxygenType: "Room Air",
    height: "",
    age: "",
    weight: "",
    sexe: "0",
    sa02T0: "",
    hrT0: "",
    walkedDistance: "",
    restDuringTest: "",
    sa02T6: "",
    hrT6: "",
  });
  const [predictedDistance, setPredictedDistance] = useState(null);
  const [ratio, setRatio] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const calculatePredictedDistance = () => {
      const { height, age, weight, sexe } = form;
      if (height && age && weight && sexe !== null) {
        const predictedDist =
          218 + 5.14 * height - 5.23 * age - 1.8 * weight + 51.31 * sexe;
        setPredictedDistance(predictedDist);
      } else {
        setPredictedDistance(null);
      }
    };

    const calculateRatio = () => {
      if (form.walkedDistance && predictedDistance) {
        const ratio = (form.walkedDistance / predictedDistance) * 100;
        setRatio(ratio.toFixed(2));
      } else {
        setRatio(null);
      }
    };

    calculatePredictedDistance();
    calculateRatio();
  }, [
    form.height,
    form.age,
    form.weight,
    form.sexe,
    form.walkedDistance,
    predictedDistance,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ratio !== null) {
      updateSixMWT(ratio);
      onClose();
    }
  };

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
        <h3 className="text-3xl font-semibold">
          Six-Minute Walk Test (6MWT) Calculator
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Oxygen Type:
          </label>
          <select
            name="oxygenType"
            value={form.oxygenType}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Room Air">Room Air</option>
            <option value="Oxygen">Oxygen</option>
            <option value="NIV">NIV</option>
            <option value="Ventilation under tracheostomy">
              Ventilation under tracheostomy
            </option>
          </select>
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Height (cm):
          </label>
          <input
            type="number"
            name="height"
            value={form.height || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Age (years):
          </label>
          <input
            type="number"
            name="age"
            value={form.age || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Weight (kg):
          </label>
          <input
            type="number"
            name="weight"
            value={form.weight || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Sex:
          </label>
          <select
            name="sexe"
            value={form.sexe}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            SaO2 at T0:
          </label>
          <input
            type="number"
            name="sa02T0"
            value={form.sa02T0 || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            HR at T0:
          </label>
          <input
            type="number"
            name="hrT0"
            value={form.hrT0 || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Walked Distance (m):
          </label>
          <input
            type="number"
            name="walkedDistance"
            value={form.walkedDistance || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Rest during the test (seconds):
          </label>
          <input
            type="number"
            name="restDuringTest"
            value={form.restDuringTest || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            SaO2 at T6 min:
          </label>
          <input
            type="number"
            name="sa02T6"
            value={form.sa02T6 || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mt-2">
          <label className="block text-sm font-medium text-gray-700">
            HR at T6 min:
          </label>
          <input
            type="number"
            name="hrT6"
            value={form.hrT6 || 0}
            onChange={handleChange}
            className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      {predictedDistance !== null && ratio !== null && (
        <div className="mt-4">
          <p className="text-center font-semibold">
            Predicted Distance: {predictedDistance.toFixed(2)} m
          </p>
          <p className="text-center font-semibold">Ratio (%): {ratio}%</p>
        </div>
      )}
      <div className="flex items-center justify-between mt-5">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Calculate
        </button>
      </div>
    </>
  );
};

export default SixMinuteWalkTest;
