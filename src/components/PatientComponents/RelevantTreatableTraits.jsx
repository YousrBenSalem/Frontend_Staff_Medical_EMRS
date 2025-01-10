/* eslint-disable react/prop-types */

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function RelevantTreatableTraits({
  isOpen,
  toggleAccordion,
  formValues,
  handleChange,
}) {
  return (
    <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Relevant Treatable Traits
        </h4>
        <div
          className={` ${
            isOpen && "bg-primaryColor text-white border-none"
          } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
            {/*Input 1*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  Relevant Treabletable Traits
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="RelevantTreabletableTraits"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="rhf-checkbox"
                        type="checkbox"
                        name="RHF"
                        checked={formValues.RHF || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="rhf-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        RHF
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="Bronchial-checkbox"
                        type="checkbox"
                        name="BronchialHR"
                        checked={formValues.BronchialHR || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Bronchial-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Bronchial HR
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="asthma-checkbox"
                        type="checkbox"
                        name="Asthma"
                        checked={formValues.Asthma || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="asthma-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Asthma
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="LHF-checkbox"
                        type="checkbox"
                        name="LHF"
                        checked={formValues.LHF || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="LHF-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        LHF
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Reflux-checkbox"
                        type="checkbox"
                        name="Reflux"
                        checked={formValues.Reflux || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Reflux-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Reflux (GERD)
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="emphysema-checkbox"
                        type="checkbox"
                        name="Emphysema1"
                        checked={formValues.Emphysema1 || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="emphysema-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Emphysema
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="OSAS-checkbox"
                        type="checkbox"
                        name="OSAS"
                        checked={formValues.OSAS || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="OSAS-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        OSAS
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id=" Obesity"
                        type="checkbox"
                        name="Obesity"
                        checked={formValues.Obesity || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Obesity"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Obesity
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Hyperoesinophilia-checkbox"
                        type="checkbox"
                        name="Hyperoesinophilia"
                        checked={formValues.Hyperoesinophilia || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Hyperoesinophilia-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Hyperoesinophilia
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="KidneyFailure-checkbox"
                        type="checkbox"
                        name="KidneyFailure"
                        checked={formValues.KidneyFailure || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="KidneyFailure-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Kidney failure
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Anemia-checkbox"
                        type="checkbox"
                        name="Anemia"
                        checked={formValues.Anemia || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Anemia-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Anemia
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Arythmia-checkbox"
                        type="checkbox"
                        name="Arythmia"
                        checked={formValues.Arythmia || false}
                        onChange={handleChange}
                        data-group="RelevantTreabletableTraits"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Arythmia-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Arythmia
                      </label>
                    </div>
                  </li>
                  <li className="border-gray-200 rounded-t-lg">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="OtherTTE"
                        value={formValues.OtherTTE || ""}
                        onChange={handleChange}
                        id="OtherTTE"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="OtherTTE"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Other Treatable Traits
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

export default RelevantTreatableTraits;
