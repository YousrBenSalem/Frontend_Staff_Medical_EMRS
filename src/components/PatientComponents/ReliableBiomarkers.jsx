/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function ReliableBiomarkers({
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
          Reliable Biomarkers
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
              <div className="relative z-0 w-full mb-10 group">
                <input
                  type="number"
                  name="Eosinophilia"
                  value={formValues.Eosinophilia || 0}
                  onChange={handleChange}
                  id="Eosinophilia"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Eosinophilia"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Eosinophilia
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="Hemoglobin"
                  value={formValues.Hemoglobin || 0}
                  onChange={handleChange}
                  id="Hemoglobin"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Hemoglobin"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Hemoglobin
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="Creatinine"
                  value={formValues.Creatinine || 0}
                  onChange={handleChange}
                  id="Creatinine"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Creatinine"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Creatinine
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="FT4"
                  value={formValues.FT4 || 0}
                  onChange={handleChange}
                  id="FT4"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="FT4"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  FT4
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="TSH"
                  value={formValues.TSH || 0}
                  onChange={handleChange}
                  id="TSH"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="TSH"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  TSH
                </label>
              </div>
            </div>
            {/*Input 2*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 group">
                <h3 className="mb-2 text-sm text-gray-500">TTE</h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="TTE"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="PAH-checkbox"
                        type="checkbox"
                        name="PAH"
                        checked={formValues.PAH || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="PAH-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        PAH
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="RVdilatation-checkbox"
                        type="checkbox"
                        name="RVdilatation"
                        checked={formValues.RVdilatation || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="RVdilatation-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        RV dilatation
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="LLHEF-checkbox"
                        type="checkbox"
                        name="LLHEF"
                        checked={formValues.LLHEF || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="LLHEF-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        LLHEF
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="LVDiastolicdysfunction-checkbox"
                        type="checkbox"
                        name="LVDiastolicDysfunction"
                        checked={formValues.LVDiastolicDysfunction || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="LVDiastolicdysfunction-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        LV Diastolic dysfunction
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="HTCM-checkbox"
                        type="checkbox"
                        name="HTCM"
                        checked={formValues.HTCM || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="HTCM-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        HTCM
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="ICM-checkbox"
                        type="checkbox"
                        name="ICM"
                        checked={formValues.ICM || false}
                        onChange={handleChange}
                        data-group="TTE"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="ICM-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        ICM
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative z-0 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  MDR Bacteria Carriage
                </h3>
                <ul
                  className="w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="MDRBacteriaCarriage"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="MDR-checkbox"
                        type="checkbox"
                        name="MDR"
                        checked={formValues.MDR || false}
                        onChange={handleChange}
                        data-group="MDRBacteriaCarriage"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="MDR-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        MDR
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Pseudomonas-checkbox"
                        type="checkbox"
                        name="Pseudomonas"
                        checked={formValues.Pseudomonas || false}
                        onChange={handleChange}
                        data-group="MDRBacteriaCarriage"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Pseudomonas-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Pseudomonas
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Acinetobacter-checkbox"
                        type="checkbox"
                        name="Acinetobacter"
                        checked={formValues.Acinetobacter || false}
                        onChange={handleChange}
                        data-group="MDRBacteriaCarriage"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Acinetobacter-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Acinetobacter
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="BroadSpectrumATBuse"
                  value={formValues.BroadSpectrumATBuse || false}
                  onChange={handleChange}
                  id="BroadSpectrumATBuse"
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
                  htmlFor="BroadSpectrumATBuse"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Broad Spectrum ATB use
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReliableBiomarkers;
