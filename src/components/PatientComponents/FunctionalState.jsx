import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CATCalculator from "../CATCalculator/CATCalculator";
import { useState } from "react";

import { Modal } from "antd";

/* eslint-disable react/prop-types */
function FunctionalState({
  isOpen,
  toggleAccordion,
  formValues,
  handleChange,
  setFormValues,
}) {
  const [showModalCAT, setShowModalCAT] = useState(false);

  const updateCAT = (CAT) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      CAT: CAT,
    }));
    setShowModalCAT(false);
  };
  const handleCloseModalCAT = () => {
    setShowModalCAT(false);
  };
  const handleOpenModalCAT = () => {
    setShowModalCAT(true);
  };
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
          Functional State
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
                  name="mMRC"
                  value={formValues.mMRC || ""}
                  onChange={handleChange}
                  id="mMRC"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", 0, 1, 2, 3, 4].map((value) => (
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
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="CAT"
                  value={formValues.CAT || 0}
                  onChange={handleChange}
                  id="CAT"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onClick={handleOpenModalCAT}
                />
                <label
                  htmlFor="CAT"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CAT
                </label>
                <Modal
                  visible={showModalCAT}
                  onCancel={handleCloseModalCAT}
                  footer={null}
                >
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <div className=" flex-auto">
                      <CATCalculator
                        updateCAT={updateCAT}
                        onClose={handleCloseModalCAT}
                      />
                    </div>
                  </div>
                </Modal>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="WHO"
                  value={formValues.WHO || ""}
                  onChange={handleChange}
                  id="WHO"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", 0, 1, 2, 3, 4].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="WHO"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  WHO
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="MacCabe"
                  value={formValues.MacCabe || ""}
                  onChange={handleChange}
                  id="MacCabe"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {[
                    "",
                    "0 : Non-fatal disease",
                    "1: Underlying diseases with a life expectancy of up to 5 years",
                    "2 : Underlying diseases estimated to be fatal within 1 year",
                  ].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="MacCabe"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mac Cabe
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

export default FunctionalState;
