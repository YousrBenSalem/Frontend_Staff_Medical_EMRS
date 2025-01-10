/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Pharmacological({
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
          Pharmacological
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
              <div className="relative z-0 w-full mb-5 group">
                <select
                  type="text"
                  name="PrescriptionAdjustment"
                  value={formValues.PrescriptionAdjustment || ""}
                  onChange={handleChange}
                  id="PrescriptionAdjustment"
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
                  htmlFor="PrescriptionAdjustment"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Prescription Adjustment
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  De novo prescription
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="DeNovoPrescription"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="laba"
                        type="checkbox"
                        name="laba"
                        checked={formValues.laba || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="laba"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        LABA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="lama"
                        type="checkbox"
                        name="lama"
                        checked={formValues.lama || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="lama"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        LAMA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="saba"
                        type="checkbox"
                        name="saba"
                        checked={formValues.saba || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="saba"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        SABA
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="ics"
                        type="checkbox"
                        name="ics"
                        checked={formValues.ics || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="ics"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        ICS
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  Vaccination prescription
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="VaccinationPrescription"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="influenza"
                        type="checkbox"
                        name="influenza"
                        checked={formValues.influenza || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="influenza"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Influenza
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="SARSCoV21"
                        type="checkbox"
                        name="SARSCoV21"
                        checked={formValues.SARSCoV21 || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="SARSCoV21"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        SARS-CoV-2
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="pneumococcus"
                        type="checkbox"
                        name="pneumococcus"
                        checked={formValues.pneumococcus || false}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="pneumococcus"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        pneumococcus
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

export default Pharmacological;
