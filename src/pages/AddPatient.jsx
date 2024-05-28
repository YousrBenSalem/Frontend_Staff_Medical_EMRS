import Lyout from "../components/lyout/Lyout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { message } from "antd";
function AddPatient() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isOpen11, setIsOpen11] = useState(false);
  const [formValues, setFormValues] = useState({
    inhaledMedications: {},
    RelevantTreabletableTraits: {},
    VentilatorySupportDuringTheAcuteSetting: {},
    chestImaging1: {},
    TTE: {},
    MDRBacteriaCarriage: {},
    PersistentComplications: {},
    chestImaging3: {},
    inhaledMedications1: {},
  });
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };
  const toggleAccordion2 = () => {
    setIsOpen2(!isOpen2);
  };
  const toggleAccordion3 = () => {
    setIsOpen3(!isOpen3);
  };
  const toggleAccordion4 = () => {
    setIsOpen4(!isOpen4);
  };
  const toggleAccordion5 = () => {
    setIsOpen5(!isOpen5);
  };
  const toggleAccordion6 = () => {
    setIsOpen6(!isOpen6);
  };
  const toggleAccordion7 = () => {
    setIsOpen7(!isOpen7);
  };
  const toggleAccordion8 = () => {
    setIsOpen8(!isOpen8);
  };
  const toggleAccordion9 = () => {
    setIsOpen9(!isOpen9);
  };
  const toggleAccordion10 = () => {
    setIsOpen10(!isOpen10);
  };
  const toggleAccordion11 = () => {
    setIsOpen11(!isOpen11);
  };
  const handleChange = (event) => {
    const { name, value, type, checked, files, dataset } = event.target;
    if (type === "checkbox") {
      const group = dataset.group;
      setFormValues((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [name]: checked,
        },
      }));
      console.log(group);
    } else if (type === "file") {
      setFormValues({ ...formValues, [name]: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] instanceof File || formValues[key] instanceof Blob) {
        formData.append(key, formValues[key]);
      } else {
        formData.append(key, JSON.stringify(formValues[key])); // Ensure complex objects are stringified
      }
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/patient/",
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Success:", response.data);
      navigate(`/calenderAddAppointement?id=${response.data.clientId}`);
      messageApi.open({
        type: "success",
        content: "Patient added with success",
      });
    } catch (error) {
      navigate(`/calenderAddAppointement/1`);
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
    }
  };
  return (
    <Lyout>
      <>
        {contextHolder}
        <form
          className=" mx-auto scroll"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          {/*Section 1*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Patient demographics
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
                      <input
                        type="text"
                        name="name"
                        value={formValues.name || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name/Surname
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="birthDate"
                        value={formValues.birthDate || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="birthDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Birth date
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="residency"
                        value={formValues.residency || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="residency"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] per-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Residency
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="occupation"
                        value={formValues.occupation || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          Choose an occupation
                        </option>
                        <option value="active">Active</option>
                        <option value="jobless">Jobless</option>
                        <option value="retired">Retired</option>
                      </select>
                      <label
                        htmlFor="occupation"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Occupation
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="patientPhotoFile"
                        onChange={handleChange}
                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="patientPhotoFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        patient photo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 2*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion1}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                ID
              </h4>
              <div
                className={` ${
                  isOpen1 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen1 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen1 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="icuPdFileNumber"
                        value={formValues.icuPdFileNumber || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="icuPdFileNumber"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        ICU/PD File Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formValues.phoneNumber || ""}
                        onChange={handleChange}
                        id="phoneNumber"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="Date"
                        name="icuPdDischargeDate"
                        id="icuPdDischargeDate"
                        value={formValues.icuPdDischargeDate}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="icuPdDischargeDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        ICU/PD discharge date
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="attendingPhysician"
                        id="attendingPhysician"
                        value={formValues.attendingPhysician || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />

                      <label
                        htmlFor="attendingPhysician"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Attending Physician
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 3*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion2}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Insurance
              </h4>
              <div
                className={` ${
                  isOpen2 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen2 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen2 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="cnamId"
                        id="cnamId"
                        value={formValues.cnamId || ""}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="cnamId"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        CNAM ID
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="apciIrc11J45"
                        value={formValues.apciIrc11J45 || ""}
                        onChange={handleChange}
                        id="apciIrc11J45"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="apciIrc11J45"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        APCI IRC 11 J45
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="provider"
                        value={formValues.provider || ""}
                        onChange={handleChange}
                        id="provider"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="provider"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Provider (Name)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 4*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion3}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Underlying Conditions
              </h4>
              <div
                className={` ${
                  isOpen3 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen3 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen3 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="chronicDiseases"
                        value={formValues.chronicDiseases || ""}
                        onChange={handleChange}
                        id="chronicDiseases"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose chronic diseases
                        </option>
                        <option value="COPD">COPD</option>
                        <option value="OHS">OHS</option>
                        <option value="NMD">NMD</option>
                        <option value="OSAS">OSAS</option>
                        <option value="RD">RD</option>
                        <option value="Overlap">Overlap</option>
                      </select>
                      <label
                        htmlFor="chronicDiseases"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Chronic Diseases
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        type="text"
                        name="phenotype"
                        value={formValues.phenotype || ""}
                        onChange={handleChange}
                        id="phenotype"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose phenotype
                        </option>
                        <option value="Blue bloater">Blue bloater</option>
                        <option value="Pink puffer">Pink puffer</option>
                      </select>
                      <label
                        htmlFor="chronicDiseases"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Chronic Diseases
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="height"
                        value={formValues.height || ""}
                        onChange={handleChange}
                        id="height"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="height"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Height
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="weight"
                        value={formValues.weight || ""}
                        onChange={handleChange}
                        id="weight"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="weight"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Weight
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="bmi"
                        value={formValues.bmi || ""}
                        onChange={handleChange}
                        id="bmi"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="bmi"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        BMI
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="gold"
                        value={formValues.gold || ""}
                        onChange={handleChange}
                        id="gold"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose Gold
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="E">E</option>
                      </select>
                      <label
                        htmlFor="gold"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Gold
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="charlsonComorbidityIndex"
                        value={formValues.charlsonComorbidityIndex || ""}
                        onChange={handleChange}
                        id="charlsonComorbidityIndex"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="charlsonComorbidityIndex"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        charlson Comorbidity Index
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="comorbidities"
                        value={formValues.comorbidities || ""}
                        onChange={handleChange}
                        id="comorbidities"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose Comorbidities
                        </option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Hypertension">Hypertension</option>
                        <option value="ChronicleftHearFailure">
                          Chronic left Heart Failure
                        </option>
                        <option value="Hypothyroidism">Hypothyroidism</option>
                        <option value="Immunosuppression">
                          Immunosuppression
                        </option>
                      </select>
                      <label
                        htmlFor="comorbidities"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Comorbidities
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="moderateExacerbationsLastYear"
                        value={formValues.moderateExacerbationsLastYear || ""}
                        onChange={handleChange}
                        id="moderateExacerbationsLastYear"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="moderateExacerbationsLastYear"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Moderate Exacerbations Last Year
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="severeExacerbationsLastYear"
                        value={formValues.severeExacerbationsLastYear || ""}
                        onChange={handleChange}
                        id="severeExacerbationsLastYear"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="severeExacerbationsLastYear"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Severe Exacerbations Last Year
                      </label>
                    </div>
                  </div>
                  {/*Input 3*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="chestImaging"
                        value={formValues.chestImaging || ""}
                        onChange={handleChange}
                        id="chestImaging"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose chest Imaging
                        </option>
                        <option value="Distension">Distension</option>
                        <option value="Sequelae">Sequelae</option>
                        <option value="Restriction">Restriction</option>
                        <option value="Condensations">Condensations</option>
                        <option value="Interstitialemphysema">
                          Interstitial emphysema
                        </option>
                        <option value="Bronchiectasis">Bronchiectasis</option>
                        <option value="Fibrosis">Fibrosis</option>
                      </select>
                      <label
                        htmlFor="comorbidities"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Comorbidities
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="chestImagingDate"
                        value={formValues.chestImagingDate || ""}
                        onChange={handleChange}
                        id="chestImagingDate"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="chestImagingDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Chest Imaging Date
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="AHI"
                        value={formValues.AHI || ""}
                        onChange={handleChange}
                        id="AHI"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="AHI"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        AHI
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="DI"
                        value={formValues.DI || ""}
                        onChange={handleChange}
                        id="di"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="DI"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        DI
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="meanSpO2"
                        value={formValues.meanSpO2 || ""}
                        onChange={handleChange}
                        id="meanSpO2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="meanSpO2"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        meanSpO2
                      </label>
                    </div>
                  </div>
                  {/*Input 4*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="PulmonaryFunctionalTesting"
                        value={formValues.PulmonaryFunctionalTesting || ""}
                        onChange={handleChange}
                        id="PulmonaryFunctionalTesting"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose Yes or No
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">Yes</option>
                      </select>
                      <label
                        htmlFor="PulmonaryFunctionalTesting"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Pulmonary Functional Testing
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="PulmonaryFunctionalTestingDate"
                        value={formValues.PulmonaryFunctionalTestingDate || ""}
                        onChange={handleChange}
                        id="PulmonaryFunctionalTestingDate"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="PulmonaryFunctionalTestingDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Pulmonary Functional Testing Date
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="Fev1Fvc"
                        value={formValues.Fev1Fvc || ""}
                        onChange={handleChange}
                        id="Fev1Fvc"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="Fev1Fvc"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Fev1/Fvc
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="Fev1"
                        value={formValues.Fev1 || ""}
                        onChange={handleChange}
                        id="Fev1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="Fev1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Fev1
                      </label>
                    </div>
                  </div>
                  {/*Input 5*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="RespiratorypolygraphyFile"
                        onChange={handleChange}
                        id="RespiratorypolygraphyFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="RespiratorypolygraphyFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Respiratory polygraphy File
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="PulmonaryFunctionalTestingFile"
                        onChange={handleChange}
                        id="PulmonaryFunctionalTestingFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="PulmonaryFunctionalTestingFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Pulmonary Functional Testing File
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 5*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion4}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Functional State
              </h4>
              <div
                className={` ${
                  isOpen4 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen4 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen4 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="mMRC"
                        value={formValues.mMRC || ""}
                        onChange={handleChange}
                        id="mMRC"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose mMRC
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <label
                        htmlFor="apciIrc"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        mMRC
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="cat"
                        value={formValues.cat || ""}
                        onChange={handleChange}
                        id="cat"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="cat"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        CAT
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="who"
                        value={formValues.who || ""}
                        onChange={handleChange}
                        id="who"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose who
                        </option>
                        <option value="Maladie">Maladie</option>
                        <option value="Déficience">Déficience</option>
                        <option value="Incapacité">Incapacité</option>
                        <option value="Handicap">Handicap</option>
                      </select>
                      <label
                        htmlFor="who"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Who
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 6*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion5}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Pharmacological Treatment
              </h4>
              <div
                className={` ${
                  isOpen5 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen5 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen5 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="smoke"
                        value={formValues.smoke || ""}
                        onChange={handleChange}
                        id="smoke"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose smoke state
                        </option>
                        <option value="active">Active</option>
                        <option value="Cessation">Cessation</option>
                      </select>
                      <label
                        htmlFor="smoke"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Smoke
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="smokeCessationDelay"
                        value={formValues.smokeCessationDelay || ""}
                        onChange={handleChange}
                        id="smokeCessationDelay"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="smokeCessationDelay"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Smoke Cessation Delay
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="physiotherapy"
                        value={formValues.physiotherapy || ""}
                        onChange={handleChange}
                        id="physiotherapy"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="physiotherapy"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Physiotherapy
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="rehabilitation"
                        value={formValues.rehabilitation || ""}
                        onChange={handleChange}
                        id="rehabilitation"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="rehabilitation"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Rehabilitation
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="lasilix"
                        value={formValues.lasilix || ""}
                        onChange={handleChange}
                        id="lasilix"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="lasilix"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lasilix
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="bBlockers"
                        value={formValues.bBlockers || ""}
                        onChange={handleChange}
                        id="bBlockers"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="bBlockers"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        B-Blockers
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="aldactone"
                        value={formValues.aldactone || ""}
                        onChange={handleChange}
                        id="aldactone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="aldactone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Aldactone
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="lThyroxine"
                        value={formValues.lThyroxine || ""}
                        onChange={handleChange}
                        id="lThyroxine"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="lThyroxine"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        L-Thyroxine
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="others"
                        value={formValues.others || ""}
                        onChange={handleChange}
                        id="others"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="others"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Others
                      </label>
                    </div>
                  </div>
                  {/*Input 3*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <h3 className="mb-2 text-sm text-gray-500">
                        Inhaled Medications
                      </h3>
                      <ul
                        className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                        id="inhaledMedications"
                      >
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="laba-checkbox"
                              type="checkbox"
                              name="LABA"
                              checked={
                                formValues.inhaledMedications.LABA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="laba-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              LABA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="lama-checkbox"
                              type="checkbox"
                              name="LAMA"
                              checked={
                                formValues.inhaledMedications.LAMA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="lama-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              LAMA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="saba-checkbox"
                              type="checkbox"
                              name="SABA"
                              checked={
                                formValues.inhaledMedications.SABA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="saba-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              SABA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="ics-checkbox"
                              type="checkbox"
                              name="ICS"
                              checked={
                                formValues.inhaledMedications.ICS || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="ics-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              ICS
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
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor">
            ICU/PD Acute presentation :
          </h1>
          {/*Section 7*/}
          <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion6}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Severity
              </h4>
              <div
                className={` ${
                  isOpen6 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen6 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen6 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="Diagnosis"
                        value={formValues.Diagnosis || ""}
                        onChange={handleChange}
                        id="Diagnosis"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose an option
                        </option>
                        <option value="AECOPD">AECOPD</option>
                        <option value="LHF">LHF</option>
                        <option value="PE">PE</option>
                        <option value="PNO">PNO</option>
                        <option value="CAP">CAP</option>
                        <option value="ARDS">ARDS</option>
                        <option value="Atelectasis">Atelectasis</option>
                      </select>
                      <label
                        htmlFor="Diagnosis"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Diagnosis
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="saps"
                        value={formValues.saps || ""}
                        onChange={handleChange}
                        id="saps"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="saps"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        SAPS II
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="apache"
                        value={formValues.apache || ""}
                        onChange={handleChange}
                        id="apache"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="apache"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        APACHE II
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="mof"
                        value={formValues.mof || ""}
                        onChange={handleChange}
                        id="mof"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="mof"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        MOF
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <textarea
                        type="text"
                        name="Commentary"
                        value={formValues.commentary || ""}
                        onChange={handleChange}
                        id="Commentary"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="  Commentary"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Commentary
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/*Section 8*/}
          <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion7}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Relevant Treatable Traits
              </h4>
              <div
                className={` ${
                  isOpen7 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen7 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen7 && (
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
                              checked={
                                formValues.RelevantTreabletableTraits.RHF ||
                                false
                              }
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
                              checked={
                                formValues.RelevantTreabletableTraits
                                  .BronchialHR || false
                              }
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
                              checked={
                                formValues.RelevantTreabletableTraits.Asthma ||
                                false
                              }
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
                              checked={
                                formValues.inhaledMedications.LHF || false
                              }
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
                              checked={
                                formValues.inhaledMedications.Reflux || false
                              }
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
                              name="Emphysema"
                              checked={
                                formValues.inhaledMedications.Emphysema || false
                              }
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
                              checked={
                                formValues.inhaledMedications.OSAS || false
                              }
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
                              id=" Obesity-checkbox"
                              type="checkbox"
                              name="Obesity"
                              checked={
                                formValues.inhaledMedications.Obesity || false
                              }
                              onChange={handleChange}
                              data-group="RelevantTreabletableTraits"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Obesity-checkbox"
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
                              checked={
                                formValues.inhaledMedications
                                  .Hyperoesinophilia || false
                              }
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
                      </ul>
                    </div>
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
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting.O2 ||
                                false
                              }
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
                              name="NIV"
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting
                                  .NIV || false
                              }
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
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting
                                  .CPAP || false
                              }
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
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting
                                  .HFNC || false
                              }
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
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting
                                  .IMV || false
                              }
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
                              checked={
                                formValues
                                  .VentilatorySupportDuringTheAcuteSetting
                                  .Tracheotomy || false
                              }
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
          {/*Section 9*/}
          <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion8}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Reliable Biomarkers
              </h4>
              <div
                className={` ${
                  isOpen8 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen8 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen8 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-10 group">
                      <input
                        type="text"
                        name="pH"
                        value={formValues.pH || ""}
                        onChange={handleChange}
                        id="pH"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="pH"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        PH
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="pCO2"
                        value={formValues.pCO2 || ""}
                        onChange={handleChange}
                        id="pCO2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="pCO2"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        pCO2 mmHg
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="pO2"
                        value={formValues.pO2 || ""}
                        onChange={handleChange}
                        id="pO2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="pO2"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        pO2 mmHg
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="IcuPdLos"
                        value={formValues.IcuPdLos || ""}
                        onChange={handleChange}
                        id="IcuPdLos"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="IcuPdLos"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        ICU/PD LOS
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="BroadSpectrumAtbUse"
                        value={formValues.BroadSpectrumAtbUse || ""}
                        onChange={handleChange}
                        id="BroadSpectrumAtbUse"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="BroadSpectrumAtbUse"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Broad spectrum ATB use
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 group">
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
                              id="Distension-checkbox"
                              type="checkbox"
                              name="Distension"
                              checked={
                                formValues.chestImaging1.Distension || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Distension-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              Distension
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="fibrosis-checkbox"
                              type="checkbox"
                              name="fibrosis"
                              checked={
                                formValues.chestImaging1.fibrosis || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="fibrosis-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              Fibrosis
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="Restriction-checkbox"
                              type="checkbox"
                              name="Restriction"
                              checked={
                                formValues.chestImaging1.Restriction || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Restriction-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              Restriction
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="Condensations-checkbox"
                              type="checkbox"
                              name="Condensations"
                              checked={
                                formValues.chestImaging1.Condensations || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Condensations-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              Condensations
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="Interstitial-checkbox"
                              type="checkbox"
                              name="Interstitial"
                              checked={
                                formValues.chestImaging1.Interstitial || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Interstitial-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              Interstitial
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="emphysema-checkbox"
                              type="checkbox"
                              name="Emphysema"
                              checked={
                                formValues.chestImaging1.Emphysema || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
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
                              id="Bronchiectasis-checkbox"
                              type="checkbox"
                              name="Bronchiectasis"
                              checked={
                                formValues.chestImaging1.Bronchiectasis || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="Bronchiectasis-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              Bronchiectasis
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
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
                              checked={formValues.TTE.PAH || false}
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
                              checked={formValues.TTE.RVdilatation || false}
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
                              checked={formValues.TTE.LLHEF || false}
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
                              name="LVDiastolicdysfunction"
                              checked={
                                formValues.TTE.LVDiastolicdysfunction || false
                              }
                              onChange={handleChange}
                              data-group="TTE"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="LVDiastolicdysfunction-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              LV Diastolicdysfunction
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="HTCM-checkbox"
                              type="checkbox"
                              name="HTCM"
                              checked={formValues.TTE.HTCM || false}
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
                              checked={formValues.TTE.ICM || false}
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
                        className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                        id="MDRBacteriaCarriage"
                      >
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="MDR-checkbox"
                              type="checkbox"
                              name="MDR"
                              checked={
                                formValues.MDRBacteriaCarriage.MDR || false
                              }
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
                              checked={
                                formValues.MDRBacteriaCarriage.Pseudomonas ||
                                false
                              }
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
                              checked={
                                formValues.MDRBacteriaCarriage.Acinetobacter ||
                                false
                              }
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
                  </div>
                </div>
              </div>
            )}
          </div>
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor">
            ICU/PD Discharge :
          </h1>
          {/*section 10*/}
          <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion9}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Autonomy, Death/AE risk
              </h4>
              <div
                className={` ${
                  isOpen9 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen9 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen9 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-10 group">
                      <input
                        type="date"
                        name="DateOfDischarge"
                        value={formValues.DateOfDischarge || ""}
                        onChange={handleChange}
                        id="DateOfDischarge"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="DateOfDischarge"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Date of discharge
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="HR"
                        value={formValues.headers || ""}
                        onChange={handleChange}
                        id="HR"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="HR"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        HR b/mn
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="SixMWT"
                        value={formValues.SixMWT || ""}
                        onChange={handleChange}
                        id="SixMWT"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="SixMWT"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        6MWT
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="cat1"
                        value={formValues.cat1 || ""}
                        onChange={handleChange}
                        id="cat1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="cat1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        CAT
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 group">
                      <h3 className="mb-2 text-sm text-gray-500">
                        Persistent complications
                      </h3>
                      <ul
                        className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                        id="PersistentComplications"
                      >
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="aki-checkbox"
                              type="checkbox"
                              name="AKI"
                              checked={
                                formValues.PersistentComplications.AKI || false
                              }
                              onChange={handleChange}
                              data-group="PersistentComplications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="aki-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              AKI
                            </label>
                          </div>
                        </li>

                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="lhf-checkbox"
                              type="checkbox"
                              name="LHF"
                              checked={
                                formValues.PersistentComplications.LHF || false
                              }
                              onChange={handleChange}
                              data-group="PersistentComplications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="lhf-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              LHF
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="rhf-checkbox"
                              type="checkbox"
                              name="RHF"
                              checked={
                                formValues.PersistentComplications.RHF || false
                              }
                              onChange={handleChange}
                              data-group="PersistentComplications"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="rhf-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              RHF
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
          {/*Section 11*/}
          <div className="p-3 mt-5  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion10}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Biomarkers
              </h4>
              <div
                className={` ${
                  isOpen10 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen10 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen10 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-10 group">
                      <input
                        type="text"
                        name="ABGsAtDischarge"
                        value={formValues.ABGsAtDischarge || ""}
                        onChange={handleChange}
                        id="ABGsAtDischarge"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="ABGsAtDischarge"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        ABGs at discharge
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="ph1"
                        value={formValues.ph1 || ""}
                        onChange={handleChange}
                        id="ph1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="ph1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        PH
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="pCO21"
                        value={formValues.pCO21 || ""}
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
                        type="text"
                        name="pO21"
                        value={formValues.pO21 || ""}
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
                      <input
                        type="text"
                        name="ahiH"
                        value={formValues.ahiH || ""}
                        onChange={handleChange}
                        id="ahiH"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="ahiH"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        AHI/H
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="diH"
                        value={formValues.diH || ""}
                        onChange={handleChange}
                        id="diH"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="diH"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        DI/H
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="meanSpO21"
                        value={formValues.meanSpO21 || ""}
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
                      <select
                        name="RespiratoryPolygraphy1"
                        value={formValues.RespiratoryPolygraphy1 || ""}
                        onChange={handleChange}
                        id="RespiratoryPolygraphy1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="RespiratoryPolygraphy1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Respiratory polygraphy
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="RespiratoryPolygraphyDate1"
                        value={formValues.RespiratoryPolygraphyDate1 || ""}
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
                      <select
                        name="ChestCTscan2"
                        value={formValues.ChestCTscan2 || ""}
                        onChange={handleChange}
                        id="ChestCTscan2"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="ChestCTscan2"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Chest/CT-scan
                      </label>
                    </div>
                  </div>
                  {/*Input 3*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="RespiratorypolygraphyFile1"
                        onChange={handleChange}
                        id="RespiratorypolygraphyFile1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="RespiratorypolygraphyFile1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Respiratory polygraphy File
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="ChestCTscanFile1"
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
                      <input
                        type="file"
                        name="icuPdStayReportFile"
                        onChange={handleChange}
                        id="icuPdStayReportFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="icuPdStayReportFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        ICU/PD stay report
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="healthcareInsuranceCardScanFile"
                        onChange={handleChange}
                        id="healthcareInsuranceCardScanFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="healthcareInsuranceCardScanFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Healthcare Insurance Card scan
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="ap3ScanFile"
                        onChange={handleChange}
                        id="ap3ScanFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="ap3ScanFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        AP3 scan
                      </label>
                    </div>
                  </div>
                  {/*Input 4*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="file"
                        name="apciScanFile"
                        onChange={handleChange}
                        id="apciScanFile"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        accept=".pdf,image/*"
                        placeholder=" "
                      />
                      <label
                        htmlFor="apciScanFile"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        APCI scan
                      </label>
                    </div>
                    <div className="relative z-0 group">
                      <h3 className="mb-2 text-sm text-gray-500">
                        Chest X-ray/ CT-scan
                      </h3>
                      <ul
                        className="  w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                        id="chestImaging3"
                      >
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="Distension-checkbox1"
                              type="checkbox"
                              name="Distension"
                              checked={
                                formValues.chestImaging3.Distension || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="fibrosis"
                              checked={
                                formValues.chestImaging3.fibrosis || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="Restriction"
                              checked={
                                formValues.chestImaging3.Restriction || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="Condensations"
                              checked={
                                formValues.chestImaging3.Condensations || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="Interstitial"
                              checked={
                                formValues.chestImaging3.Interstitial || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="Emphysema"
                              checked={
                                formValues.chestImaging3.Emphysema || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                              name="Bronchiectasis"
                              checked={
                                formValues.chestImaging3.Bronchiectasis || false
                              }
                              onChange={handleChange}
                              data-group="chestImaging3"
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
                </div>
              </div>
            )}
          </div>
          {/*Section 12*/}
          <div className="p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div
              className="flex items-center justify-between gap-5 "
              onClick={toggleAccordion11}
            >
              <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor">
                Management
              </h4>
              <div
                className={` ${
                  isOpen11 && "bg-primaryColor text-white border-none"
                } w-7 h-7 lg:w-8 lg:h-8 border boerder-solid border-[#141F21] rounded flex items-center justify-center`}
              >
                {isOpen11 ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </div>
            </div>
            {isOpen11 && (
              <div className="mt-4">
                <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor ">
                  {/*Input 1*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="date"
                        name="DateManagement"
                        value={formValues.DateManagement || ""}
                        onChange={handleChange}
                        id="DateManagement"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="DateManagement"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Date Management
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="VentilatorySupportAtDischarge"
                        value={formValues.VentilatorySupportAtDischarge || ""}
                        onChange={handleChange}
                        id="VentilatorySupportAtDischarge"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="VentilatorySupportAtDischarge"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Ventilatory support at discharge
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="MachineBrand"
                        value={formValues.MachineBrand || ""}
                        onChange={handleChange}
                        id="MachineBrand"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="MachineBrand"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Ventilator settings Machine
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="smoke1"
                        value={formValues.smoke1 || ""}
                        onChange={handleChange}
                        id="smoke1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose smoke state
                        </option>
                        <option value="active">Active</option>
                        <option value="Cessation">Cessation</option>
                      </select>
                      <label
                        htmlFor="smoke1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Smoke
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="smokeCessationDelay1"
                        value={formValues.smokeCessationDelay1 || ""}
                        onChange={handleChange}
                        id="smokeCessationDelay1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="smokeCessationDelay1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Smoke Cessation Delay
                      </label>
                    </div>
                  </div>
                  {/*Input 2*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="physiotherapy1"
                        value={formValues.physiotherapy1 || ""}
                        onChange={handleChange}
                        id="physiotherapy1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="physiotherapy1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Physiotherapy
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="rehabilitation1"
                        value={formValues.rehabilitation1 || ""}
                        onChange={handleChange}
                        id="rehabilitation1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="rehabilitation1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Rehabilitation
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="lasilix1"
                        value={formValues.lasilix1 || ""}
                        onChange={handleChange}
                        id="lasilix1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="lasilix1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lasilix
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="bBlockers1"
                        value={formValues.bBlockers1 || ""}
                        onChange={handleChange}
                        id="bBlockers1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="bBlockers1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        B-Blockers
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="aldactone1"
                        value={formValues.aldactone1 || ""}
                        onChange={handleChange}
                        id="aldactone1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="aldactone1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Aldactone
                      </label>
                    </div>
                  </div>
                  {/*Input 3*/}
                  <div className="grid md:grid-cols-5 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                      <select
                        name="lThyroxine1"
                        value={formValues.lThyroxine1 || ""}
                        onChange={handleChange}
                        id="lThyroxine1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      >
                        <option value="" disabled hidden>
                          choose yes or no
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                      <label
                        htmlFor="lThyroxine1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        L-Thyroxine
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="others1"
                        value={formValues.others1 || ""}
                        onChange={handleChange}
                        id="others1"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="others1"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Others
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <h3 className="mb-2 text-sm text-gray-500">
                        Inhaled Medications
                      </h3>
                      <ul
                        className=" w-48 text-sm font-medium text-gray-900rounded-lg text-black"
                        id="inhaledMedications1"
                      >
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="laba1-checkbox"
                              type="checkbox"
                              name="LABA"
                              checked={
                                formValues.inhaledMedications1.LABA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="laba1-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              LABA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="lama1-checkbox"
                              type="checkbox"
                              name="LAMA"
                              checked={
                                formValues.inhaledMedications1.LAMA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="lama-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black "
                            >
                              LAMA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg">
                          <div className="flex items-center ps-3">
                            <input
                              id="saba1-checkbox"
                              type="checkbox"
                              name="SABA"
                              checked={
                                formValues.inhaledMedications1.SABA || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="saba1-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              SABA
                            </label>
                          </div>
                        </li>
                        <li className=" border-gray-200 rounded-t-lg ">
                          <div className="flex items-center ps-3">
                            <input
                              id="ics1-checkbox"
                              type="checkbox"
                              name="ICS"
                              checked={
                                formValues.inhaledMedications1.ICS || false
                              }
                              onChange={handleChange}
                              data-group="inhaledMedications1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor="ics1-checkbox"
                              className="w-full py-3 ms-2 text-sm font-medium text-black"
                            >
                              ICS
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
          <div className="flex justify-end">
            <button
              onClick={async () => {
                await handleSubmit();
              }}
              type="submit"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-5"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </Lyout>
  );
}

export default AddPatient;
