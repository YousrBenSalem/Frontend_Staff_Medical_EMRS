import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CCI_Calculator = ({ updateCCI, onClose }) => {
  const [age, setAge] = useState("");
  const [comorbidities, setComorbidities] = useState({
    myocardialInfarction: false,
    CHF: false,
    peripheralVascularDisease: false,
    CVA_TIA: false,
    dementia: false,
    COPD: false,
    connectiveTissueDisease: false,
    pepticUlcerDisease: false,
    liverDisease: "None",
    diabetesMellitus: "None",
    hemiplegia: false,
    moderateSevereCKD: false,
    solidTumor: "None",
    leukemia: false,
    lymphoma: false,
    AIDS: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComorbidities({
      ...comorbidities,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateCCIScore = () => {
    let score = 0;

    const ageScore = {
      "<50": 0,
      "50–59": 1,
      "60–69": 2,
      "70–79": 3,
      "≥80": 4,
    };

    score += ageScore[age] || 0;

    const scores = {
      myocardialInfarction: 1,
      CHF: 1,
      peripheralVascularDisease: 1,
      CVA_TIA: 1,
      dementia: 1,
      COPD: 1,
      connectiveTissueDisease: 1,
      pepticUlcerDisease: 1,
      liverDisease: { None: 0, Mild: 1, "Moderate to severe": 3 },
      diabetesMellitus: {
        "None or diet-controlled": 0,
        Uncomplicated: 1,
        "End-organ damage": 2,
      },
      hemiplegia: 2,
      moderateSevereCKD: 2,
      solidTumor: { None: 0, Localized: 2, Metastatic: 6 },
      leukemia: 2,
      lymphoma: 2,
      AIDS: 6,
    };

    for (const [condition, value] of Object.entries(comorbidities)) {
      if (typeof scores[condition] === "object") {
        score += scores[condition][value] || 0;
      } else if (value) {
        score += scores[condition];
      }
    }

    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const charlsonComorbidityIndex = calculateCCIScore();
    updateCCI(charlsonComorbidityIndex); // Call the update function to pass the score to the parent component

    onClose(); // Close the modal after calculating
  };

  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
        <h1 className="text-2xl font-semibold">
          Charlson Comorbidity Index (CCI) Calculator
        </h1>
      </div>
      {/* Age selector */}
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Age:
          <select
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-3 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="<50">{"<50 years"}</option>
            <option value="50–59">{"50–59 years"}</option>
            <option value="60–69">{"60–69 years"}</option>
            <option value="70–79">{"70–79 years"}</option>
            <option value="≥80">{"≥80 years"}</option>
          </select>
        </label>
      </div>
      {/* Comorbidities checkboxes and selects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Object.keys(comorbidities).map((comorbidity) => (
          <div
            key={comorbidity}
            className="form-group flex items-center space-x-2 mb-2"
          >
            <label className="text-sm font-medium text-gray-700 flex items-center">
              {comorbidity
                .replace(/_/g, " ")
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            {typeof comorbidities[comorbidity] === "boolean" ? (
              <input
                type="checkbox"
                name={comorbidity}
                checked={comorbidities[comorbidity]}
                onChange={handleChange}
                className="mt-5 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <select
                name={comorbidity}
                value={comorbidities[comorbidity]}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {/* Options spécifiques à chaque comorbidité */}
                {comorbidity === "liverDisease" && (
                  <>
                    <option value="None">None</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate to severe">
                      Moderate to severe
                    </option>
                  </>
                )}
                {comorbidity === "diabetesMellitus" && (
                  <>
                    <option value="None or diet-controlled">
                      None or diet-controlled
                    </option>
                    <option value="Uncomplicated">Uncomplicated</option>
                    <option value="End-organ damage">End-organ damage</option>
                  </>
                )}
                {comorbidity === "solidTumor" && (
                  <>
                    <option value="None">None</option>
                    <option value="Localized">Localized</option>
                    <option value="Metastatic">Metastatic</option>
                  </>
                )}
              </select>
            )}
          </div>
        ))}
      </div>
      {/* Submit button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Calculate CCI
      </button>
    </>
  );
};

export default CCI_Calculator;
