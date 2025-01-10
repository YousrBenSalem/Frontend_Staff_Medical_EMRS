/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function MedicationsAdherence({
  isOpen,
  toggleAccordion,
  formValues,
  handleChange,
}) {
  return (
    <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Medications adherence
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
                  name="SmokeCessation"
                  value={formValues.SmokeCessation || ""}
                  onChange={handleChange}
                  id="SmokeCessation"
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
                  htmlFor="SmokeCessation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Smoke cessation
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Rehabilitation"
                  value={formValues.Rehabilitation || ""}
                  onChange={handleChange}
                  id="Rehabilitation"
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
                  htmlFor="Rehabilitation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Rehabilitation
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Physiotherapy"
                  value={formValues.Physiotherapy || ""}
                  onChange={handleChange}
                  id="Physiotherapy"
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
                  htmlFor="Physiotherapy"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Physiotherapy
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="Diuretics"
                  value={formValues.Diuretics || ""}
                  onChange={handleChange}
                  id="Diuretics"
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
                  htmlFor="Diuretics"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Diuretics
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="ReasonsOfNonAdherence"
                  value={formValues.ReasonsOfNonAdherence || ""}
                  onChange={handleChange}
                  id="ReasonsOfNonAdherence"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "Financial", "Educational", "Refusal"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="ReasonsOfNonAdherence"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Reasons of non-adherence
                </label>
              </div>
            </div>
            {/*Input 2*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  value={formValues.GOLD1 || ""}
                  onChange={handleChange}
                  name="GOLD1"
                  id="GOLD1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {["", "A", "B", "E"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="GOLD1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  GOLD class
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  Medications adherence
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="MedicationsAdhrence"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="LABA"
                        type="checkbox"
                        name="LABA"
                        checked={formValues.LABA || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="LABA"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        LABA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="LAMA"
                        type="checkbox"
                        name="LAMA"
                        checked={formValues.LAMA || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="LAMA"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        LAMA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="SABA"
                        type="checkbox"
                        name="SABA"
                        checked={formValues.SABA || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="SABA"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        SABA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="ICS"
                        type="checkbox"
                        name="ICS"
                        checked={formValues.ICS || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="ICS"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        ICS
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h3 className="mb-2 text-sm text-gray-500">Vaccinations</h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="Vaccinations"
                >
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="SARSCoV2"
                        type="checkbox"
                        name="SARSCoV2"
                        checked={formValues.SARSCoV2 || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="SARSCoV2"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        SARS-CoV-2
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="Spneumoniae"
                        type="checkbox"
                        name="Spneumoniae"
                        checked={formValues.Spneumoniae || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Spneumoniae"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        S. pneumoniae
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Influenza"
                        type="checkbox"
                        name="Influenza"
                        checked={formValues.Influenza || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Influenza"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Influenza
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

export default MedicationsAdherence;
