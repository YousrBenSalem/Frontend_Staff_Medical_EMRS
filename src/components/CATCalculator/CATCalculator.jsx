import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CATCalculator = ({ updateCAT, onClose }) => {
  const [coughScore, setCoughScore] = useState(0);
  const [phlegmScore, setPhlegmScore] = useState(0);
  const [chestTightnessScore, setChestTightnessScore] = useState(0);
  const [breathlessnessScore, setBreathlessnessScore] = useState(0);
  const [activitiesScore, setActivitiesScore] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [sleepScore, setSleepScore] = useState(0);
  const [energyScore, setEnergyScore] = useState(0);

  const handleInputChange = (e, setter) => {
    const score = parseInt(e.target.value);
    setter(score);
  };

  const calculateCATScore = () => {
    const totalScore =
      coughScore +
      phlegmScore +
      chestTightnessScore +
      breathlessnessScore +
      activitiesScore +
      confidenceScore +
      sleepScore +
      energyScore;
    return totalScore;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const catScore = calculateCATScore();
    updateCAT(catScore);
    onClose();
  };

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
        <h3 className="text-3xl font-semibold">
          COPD Assessment Test (CAT) Calculator
        </h3>
      </div>
      <div className="relative p-6 flex-auto space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Cough:
              <select
                value={coughScore}
                onChange={(e) => handleInputChange(e, setCoughScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Phlegm:
              <select
                value={phlegmScore}
                onChange={(e) => handleInputChange(e, setPhlegmScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Chest Tightness:
              <select
                value={chestTightnessScore}
                onChange={(e) => handleInputChange(e, setChestTightnessScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Breathlessness:
              <select
                value={breathlessnessScore}
                onChange={(e) => handleInputChange(e, setBreathlessnessScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Activities:
              <select
                value={activitiesScore}
                onChange={(e) => handleInputChange(e, setActivitiesScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Confidence:
              <select
                value={confidenceScore}
                onChange={(e) => handleInputChange(e, setConfidenceScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Sleep:
              <select
                value={sleepScore}
                onChange={(e) => handleInputChange(e, setSleepScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Energy:
              <select
                value={energyScore}
                onChange={(e) => handleInputChange(e, setEnergyScore)}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Calculate CAT Score
        </button>
      </div>
    </>
  );
};

export default CATCalculator;
