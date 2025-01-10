/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function ManagementAdjustment({
  isOpen,
  toggleAccordion,
  formValues,
  handleChange,
  consultation,
  handleAdditionalInputChange,
}) {
  const [additionalInputs, setAdditionalInputs] = useState([]);

  const removeAdditionalInput = (id) => {
    setAdditionalInputs(additionalInputs.filter((input) => input.id !== id));
  };
  const addAdditionalInput = () => {
    const newInput = {
      id: additionalInputs.length + 1,
      Class: { value: "", type: "select" },
      INN_DCI: { value: 0, type: "text" },
      BrandName: { value: "", type: "text" },
      CIDdosages: { value: 0, type: "number" },
      Repetition: { value: 0, type: "number" },
      Duration: { value: "", type: "text" },
    };
    setAdditionalInputs([...additionalInputs, newInput]);
  };
  const renderField = (inputId, fieldName, field) => {
    if (field.type === "select") {
      return (
        <div key={fieldName} className="relative z-0 w-full mb-5 group">
          <select
            name={fieldName}
            value={field.value}
            onChange={(e) =>
              handleAdditionalInputInternalChange(
                inputId,
                fieldName,
                e.target.value
              )
            }
            id={fieldName}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          >
            {["", "SABA", "LABA", "LAMA", "ICS", "Combined: LABA+ICS"].map(
              (value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            )}
          </select>
          <label
            htmlFor={fieldName}
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {fieldName}
          </label>
        </div>
      );
    }

    return (
      <div key={fieldName} className="relative z-0 w-full mb-5 group">
        <input
          type={field.type}
          name={fieldName}
          value={field.value}
          onChange={(e) =>
            handleAdditionalInputInternalChange(
              inputId,
              fieldName,
              e.target.value
            )
          }
          id={fieldName}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor={fieldName}
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {fieldName}
        </label>
      </div>
    );
  };
  const renderAdjustmentGroup = (item, index) => (
    <div key={index} className="">
      {" "}
      {/* Espace entre les groupes */}
      <div className="grid md:grid-cols-5 md:gap-6">
        {Object.entries(item)
          .filter(([key]) => !key.includes("id")) // Filtrer les clés contenant 'id'
          .map(([key, value], idx) => (
            <div key={idx} className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name={key}
                value={value || ""}
                onChange={(e) =>
                  handleAdditionalInputInternalChange(
                    item.id,
                    key,
                    e.target.value
                  )
                }
                id={key}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor={key}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {key}
              </label>
            </div>
          ))}
      </div>
    </div>
  );

  const handleAdditionalInputInternalChange = (id, field, value) => {
    setAdditionalInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id
          ? {
              ...input,
              [field]: { ...input[field], value },
            }
          : input
      )
    );
    handleAdditionalInputChange(id, field, value); // Passez les modifications au parent
  };
  return (
    <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
          Management adjustment
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
                  name="Class1"
                  value={formValues.Class1 || ""}
                  onChange={handleChange}
                  id="Class1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                >
                  {[
                    "",
                    "SABA",
                    "LABA",
                    "LAMA",
                    "ICS",
                    "Combined: LABA+ICS",
                  ].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="Class1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Class
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="INN_DCI1"
                  value={formValues.INN_DCI1 || ""}
                  onChange={handleChange}
                  id="INN_DCI1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="INN_DCI1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  INN / DCI
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="BrandName1"
                  value={formValues.BrandName1 || ""}
                  onChange={handleChange}
                  id="BrandName1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="BrandName1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Brand Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  value={formValues.CIDdosages1 || 0}
                  onChange={handleChange}
                  name="CIDdosages1"
                  id="CIDdosages1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="CIDdosages1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  (CID) dosages
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  value={formValues.Repetition1 || 0}
                  onChange={handleChange}
                  name="Repetition1"
                  id="Repetition1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Repetition1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Repetition
                </label>
              </div>
            </div>
            {/*Input 2*/}
            <div className="grid md:grid-cols-5 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={formValues.Duration1 || ""}
                  onChange={handleChange}
                  name="Duration1"
                  id="Duration1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Duration1"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Duration
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={formValues.Doctor || ""}
                  onChange={handleChange}
                  name="Doctor"
                  id="Doctor"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Doctor"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Doctor
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="Date"
                  value={formValues.Date ? formValues.Date.split("T")[0] : ""}
                  onChange={handleChange}
                  id="Date"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="StampPdfToPatient"
                  id="StampPdfToPatient"
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  accept=".pdf,image/*"
                  placeholder=" "
                />
                <label
                  htmlFor="StampPdfToPatient"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Stamp pdf to patient
                </label>
              </div>
            </div>
            {consultation &&
              consultation?.ManagementAdjustment?.ManagementAdjustmentAdded.map(
                (item, index) => (
                  <div key={index}>{renderAdjustmentGroup(item, index)}</div>
                )
              )}

            {additionalInputs.map((input) => (
              <>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeAdditionalInput(input.id)}
                    className="text-red-500 w-7 h-7 lg:w-8 lg:h-8 hover:border hover:border-solid hover:border-red-500 flex items-center justify-center rounded-full"
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
                <div className="grid md:grid-cols-5 md:gap-6" key={input.id}>
                  {Object.entries(input).map(
                    ([fieldName, field]) =>
                      fieldName !== "id" &&
                      renderField(input.id, fieldName, field)
                  )}
                </div>
              </>
            ))}
          </div>
          {/*Input 3*/}
          <div className="grid md:grid-cols-1 md:gap-6">
            <div className="flex justify-end">
              <div
                className="w-7 h-7 lg:w-8 lg:h-8 hover:border hover:border-solid hover:border-[#141F21] flex items-center justify-center rounded-full"
                onClick={addAdditionalInput}
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagementAdjustment;
