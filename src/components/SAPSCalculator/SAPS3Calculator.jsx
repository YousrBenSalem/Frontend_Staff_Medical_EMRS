import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SAPS3_Calculator = ({ onClose, updateSAPS3 }) => {
  const [formData, setFormData] = useState({
    age: "",
    lengthOfStayBeforeIcuAdmissionDays: "",
    intrahospitalLocationBeforeIcuAdmission: "",
    UseOfMajorTherapeuticOptionsBeforeIcuAdmission: "",
    plannedOrUnplannedICUAdmission: "",
    surgicalStatusAtIcuAdmission: "",
    acuteInfectionAtIcuAdmission: "",
    glasgowComaScaleScore: "",
    totalBilirubin: "",
    bodyTemperature: "",
    creatinine: "",
    heartRate: "",
    leukocytes: "",
    ph: "",
    platelets: "",
    systolicBloodPressure: "",
    oxygenation: "",
    cancerTherapy: "",
    chronicHF: "",
    haematologicalCancer: "",
    cirrhosis: "",
    aids: "",
    metastaticCancer: "",
    reasonForICUAdmission: "",
    cardiovascularHypovolemicHemorrhagicShockAndHypovolemicNonHemorrhagicShock:
      "",
    digestiveAcuteAbdomenOrOther: "",
    neurologicComaStuporObtundedPatientVigilanceDisturbancesConfusionAgitationDelirium:
      "",
    cardiovascularSepticShock: "",
    cardiovascularAnaphylacticChockMixedAndUndefinedShock: "",
    hepaticLiverFailure: "",
    neurologicFocalNeurologicDeficit: "",
    digestiveSeverePancreatitis: "",
    neurologicIntracranialMassEffect: "",
  });

  const scores = {
    age: {
      "<40": 0,
      "40-59": 5,
      "60-69": 9,
      "70-74": 13,
      "75-79": 15,
      "≥80": 18,
    },
    lengthOfStayBeforeIcuAdmissionDays: { "<14": 0, "14-27": 6, "≥28": 7 },
    intrahospitalLocationBeforeIcuAdmission: {
      "Emergency room": 5,
      "Other ICU": 7,
      "Other ward": 8,
    },
    UseOfMajorTherapeuticOptionsBeforeIcuAdmission: {
      "Other/none": 0,
      "Vasoactive drugs": 3,
    },
    plannedOrUnplannedICUAdmission: { Planned: 0, Unplanned: 3 },
    surgicalStatusAtIcuAdmission: {
      "Scheduled surgery": 0,
      "No surgery": 5,
      "Emergency surgery": 6,
    },
    acuteInfectionAtIcuAdmission: {
      "Other/none": 0,
      Nosocomial: 4,
      Respiratory: 5,
    },
    glasgowComaScaleScore: { "≥13": 1, "7-12": 2, 6: 7.5, 5: 10, "3-4": 15 },
    totalBilirubin: {
      "<2 mg/dL (<34.2 µmol/L)": 1,
      "2-5.9 mg/dL (34.2-102.5 µmol/L)": 4,
      "≥6 mg/dL (≥102.6 µmol/L)": 5,
    },
    bodyTemperature: { "≥35 °C (≥95 °F)": 1, "<35 °C (<95 °F)": 7.5 },
    creatinine: {
      "(3-4 µmol/L)": 15,
      "(5 µmol/L)": 10,
      "(6 µmol/L)": 7.5,
      "<1.2 mg/dL": 1,
      "1.2-1.9 mg/dL": 2,
      "2-3.4 mg/dL": 7,
      "≥3.5 mg/dL": 8,
    },
    heartRate: {
      "<120 beats/min": 1,
      "120-159 beats/min": 5,
      "≥160 beats/min": 7,
    },
    leukocytes: { "<15 G/L": 1, "≥15 G/L": 2 },
    ph: { ">7.25": 1, "≤7.25": 3 },
    platelets: { "≥100 G/L": 1, "50-99 G/L": 5, "20-49 G/L": 8, "<20 G/L": 13 },
    systolicBloodPressure: {
      "≥120 mm Hg ": 1,
      "70-119 mm Hg": 3,
      "40-69 mm Hg": 8,
      "<40 mm Hg": 12,
    },
    oxygenation: {
      "PaO₂≥60 and no MV": 1,
      "PaO₂<60 and no MV": 5,
      "PaO₂/FiO₂≥100 and MV": 7,
      "PaO₂/FiO₂<100 and MV": 11,
    },
    cancerTherapy: { No: 0, Yes: 3 },
    chronicHF: { No: 0, Yes: 6 },
    haematologicalCancer: { No: 0, Yes: 6 },
    cirrhosis: { No: 0, Yes: 8 },
    aids: { No: 0, Yes: 8 },
    metastaticCancer: { No: 0, Yes: 11 },
    reasonForICUAdmission: {
      Neither: 0,
      "Cardiovascular: rhythm disturbances": -5,
      "Neurologic: seizures": -4,
    },
    cardiovascularHypovolemicHemorrhagicShockAndHypovolemicNonHemorrhagicShock:
      { No: 0, Yes: 3 },
    digestiveAcuteAbdomenOrOther: { No: 0, Yes: 3 },
    neurologicComaStuporObtundedPatientVigilanceDisturbancesConfusionAgitationDelirium:
      { No: 0, Yes: 4 },
    cardiovascularSepticShock: { No: 0, Yes: 5 },
    cardiovascularAnaphylacticChockMixedAndUndefinedShock: { No: 0, Yes: 5 },
    hepaticLiverFailure: { No: 0, Yes: 6 },
    neurologicFocalNeurologicDeficit: { No: 0, Yes: 7 },

    digestiveSeverePancreatitis: { No: 0, Yes: 9 },
    neurologicIntracranialMassEffect: { No: 0, Yes: 10 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateSAPS3Score = () => {
    let score = 0;

    for (const [field, value] of Object.entries(formData)) {
      score += scores[field][value] || 0;
    }

    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const SAPSIII = calculateSAPS3Score();
    updateSAPS3(SAPSIII);
    onClose();
  };

  return (
    <>
      <div className="flex justify-between items-start p-5 border-b border-solid border-blueGray-200 rounded-t">
        <h3 className="text-3xl font-semibold">
          Simplified Acute Physiology Score (SAPS) 3 Calculator
        </h3>
      </div>
      <div className="relative p-6 flex-auto space-y-4">
        {Object.keys(scores).map((field) => (
          <div key={field} className="form-group flex space-x-4 items-center">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              {field
                .replace(/_/g, " ")
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            <select
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-3 p-2 block w-full shadow-sm sm:text-sm border border-black rounded-md focus:border-blue-500 focus:ring-blue-500"
            >
              {scores[field] &&
                Object.keys(scores[field]).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Calculate SAPS 3
        </button>
      </div>
    </>
  );
};

export default SAPS3_Calculator;
