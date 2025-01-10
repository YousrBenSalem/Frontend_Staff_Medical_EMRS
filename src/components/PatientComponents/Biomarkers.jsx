/* eslint-disable react/prop-types */
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Biomarkers({ isOpen, toggleAccordion, formValues, handleChange }) {
  return (
    <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Biomarkers
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
                <input
                  type="number"
                  name="PH1"
                  value={formValues.PH1 || 0}
                  onChange={handleChange}
                  id="PH1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="PH1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  PH
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="pCO21"
                  value={formValues.pCO21 || 0}
                  onChange={handleChange}
                  id="pCO21"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="pCO21"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  pCO2 mmHg
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="pO21"
                  value={formValues.pO21 || 0}
                  onChange={handleChange}
                  id="pO21"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="pO21"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  pO2 mmHg
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="ChestCTscan"
                  value={formValues.ChestCTscan || ""}
                  onChange={handleChange}
                  id="ChestCTscan"
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
                  htmlFor="ChestCTscan"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Chest/CT-scan
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h3 className="mb-2 text-sm text-gray-500">
                  Chest X-ray/ CT-scan
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="chestImaging1"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Distension-checkbox1"
                        type="checkbox"
                        name="Distension1"
                        checked={formValues.Distension1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Distension-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Distension
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="fibrosis-checkbox1"
                        type="checkbox"
                        name="Fibrosis1"
                        checked={formValues.Fibrosis1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="fibrosis-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black "
                      >
                        Fibrosis
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg">
                    <div className="flex items-center ps-3">
                      <input
                        id="Restriction-checkbox1"
                        type="checkbox"
                        name="Restriction1"
                        checked={formValues.Restriction1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Restriction-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Restriction
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Condensations-checkbox1"
                        type="checkbox"
                        name="Condensations1"
                        checked={formValues.Condensations1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Condensations-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Condensations
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Interstitial-checkbox1"
                        type="checkbox"
                        name="Interstitial1"
                        checked={formValues.Interstitial1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Interstitial-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Interstitial
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="emphysema-checkbox1"
                        type="checkbox"
                        name="Emphysema2"
                        checked={formValues.Emphysema2 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="emphysema-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Emphysema
                      </label>
                    </div>
                  </li>

                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Bronchiectasis-checkbox1"
                        type="checkbox"
                        name="Bronchiectasis1"
                        checked={formValues.Bronchiectasis1 || false}
                        onChange={handleChange}
                        data-group="chestImaging1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Bronchiectasis-checkbox1"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Bronchiectasis
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/*Input 2*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="ChestCTscanFile"
                  onChange={handleChange}
                  id="ChestCTscanFile1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".pdf,image/*"
                  placeholder=" "
                />
                <label
                  htmlFor="ChestCTscanFile1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Chest/CT-scan File
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="RespiratoryPolygraphyAtICU"
                  value={formValues.RespiratoryPolygraphyAtICU || ""}
                  onChange={handleChange}
                  id="RespiratoryPolygraphyAtICU"
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
                  htmlFor="RespiratoryPolygraphyAtICU"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Respiratory polygraphy at ICU
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="RespiratoryPolygraphyDate1"
                  value={
                    formValues.RespiratoryPolygraphyDate1
                      ? formValues.RespiratoryPolygraphyDate1.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  id="RespiratoryPolygraphyDate1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="RespiratoryPolygraphyDate1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Respiratory Polygraphy Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="AHI_H"
                  value={formValues.AHI_H || 0}
                  onChange={handleChange}
                  id="AHI_H"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="AHI_H"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  AHI/H
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="DI_H"
                  value={formValues.DI_H || 0}
                  onChange={handleChange}
                  id="DI_H"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="  DI_H"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DI/H
                </label>
              </div>
            </div>
            {/*Input 3*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="meanSpO21"
                  value={formValues.meanSpO21 || 0}
                  onChange={handleChange}
                  id="meanSpO21"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="meanSpO21"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  meanSpO2 %
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="RespiratoryPolygraphyFile1"
                  onChange={handleChange}
                  id="RespiratoryPolygraphyFile1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".pdf,image/*"
                  placeholder=" "
                />
                <label
                  htmlFor="RespiratoryPolygraphyFile1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Respiratory polygraphy File
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="ICU_PDStayReport"
                  onChange={handleChange}
                  id="ICU_PDStayReport"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".pdf,image/*"
                  placeholder=" "
                />
                <label
                  htmlFor="ICU_PDStayReport"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ICU/PD stay report
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="AP3Scan"
                  onChange={handleChange}
                  id="AP3Scan"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".pdf,image/*"
                  placeholder=" "
                />
                <label
                  htmlFor="AP3Scan"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  AP3 scan
                </label>
              </div>
            </div>
            {/*Input 4*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default Biomarkers;
