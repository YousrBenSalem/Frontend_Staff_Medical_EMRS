import Lyout from "../components/lyout/Lyout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import PatientDemographics from "../components/PatientComponents/PatientDemographics";
import ID from "../components/PatientComponents/ID";
import Insurance from "../components/PatientComponents/Insurance";
import UnderlyingConditions from "../components/PatientComponents/UnderlyingConditions";
import FunctionalState from "../components/PatientComponents/FunctionalState";
import Treatment from "../components/PatientComponents/Treatment";
import Severity from "../components/PatientComponents/Severity";
import RelevantTreatableTraits from "../components/PatientComponents/RelevantTreatableTraits";
import ReliableBiomarkers from "../components/PatientComponents/ReliableBiomarkers";
import VentilatorySupportDuringTheAcuteSetting from "../components/PatientComponents/VentilatorySupportDuringTheAcuteSetting";
import Autonomy from "../components/PatientComponents/Autonomy";
import Biomarkers from "../components/PatientComponents/Biomarkers";
import Management from "../components/PatientComponents/Management";
import HomeNIVInitiationReport from "../components/PatientComponents/HomeNIVInitiationReport";
import Account from "../components/PatientComponents/Account";
import { useSelector } from "react-redux";

function AddPatient() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
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
  const [isOpen12, setIsOpen12] = useState(false);
  const [isOpen13, setIsOpen13] = useState(false);
  const [isOpen14, setIsOpen14] = useState(false);
  const [formValues, setFormValues] = useState({
    //Patient demographics
    name: "",
    birthDate: "",
    residency: "",
    occupation: "",
    patientPhoto: "",
    //ID
    icuPdFileNumber: "",
    phoneNumber: "",
    icuPdDischargeDate: "",
    attendingPhysician: "",
    //Insurance
    cnamId: "",
    healthcareInsuranceCardScanFile: "",
    apciIrc11J45: "",
    apciScanFile: "",
    provider: "",
    otherProvider: "",
    // Underlying Conditions
    bmi: "",
    chronicDiseases: "",
    phenotype: "",
    gold: "",
    moderateExacerbationsLastYear: "",
    severeExacerbationsLastYear: "",
    PH: "",
    PO2History: "",
    PCO2: "",
    BICAR: "",
    Diabetes: false,
    Hypertension: false,
    ChronicLeftHeartFailure: false,
    Hypothyroidism: false,
    Immunosuppression: false,
    OtherComorbidities: "",
    charlsonComorbidityIndex: "",
    Distension: false,
    fibrosis: false,
    Restriction: false,
    Condensations: false,
    Interstitial: false,
    Emphysema: false,
    Bronchiectasis: false,
    chestImagingDate: "",
    PulmonaryFunctionalTesting: "",
    PulmonaryFunctionalTestingDate: "",
    FEV1_FVC: "",
    FEV1: "",
    PulmonaryFunctionalTestingFile: "",
    RespiratoryPolygraphy: "",
    RespiratoryPolygraphyDate: "",
    AHI: "",
    DI: "",
    meanSpO2: "",
    RespiratoryPolygraphyFile: "",
    //Functional State
    mMRC: "",
    CAT: "",
    WHO: "",
    MacCabe: "",
    epworthInterpretation: "",
    totalEpworthScore: 0,
    // Treatment
    smoke: "",
    smokeCessationDelay: "",
    LABA: false,
    LAMA: false,
    SABA: false,
    ICS: false,
    physiotherapy: "",
    rehabilitation: "",
    lasilix: "",
    bBlockers: "",
    aldactone: "",
    lThyroxine: "",
    others: "",
    OLD: "",
    NIV: "",
    // ICU/PD Acute presentation
    //Severity
    Diagnosis: "",
    SAPSIII: "",
    APACHEIII: "",
    MOF: "",
    //Relevant Treabletable Traits
    RHF: false,
    BronchialHR: false,
    Asthma: false,
    LHF: false,
    Reflux: false,
    Emphysema1: false,
    OSAS: false,
    Obesity: false,
    Hyperoesinophilia: false,
    KidneyFailure: false,
    Anemia: false,
    Arythmia: false,
    OtherTTE: "",
    //Reliable Biomarkers
    Eosinophilia: "",
    Hemoglobin: "",
    Creatinine: "",
    FT4: "",
    TSH: "",
    PAH: false,
    RVdilatation: false,
    LLHEF: false,
    LVDiastolicDysfunction: false,
    HTCM: false,
    ICM: false,
    MDR: false,
    Pseudomonas: false,
    Acinetobacter: false,
    BroadSpectrumATBuse: "",
    //Ventilatory Support During The Acute Setting
    O2: false,
    NIV1: false,
    CPAP: false,
    HFNC: false,
    IMV: false,
    Tracheotomy: false,
    //ICU/PD Discharge
    DateOfDischarge: "",
    HR: "",
    SixMWT: "",
    mMRC1: "",
    WHO1: "",
    AKI: false,
    LHF1: false,
    RHF1: false,
    //Biomarkers
    PH1: "",
    pCO21: "",
    pO21: "",
    ChestCTscan: "",
    Distension1: false,
    Fibrosis1: false,
    Restriction1: false,
    Condensations1: false,
    Interstitial1: false,
    Emphysema2: false,
    Bronchiectasis1: false,
    ChestCTscanFile: "",
    RespiratoryPolygraphyAtICU: "",
    RespiratoryPolygraphyDate1: "",
    AHI_H: "",
    DI_H: "",
    meanSpO21: "",
    RespiratoryPolygraphyFile1: "",
    ICU_PDStayReport: "",
    AP3Scan: "",
    // Management
    DateManagement: "",
    Smoke: "",
    LABA1: false,
    LAMA1: false,
    SABA1: false,
    ICS1: "",
    Physiotherapy: "",
    Rehabilitation: "",
    Lasilix: "",
    BBlockers: "",
    Aldactone: "",
    LThyroxine: "",
    Others: "",
    // Home NIV Initiation Report
    VentilatorySupportAtDischarge: "",
    IPAP: "",
    EPAP: "",
    OLD1: "",
    Leaks: "",
    AHI1: "",
    PVA: "",
    NocturnalDuration: "",
    DiurnalDuration: "",
    provider1: "",
    otherProvider1: "",
    //email
    email: "",
    password: "",
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
  const toggleAccordion12 = () => {
    setIsOpen12(!isOpen12);
  };
  const toggleAccordion13 = () => {
    setIsOpen13(!isOpen13);
  };
  const toggleAccordion14 = () => {
    setIsOpen14(!isOpen14);
  };
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const getValue = (field) => event.target[field]?.value || "";
    const getFile = (field) => event.target[field]?.files[0] || null;
    const getCheckbox = (field) => event.target[field]?.checked || false;
    const getNumber = (field) => parseFloat(event.target[field]?.value) || 0;

    const doctorId = user.doctorId ? user.doctorId : user._id;
    console.log(doctorId);
    const formValues = {
      //Patient demographics
      name: getValue("name"),
      birthDate: getValue("birthDate"),
      residency: getValue("residency"),
      occupation: getValue("occupation"),
      //ID
      icuPdFileNumber: getValue("icuPdFileNumber"),
      phoneNumber: getValue("phoneNumber"),
      icuPdDischargeDate: getValue("icuPdDischargeDate"),
      attendingPhysician: getValue("attendingPhysician"),
      //Insurance
      cnamId: getValue("cnamId"),
      apciIrc11J45: getValue("apciIrc11J45"),

      provider: getValue("provider"),
      otherProvider: getValue("otherProvider"),
      // Underlying Conditions
      bmi: getNumber("bmi"),
      chronicDiseases: getValue("chronicDiseases"),
      phenotype: getValue("phenotype"),
      gold: getValue("gold"),
      moderateExacerbationsLastYear: getNumber("moderateExacerbationsLastYear"),
      severeExacerbationsLastYear: getNumber("severeExacerbationsLastYear"),
      PH: getNumber("PH"),
      PO2History: getNumber("PO2History"),
      PCO2: getNumber("PCO2"),
      BICAR: getNumber("BICAR"),
      Diabetes: getCheckbox("Diabetes"),
      Hypertension: getCheckbox("Hypertension"),
      ChronicLeftHeartFailure: getCheckbox("ChronicleftHearFailure"),
      Hypothyroidism: getCheckbox("Hypothyroidism"),
      Immunosuppression: getCheckbox("Immunosuppression"),
      OtherComorbidities: getValue("OtherComorbidities"),
      charlsonComorbidityIndex: getNumber("charlsonComorbidityIndex"),
      Distension: getCheckbox("Distension"),
      Fibrosis: getCheckbox("Fibrosis"),
      Restriction: getCheckbox("Restriction"),
      Condensations: getCheckbox("Condensations"),
      Interstitial: getCheckbox("Interstitial"),
      Emphysema: getCheckbox("Emphysema"),
      Bronchiectasis: getCheckbox("Bronchiectasis"),
      chestImagingDate: getValue("chestImagingDate"),
      PulmonaryFunctionalTesting: getValue("PulmonaryFunctionalTesting"),
      PulmonaryFunctionalTestingDate: getValue(
        "PulmonaryFunctionalTestingDate"
      ),
      FEV1_FVC: getNumber("FEV1_FVC"),
      FEV1: getNumber("FEV1"),

      RespiratoryPolygraphy: getValue("RespiratoryPolygraphy"),
      RespiratoryPolygraphyDate: getValue("RespiratoryPolygraphyDate"),
      AHI: getNumber("AHI"),
      DI: getNumber("DI"),
      meanSpO2: getNumber("meanSpO2"),

      //Functional State
      mMRC: getValue("mMRC"),
      CAT: getNumber("CAT"),
      WHO: getValue("WHO"),
      MacCabe: getValue("MacCabe"),
      epworthInterpretation: getValue("epworthInterpretation"),
      totalEpworthScore: getNumber("totalEpworthScore"),

      // Treatment
      smoke: getValue("smoke"),
      smokeCessationDelay: getNumber("smokeCessationDelay"),
      LABA: getCheckbox("LABA"),
      LAMA: getCheckbox("LAMA"),
      SABA: getCheckbox("SABA"),
      ICS: getCheckbox("ICS"),
      physiotherapy: getValue("physiotherapy"),
      rehabilitation: getValue("rehabilitation"),
      lasilix: getValue("lasilix"),
      bBlockers: getValue("bBlockers"),
      aldactone: getValue("aldactone"),
      lThyroxine: getValue("lThyroxine"),
      others: getValue("others"),
      OLD: getValue("OLD"),
      NIV: getValue("NIV"),
      // ICU/PD Acute presentation
      //Severity
      Diagnosis: getValue("Diagnosis"),
      SAPSIII: getNumber("SAPSIII"),
      APACHEIII: getNumber("APACHEIII"),
      MOF: getNumber("MOF"),
      //Relevant Treabletable Traits
      RHF: getCheckbox("RHF"),
      BronchialHR: getCheckbox("BronchialHR"),
      Asthma: getCheckbox("Asthma"),
      LHF: getCheckbox("LHF"),
      Reflux: getCheckbox("Reflux"),
      Emphysema1: getCheckbox("Emphysema1"),
      OSAS: getCheckbox("OSAS"),
      Obesity: getCheckbox("Obesity"),
      Hyperoesinophilia: getCheckbox("Hyperoesinophilia"),
      KidneyFailure: getCheckbox("KidneyFailure"),
      Anemia: getCheckbox("Anemia"),
      Arythmia: getCheckbox("Arythmia"),
      OtherTTE: getValue("OtherTTE"),
      //Reliable Biomarkers
      Eosinophilia: getNumber("Eosinophilia"),
      Hemoglobin: getNumber("Hemoglobin"),
      Creatinine: getNumber("Creatinine"),
      FT4: getNumber("FT4"),
      TSH: getNumber("TSH"),
      PAH: getCheckbox("PAH"),
      RVdilatation: getCheckbox("RVdilatation"),
      LLHEF: getCheckbox("LLHEF"),
      LVDiastolicDysfunction: getCheckbox("LVDiastolicDysfunction"),
      HTCM: getCheckbox("HTCM"),
      ICM: getCheckbox("ICM"),
      MDR: getCheckbox("MDR"),
      Pseudomonas: getCheckbox("Pseudomonas"),
      Acinetobacter: getCheckbox("Acinetobacter"),
      BroadSpectrumATBuse: getValue("BroadSpectrumATBuse"),
      //Ventilatory Support During The Acute Setting
      O2: getCheckbox("O2"),
      NIV1: getCheckbox("NIV1"),
      CPAP: getCheckbox("CPAP"),
      HFNC: getCheckbox("HFNC"),
      IMV: getCheckbox("IMV"),
      Tracheotomy: getCheckbox("Tracheotomy"),
      //ICU/PD Discharge
      DateOfDischarge: getValue("DateOfDischarge"),
      HR: getNumber("HR"),
      SixMWT: getNumber("SixMWT"),
      mMRC1: getValue("mMRC1"),
      WHO1: getValue("WHO1"),
      AKI: getCheckbox("AKI"),
      LHF1: getCheckbox("LHF1"),
      RHF1: getCheckbox("RHF1"),
      //Biomarkers
      PH1: getNumber("PH1"),
      pCO21: getNumber("pCO21"),
      pO21: getNumber("pO21"),
      ChestCTscan: getValue("ChestCTscan"),
      Distension1: getCheckbox("Distension1"),
      Fibrosis1: getCheckbox("Fibrosis1"),
      Restriction1: getCheckbox("Restriction1"),
      Condensations1: getCheckbox("Condensations1"),
      Interstitial1: getCheckbox("Interstitial1"),
      Emphysema2: getCheckbox("Emphysema2"),
      Bronchiectasis1: getCheckbox("Bronchiectasis1"),
      RespiratoryPolygraphyAtICU: getValue("RespiratoryPolygraphyAtICU"),
      RespiratoryPolygraphyDate1: getValue("RespiratoryPolygraphyDate1"),
      AHI_H: getNumber("AHI_H"),
      DI_H: getNumber("DI_H"),
      meanSpO21: getNumber("meanSpO21"),
      // Management
      DateManagement: getValue("DateManagement"),
      Smoke: getValue("Smoke"),
      LABA1: getCheckbox("LABA1"),
      LAMA1: getCheckbox("LAMA1"),
      SABA1: getCheckbox("SABA1"),
      ICS1: getCheckbox("ICS1"),
      Physiotherapy: getValue("Physiotherapy"),
      Rehabilitation: getValue("Rehabilitation"),
      Lasilix: getValue("Lasilix"),
      BBlockers: getValue("BBlockers"),
      Aldactone: getValue("Aldactone"),
      LThyroxine: getValue("LThyroxine"),
      Others: getValue("Others"),
      // Home NIV Initiation Report
      VentilatorySupportAtDischarge: getValue("VentilatorySupportAtDischarge"),
      IPAP: getNumber("IPAP"),
      EPAP: getNumber("EPAP"),
      OLD1: getNumber("OLD1"),
      Leaks: getNumber("Leaks"),
      AHI1: getNumber("AHI1"),
      PVA: getValue("PVA"),
      NocturnalDuration: getNumber("NocturnalDuration"),
      DiurnalDuration: getNumber("DiurnalDuration"),
      provider1: getValue("provider1"),
      otherProvider1: getValue("otherProvider1"),
      //email
      email: getValue("email"),
      password: getValue("password"),
      userId: doctorId,
    };

    if (!formValues.icuPdFileNumber) {
      alert("ICU/PD File Number is required");
      return;
    }

    const formData = new FormData();

    console.log("patientPhoto", getFile("patientPhoto"));
    formData.append("patientPhoto", getFile("patientPhoto"));

    console.log(
      "healthcareInsuranceCardScanFile",
      getFile("healthcareInsuranceCardScanFile")
    );

    formData.append(
      "healthcareInsuranceCardScanFile",
      getFile("healthcareInsuranceCardScanFile")
    );
    console.log("apciScanFile ", getFile("apciScanFile"));

    formData.append("apciScanFile", getFile("apciScanFile"));

    console.log(
      "PulmonaryFunctionalTestingFile ",
      getFile("PulmonaryFunctionalTestingFile")
    );

    formData.append(
      "PulmonaryFunctionalTestingFile",
      getFile("PulmonaryFunctionalTestingFile")
    );

    console.log(
      "RespiratorypolygraphyFile",
      getFile("RespiratorypolygraphyFile")
    );

    formData.append(
      "RespiratorypolygraphyFile",
      getFile("RespiratorypolygraphyFile")
    );

    console.log("ChestCTscanFile ", getFile("ChestCTscanFile"));

    formData.append("ChestCTscanFile", getFile("ChestCTscanFile"));
    console.log(
      "RespiratoryPolygraphyFile1 ",
      getFile("RespiratoryPolygraphyFile1")
    );

    formData.append(
      "RespiratoryPolygraphyFile1",
      getFile("RespiratoryPolygraphyFile1")
    );

    console.log("ICU_PDStayReport ", getFile("ICU_PDStayReport"));

    formData.append("ICU_PDStayReport", getFile("ICU_PDStayReport"));

    console.log("AP3Scan ", getFile("AP3Scan"));

    formData.append("AP3Scan", getFile("AP3Scan"));

    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (!isNaN(value) && typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });
    try {
      const response = await fetch(
        "http://localhost:3000/api/patient/AddPatient",
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (response.ok) {
        messageApi.open({
          type: "success",
          content: "Patient added with success",
        });
        const newPatient = await response.json();
        const patientId = newPatient.data._id;
        console.log("newPatient", patientId);

        navigate(`/calenderAddAppointement/${patientId}`);
      } else {
        messageApi.open({
          type: "error",
          content: "Patient didn't add with success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: error,
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
          encType="multipart/form-data"
        >
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor mt-5">
            History
          </h1>
          {/*Section 1*/}
          <PatientDemographics
            isOpen={isOpen}
            toggleAccordion={toggleAccordion}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 2*/}
          <ID
            isOpen={isOpen1}
            toggleAccordion={toggleAccordion1}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 3*/}
          <Insurance
            isOpen={isOpen2}
            toggleAccordion={toggleAccordion2}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 4*/}
          <UnderlyingConditions
            isOpen={isOpen3}
            toggleAccordion={toggleAccordion3}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 5*/}
          <FunctionalState
            isOpen={isOpen4}
            toggleAccordion={toggleAccordion4}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 6*/}
          <Treatment
            isOpen={isOpen5}
            toggleAccordion={toggleAccordion5}
            formValues={formValues}
            handleChange={handleChange}
          />
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor">
            ICU/PD Acute presentation :
          </h1>
          {/*Section 7*/}
          <Severity
            isOpen={isOpen6}
            toggleAccordion={toggleAccordion6}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 8*/}
          <RelevantTreatableTraits
            isOpen={isOpen7}
            toggleAccordion={toggleAccordion7}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 9*/}
          <ReliableBiomarkers
            isOpen={isOpen8}
            toggleAccordion={toggleAccordion8}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 8*/}
          <VentilatorySupportDuringTheAcuteSetting
            isOpen={isOpen12}
            toggleAccordion={toggleAccordion12}
            formValues={formValues}
            handleChange={handleChange}
          />
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor">
            ICU/PD Discharge :
          </h1>
          {/*section 10*/}
          <Autonomy
            isOpen={isOpen9}
            toggleAccordion={toggleAccordion9}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 11*/}
          <Biomarkers
            isOpen={isOpen10}
            toggleAccordion={toggleAccordion10}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 12*/}
          <Management
            isOpen={isOpen11}
            toggleAccordion={toggleAccordion11}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 13*/}
          <HomeNIVInitiationReport
            isOpen={isOpen13}
            toggleAccordion={toggleAccordion13}
            formValues={formValues}
            handleChange={handleChange}
          />
          <h1 className="text-[15px] leading-4 lg:text-[30px] lg:leading-8 font-bold text-headingColor">
            Create Account :
          </h1>
          {/*Section 14*/}
          <Account
            isOpen={isOpen14}
            toggleAccordion={toggleAccordion14}
            formValues={formValues}
            handleChange={handleChange}
          />
          <div className="flex justify-end">
            <button
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
