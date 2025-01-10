import { useState } from "react";

const SGRQForm = () => {
  const health = ["Very good", "Good", "Fair", "Poor", "Very poor"];

  const part1Question1 = [
    "Most days a week",
    "Several days a week",
    "A few days a week",
    "Only with chest infections",
    "Not at all",
  ];
  const part1Question2 = [
    "More than 3 attacks ",
    "3 attacks ",
    "2 attacks",
    "1 attack ",
    "No attacks",
  ];
  const part1Question3 = [
    "a week or more ",
    "3 or more days ",
    "1 or 2 days",
    "less than a day ",
  ];
  const part1Question4 = [
    "No good days ",
    "1 or 2 good days ",
    "3 or 4 good days",
    "nearly every day is good  ",
    "every day is good  ",
  ];
  const part1Question5 = ["No ", "Yes"];
  const part2Section1Question1 = [
    "The most important problem I have ",
    "Causes me quite a lot of problems",
    "Causes me a few problems",
    "Causes no problem",
  ];
  const part2Section1Question2 = [
    "My chest trouble made me stop work altogether ",
    "My chest trouble interferes with my work or made me change my work",
    "My chest trouble does not affect my work ",
  ];
  const part2Section2 = ["True ", "False"];

  const part2Section4Questions = [
    "I cannot play sports or games",
    "I cannot go out for entertainment or recreation",
    "I cannot go out of the house to do the shopping",
    "I cannot do housework",
    "I cannot move far from my bed or chair",
  ];

  const [responses, setResponses] = useState({
    health: "",
    part1: "",

    part2Section4: Array(part2Section4Questions.length).fill(""),
  });

  const handleChange = (section, index, event) => {
    if (
      section === "health" ||
      section === "part1" ||
      section == "part2Section1" ||
      section == "part2Section2" ||
      section == "part2Section3" ||
      section == "part2Section4" ||
      section == "part2Section5" ||
      section == "part2Section6"
    ) {
      setResponses({ ...responses, [section]: event.target.value });
    } else {
      const newResponses = { ...responses };
      newResponses[section][index] = event.target.value;
      setResponses(newResponses);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="mb-4 text-lg font-medium text-black">
        St. George&apos;s Respiratory Questionnaire (SGRQ)
      </h1>
      {/*PART 1*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Part 1: Questions about how much chest trouble you have had over the
        past 3 months.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        {/* Question Health */}
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            How would you describe your current health:
          </label>
          {health.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`health_${index}`}
                name="health"
                value={question}
                onChange={(event) => handleChange("health", index, event)}
              />
              <label htmlFor={`health_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            1. Over the past 3 months, I have coughed:
          </label>
          {part1Question1.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            2. Over the past 3 months, I have brought up phlegm (sputum):
          </label>
          {part1Question1.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            3. Over the past 3 months, I have had shortness of breath:
          </label>
          {part1Question1.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. Over the past 3 months, I have had attacks of wheezing:
          </label>
          {part1Question1.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. During the past 3 months how many severe or very unpleasant
            attacks of chest trouble have you had?
          </label>
          {part1Question2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            6. How long did the worst attack of chest trouble last? (Go to
            question 7 if you had no severe attacks)
          </label>
          {part1Question3.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            7. Over the past 3 months, in an average week, how many good days
            (with little chest trouble) have you had?
          </label>
          {part1Question4.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            8. If you have a wheeze, is it worse in the morning?
          </label>
          {part1Question5.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part1_${index}`}
                name="part1"
                value={question}
                onChange={(event) => handleChange("part1", index, event)}
              />
              <label htmlFor={`part1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 1*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Part 2: Section 1
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            How would you describe your chest condition?
          </label>
          {part2Section1Question1.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section1_${index}`}
                name="part2Section1"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section1", index, event)
                }
              />
              <label htmlFor={`part2Section1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            If you have ever had paid employment
          </label>
          {part2Section1Question2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section1_${index}`}
                name="part2Section1"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section1", index, event)
                }
              />
              <label htmlFor={`part2Section1_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 2*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 2: Questions about what activities usually make you feel
        breathless these days.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">1. Sitting or lying still :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">2. Getting washed or dressed:</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">3. Walking around the home :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. Walking outside on the level :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. Walking up a flight of stairs :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">6. Walking up hills :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">7. Playing sports or games</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 2*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 3 Some more questions about your cough and breathlessness these
        days.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">1. Sitting or lying still :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">2. Getting washed or dressed:</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">3. Walking around the home :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. Walking outside on the level :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. Walking up a flight of stairs :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">6. Walking up hills :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">7. Playing sports or games</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section2_${index}`}
                name="part2Section2"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section2", index, event)
                }
              />
              <label htmlFor={`part2Section2_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 3*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 3: Some more questions about your cough and breathlessness these
        days.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">1. My cough hurts:</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">2. My cough makes me tired :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">3. I am breathless when I talk:</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. I am breathless when I bend over:
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. My cough or breathing disturbs my sleep :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">6. I get exhausted easily :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section3_${index}`}
                name="part2Section3"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section3", index, event)
                }
              />
              <label htmlFor={`part2Section3_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 4*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 4: Questions about other effects that your chest trouble may
        have on you these days.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            1. My cough or breathing is embarrassing in public:
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="ppart2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            2. My chest trouble is a nuisance to my family, friends or
            neighbours :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            3. I get afraid or panic when I cannot get my breath:
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. I feel that I am not in control of my chest problem:
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. I do not expect my chest to get any better :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            6. I have become frail or an invalid because of my chest :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">7. Exercise is not safe for me :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            8. Everything seems too much of an effort :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section4_${index}`}
                name="part2Section4"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section4", index, event)
                }
              />
              <label htmlFor={`part2Section4_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 5*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 5: Questions about your medication, if you are receiving no
        medication go straight to section 6.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            1. My medication does not help me very much :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section5_${index}`}
                name="ppart2Section5"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section5", index, event)
                }
              />
              <label htmlFor={`part2Section5_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            2. I get embarrassed using my medication in public :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section5_${index}`}
                name="part2Section5"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section5", index, event)
                }
              />
              <label htmlFor={`part2Section5_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            3. I have unpleasant side effects from my medication :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section5_${index}`}
                name="part2Section5"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section5", index, event)
                }
              />
              <label htmlFor={`part2Section5_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. My medication interferes with my life a lot :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section5_${index}`}
                name="part2Section5"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section5", index, event)
                }
              />
              <label htmlFor={`part2Section5_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 6*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 6: These are questions about how your activities might be
        affected by your breathing.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            1. I take a long time to get washed or dressed :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="ppart2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            2. I cannot take a bath or shower, or I take a long time :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            3. I walk slower than other people, or I stop for rests :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            4. Jobs such as housework take a long time, or I have to stop for
            rests :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. If I walk up one flight of stairs, I have to go slowly or stop :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            6. If I hurry or walk fast, I have to stop or slow down :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            7. My breathing makes it difficult to do things such as walk up
            hills, carrying things up stairs, light gardening such as weeding,
            dance, play bowls or play golf :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            8. My breathing makes it difficult to do things such as carry heavy
            loads, dig the garden or shovel snow, jog or walk at 5 miles per
            hour, play tennis or swim :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            9. My breathing makes it difficult to do things such as very heavy
            manual work, run, cycle, swim fast or play competitive sports :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section6_${index}`}
                name="part2Section6"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section6", index, event)
                }
              />
              <label htmlFor={`part2Section6_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
      {/*PART 2 SECTION 7*/}
      <h2 className="mb-4 text-lg font-bold text-textColor">
        Section 7: We would like to know how your chest usually affects your
        daily life
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            1. I cannot play sports or games :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section7_${index}`}
                name="ppart2Section7"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section7", index, event)
                }
              />
              <label htmlFor={`part2Section7_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            2. I cannot go out for entertainment or recreation c :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section7_${index}`}
                name="part2Section7"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section7", index, event)
                }
              />
              <label htmlFor={`part2Section7_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            3. I cannot go out of the house to do the shopping :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section7_${index}`}
                name="part2Section7"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section7", index, event)
                }
              />
              <label htmlFor={`part2Section7_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">4. I cannot do housework :</label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section7_${index}`}
                name="part2Section7"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section7", index, event)
                }
              />
              <label htmlFor={`part2Section7_${index}`}>{question}</label>
            </div>
          ))}
        </div>
        <div className="col-span-1 mb-5">
          <label className="block mb-2">
            5. I cannot move far from my bed or chair :
          </label>
          {part2Section2.map((question, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`part2Section7_${index}`}
                name="part2Section7"
                value={question}
                onChange={(event) =>
                  handleChange("part2Section7", index, event)
                }
              />
              <label htmlFor={`part2Section7_${index}`}>{question}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SGRQForm;
