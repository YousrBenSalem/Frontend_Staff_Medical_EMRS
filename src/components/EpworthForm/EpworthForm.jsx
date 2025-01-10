import { useState } from "react";

const EpworthForm = () => {
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

  const handleChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = parseInt(value);
    setScores(newScores);
    setTotalScore(newScores.reduce((a, b) => a + b, 0));
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
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question${index}`}
                      value={value}
                      onChange={() => handleChange(index, value)}
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
          <label className="block mb-2 font-bold">Total Epworth Score</label>
          <div className="p-2 border border-gray-300 rounded-md">
            {totalScore}
          </div>
          <div className="mt-2 p-2 border border-gray-300 rounded-md">
            <strong>Score Interpretation:</strong> {scoreExplanation()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpworthForm;
