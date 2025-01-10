import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

/* eslint-disable react/prop-types */
function VentilatorySupportDuringTheAcuteSetting({
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
          Ventilatory support during the acute setting
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
                  Ventilatory support during the acute setting
                </h3>
                <ul
                  className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                  id="VentilatorySupportDuringTheAcuteSetting"
                >
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="O2-checkbox"
                        type="checkbox"
                        name="O2"
                        checked={formValues.O2 || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="O2-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        O2
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="NIV-checkbox"
                        type="checkbox"
                        name="NIV1"
                        checked={formValues.NIV1 || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="NIV-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        NIV
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="CPAP-checkbox"
                        type="checkbox"
                        name="CPAP"
                        checked={formValues.CPAP || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="CPAP-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        CPAP
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="HFNC-checkbox"
                        type="checkbox"
                        name="HFNC"
                        checked={formValues.HFNC || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="HFNC-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        HFNC
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="IMV-checkbox"
                        type="checkbox"
                        name="IMV"
                        checked={formValues.IMV || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="IMV-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        IMV
                      </label>
                    </div>
                  </li>
                  <li className=" border-gray-200 rounded-t-lg ">
                    <div className="flex items-center ps-3">
                      <input
                        id="Tracheotomy-checkbox"
                        type="checkbox"
                        name="Tracheotomy"
                        checked={formValues.Tracheotomy || false}
                        onChange={handleChange}
                        data-group="VentilatorySupportDuringTheAcuteSetting"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="Tracheotomy-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-black"
                      >
                        Tracheotomy
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

export default VentilatorySupportDuringTheAcuteSetting;
