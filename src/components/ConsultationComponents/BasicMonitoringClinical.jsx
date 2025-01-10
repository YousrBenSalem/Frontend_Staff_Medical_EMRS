/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function BasicMonitoringClinical({
  isOpen,
  toggleAccordion,
  formValues,
  handleChange,
  setFormValues,
}) {
  const questions = [
    "Sitting and reading",
    "Watching TV",
    "Sitting inactive in a public place",
    "Being a passenger in a car for an hour",
    "Lying down in the afternoon",
    "Sitting and talking to someone",
    "Sitting quietly after lunch (no alcohol)",
    "Stopping for a few minutes in traffic while driving",
  ];

  const [scores, setScores] = useState(Array(questions.length).fill(0));
  const [totalScore, setTotalScore] = useState(0);

  const handleChange1 = (index, value) => {
    const newScores = [...scores];
    newScores[index] = parseInt(value);
    setScores(newScores);
    const newTotalScore = newScores.reduce((a, b) => a + b, 0);
    setTotalScore(newTotalScore);

    setFormValues((prevValues) => ({
      ...prevValues,
      totalEpworthScore: newTotalScore,
      epworthInterpretation: scoreExplanation(newTotalScore),
    }));
  };

  const scoreExplanation = () => {
    if (totalScore <= 10) {
      return "Normal range in healthy adults";
    } else if (totalScore <= 14) {
      return "Mild sleepiness";
    } else if (totalScore <= 17) {
      return "Moderate sleepiness";
    } else {
      return "Severe sleepiness";
    }
  };

  return (
    <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Basic Monitoring clinical
        </h4>
        <div
          className={` ${
            isOpen && "bg-primaryColor text-white border-none"
          } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
            {/*Input 1*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Encephalopathy"
                  id="Encephalopathy"
                  value={formValues.Encephalopathy || ""}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "Yes", "No"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="Encephalopathy"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Encephalopathy
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Nycturia"
                  id="Nycturia"
                  value={formValues.Nycturia || ""}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "Yes", "No"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="Nycturia"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nycturia
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Lowerlimbsedema"
                  id="Lowerlimbsedema"
                  value={formValues.Lowerlimbsedema || ""}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "Yes", "No"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="Lowerlimbsedema"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Lower limbs edema
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="mMRC"
                  id="mMRC"
                  value={formValues.mMRC || ""}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "0", "1", "2", "3", "4"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="mMRC"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  mMRC
                </label>
              </div>
            </div>
            {/*Input 2*/}
            <div className="grid md:grid-cols-1 md:gap-6">
              <div className="mt-4">
                <h1 className="mb-4 w-full  text-lg font-medium text-black">
                  Epworth Score : Chance of dozing or sleeping when :
                </h1>
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions.map((question, index) => (
                      <div key={index} className="mb-5">
                        <label className="block mb-2">{question}</label>
                        <div className="flex space-x-4">
                          {[0, 1, 2, 3].map((value) => (
                            <label
                              key={value}
                              className="inline-flex items-center"
                            >
                              <input
                                type="radio"
                                name={`question${index}`}
                                value={value}
                                onChange={() => handleChange1(index, value)}
                                className="form-radio"
                              />
                              <span className="ml-2">{value}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="p-2 border border-gray-300 rounded-md">
                      <strong>Score Epworth:</strong>{" "}
                      <input
                        type="number"
                        name="totalEpworthScore"
                        value={totalScore || formValues.totalEpworthScore}
                      />
                    </div>
                    <div className="mt-2 p-2 border border-gray-300 rounded-md">
                      <strong>Score Interpretation:</strong>{" "}
                      <input
                        type="text"
                        className="w-96"
                        name="epworthInterpretation"
                        value={
                          scoreExplanation() || formValues.epworthInterpretation
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasicMonitoringClinical;
