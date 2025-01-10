import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

/* eslint-disable react/prop-types */
function Tolerance({ isOpen, toggleAccordion, formValues, handleChange }) {
  return (
    <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Tolerance
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
                <h3 className="mb-2 text-sm text-gray-500">NIV side effects</h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="NIVSideEffects"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="UnintentionalLeaks"
                        type="checkbox"
                        name="UnintentionalLeaks"
                        checked={formValues.UnintentionalLeaks || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="UnintentionalLeaks"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Unintentional Leaks
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="ConjunctivalIrritation"
                        type="checkbox"
                        name="ConjunctivalIrritation"
                        checked={formValues.ConjunctivalIrritation || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="ConjunctivalIrritation"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Conjunctival Irritation
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="Pain"
                        type="checkbox"
                        name="Pain"
                        checked={formValues.Pain || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Pain"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Pain
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="SkinLesions"
                        type="checkbox"
                        name="SkinLesions"
                        checked={formValues.SkinLesions || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="SkinLesions"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Skin Lesions
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="NasalObstruction"
                        type="checkbox"
                        name="NasalObstruction"
                        checked={formValues.NasalObstruction || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="NasalObstruction"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Nasal Obstruction
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="MucosalDryness"
                        type="checkbox"
                        name="MucosalDryness"
                        checked={formValues.MucosalDryness || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="MucosalDryness"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Mucosal Dryness
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Rhinorrhea"
                        type="checkbox"
                        name="Rhinorrhea"
                        checked={formValues.Rhinorrhea || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Rhinorrhea"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Rhinorrhea
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="InappropriateAlarmSettings"
                        type="checkbox"
                        name="InappropriateAlarmSettings"
                        checked={formValues.InappropriateAlarmSettings || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="InappropriateAlarmSettings"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Inappropriate Alarm Settings
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="AbdominalDistention"
                        type="checkbox"
                        name="AbdominalDistention"
                        checked={formValues.AbdominalDistention || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="AbdominalDistention"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Abdominal Distention
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="DisruptedSleep"
                        type="checkbox"
                        name="DisruptedSleep"
                        checked={formValues.DisruptedSleep || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="DisruptedSleep"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Disrupted Sleep
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Claustrophobia"
                        type="checkbox"
                        name="Claustrophobia"
                        checked={formValues.Claustrophobia || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Claustrophobia"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Claustrophobia
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="AnxietyRelatedToInterface"
                        type="checkbox"
                        name="AnxietyRelatedToInterface"
                        checked={formValues.AnxietyRelatedToInterface || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="AnxietyRelatedToInterface"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Anxiety Related to interface
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tolerance;
