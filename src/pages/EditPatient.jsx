import Lyout from "../components/lyout/Lyout";
import { useEffect, useState } from "react";
import { message } from "antd";

import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientDemographics from "./../components/PatientComponents/PatientDemographics";
import ID from "./../components/PatientComponents/ID";
import Insurance from "./../components/PatientComponents/Insurance";
import UnderlyingConditions from "./../components/PatientComponents/UnderlyingConditions";
import FunctionalState from "./../components/PatientComponents/FunctionalState";
import Treatment from "./../components/PatientComponents/Treatment";
import Severity from "./../components/PatientComponents/Severity";
import RelevantTreatableTraits from "./../components/PatientComponents/RelevantTreatableTraits";
import ReliableBiomarkers from "./../components/PatientComponents/ReliableBiomarkers";
import VentilatorySupportDuringTheAcuteSetting from "./../components/PatientComponents/VentilatorySupportDuringTheAcuteSetting";
import Autonomy from "./../components/PatientComponents/Autonomy";
import Biomarkers from "./../components/PatientComponents/Biomarkers";
import Management from "./../components/PatientComponents/Management";
import HomeNIVInitiationReport from "./../components/PatientComponents/HomeNIVInitiationReport";

function EditPatient() {
  const [messageApi, contextHolder] = message.useMessage();
  // const navigate = useNavigate();
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

  const [patient, setPatient] = useState({});
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    //Patient demographics
    name: "",
    birthDate: null,
    residency: "",
    occupation: "",
    patientPhoto: null,
    //ID
    icuPdFileNumber: "",
    phoneNumber: "",
    icuPdDischargeDate: null,
    attendingPhysician: "",
    //Insurance
    cnamId: "",
    healthcareInsuranceCardScanFile: null,
    apciIrc11J45: "",
    apciScanFile: null,
    provider: "",
    otherProvider: "",
    // Underlying Conditions
    bmi: 0,
    chronicDiseases: "",
    phenotype: "",
    gold: "",
    moderateExacerbationsLastYear: 0,
    severeExacerbationsLastYear: 0,
    PH: 0,
    PO2: 0,
    PCO2: 0,
    BICAR: 0,
    Diabetes: false,
    Hypertension: false,
    ChronicleftHearFailure: false,
    Hypothyroidism: false,
    Immunosuppression: false,
    OtherComorbidities: "",
    charlsonComorbidityIndex: 0,
    Distension: false,
    Fibrosis: false,
    Restriction: false,
    Condensations: false,
    Interstitial: false,
    Emphysema: false,
    Bronchiectasis: false,
    chestImagingDate: null,
    PulmonaryFunctionalTesting: "",
    PulmonaryFunctionalTestingDate: null,
    FEV1_FVC: 0,
    FEV1: 0,
    PulmonaryFunctionalTestingFile: null,
    RespiratoryPolygraphy: "",
    RespiratoryPolygraphyDate: null,
    AHI: 0,
    DI: 0,
    meanSpO2: 0,
    RespiratoryPolygraphyFile: null,
    //Functional State
    mMRC: "",
    CAT: 0,
    WHO: "",
    MacCabe: "",
    epworthInterpretation: "",
    totalEpworthScore: 0,
    // Treatment
    smoke: "",
    smokeCessationDelay: 0,
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
    SAPSIII: 0,
    APACHEIII: 0,
    MOF: 0,
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
    Eosinophilia: 0,
    Hemoglobin: 0,
    Creatinine: 0,
    FT4: 0,
    TSH: 0,
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
    DateOfDischarge: null,
    HR: 0,
    SixMWT: 0,
    mMRC1: "",
    WHO1: "",
    AKI: false,
    LHF1: false,
    RHF1: false,
    //Biomarkers
    PH1: 0,
    pCO21: 0,
    pO21: 0,
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
    RespiratoryPolygraphyDate1: null,
    AHI_H: 0,
    DI_H: 0,
    meanSpO21: 0,
    RespiratoryPolygraphyFile1: "",
    ICU_PDStayReport: "",
    AP3Scan: "",
    // Management
    DateManagement: null,
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
    IPAP: 0,
    EPAP: 0,
    OLD1: 0,
    Leaks: 0,
    AHI1: 0,
    PVA: "",
    NocturnalDuration: 0,
    DiurnalDuration: 0,
    provider1: "",
    otherProvider1: "",
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
  const fetchPatient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/patient/patients/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data && response.data.data) {
        setPatient(response.data.data);
        setFormValues({
          //Patient demographics
          name: response.data.data.History?.PatientDemographics?.name,
          birthDate: response.data.data.History?.PatientDemographics?.birthDate,

          residency: response.data.data.History?.PatientDemographics?.residency,
          occupation:
            response.data.data.History?.PatientDemographics?.occupation,
          //ID
          icuPdFileNumber: response.data.data.History?.ID?.icuPdFileNumber,
          phoneNumber: response.data.data.History?.ID?.phoneNumber,
          icuPdDischargeDate:
            response.data.data.History?.ID?.icuPdDischargeDate,
          attendingPhysician:
            response.data.data.History?.ID?.attendingPhysician,
          //Insurance
          cnamId: response.data.data.History?.Insurance?.cnamId,
          healthcareInsuranceCardScanFile:
            response.data.data.History?.Insurance
              ?.healthcareInsuranceCardScanFile,

          apciIrc11J45: response.data.data.History?.Insurance?.apciIrc11J45,
          apciScanFile: response.data.data.History?.Insurance?.apciScanFile,
          provider: response.data.data.History?.Insurance?.provider,
          otherProvider: response.data.data.History?.Insurance?.otherProvider,
          // Underlyning Conditions
          bmi: response.data.data.History?.underlyingConditions?.bmi,
          chronicDiseases:
            response.data.data.History?.underlyingConditions?.chronicDiseases,
          phenotype:
            response.data.data.History?.underlyingConditions?.phenotype,
          gold: response.data.data.History?.underlyingConditions?.gold,
          moderateExacerbationsLastYear:
            response.data.data.History?.underlyingConditions
              ?.moderateExacerbationsLastYear,
          severeExacerbationsLastYear:
            response.data.data.History?.underlyingConditions
              ?.severeExacerbationsLastYear,
          PH: response.data.data.History?.underlyingConditions?.PH,
          PO2: response.data.data.History?.underlyingConditions?.PO2,
          PCO2: response.data.data.History?.underlyingConditions?.PCO2,
          BICAR: response.data.data.History?.underlyingConditions?.BICAR,
          Diabetes:
            response.data.data.History?.underlyingConditions?.comorbidities
              ?.Diabetes,
          Hypertension:
            response.data.data.History?.underlyingConditions?.comorbidities
              ?.Hypertension,
          ChronicleftHearFailure:
            response.data.data.History?.underlyingConditions?.comorbidities
              ?.ChronicleftHeartFailure,
          Hypothyroidism:
            response.data.data.History?.underlyingConditions?.comorbidities
              ?.Hypothyroidism,
          Immunosuppression:
            response.data.data.History?.underlyingConditions?.comorbidities
              ?.Immunosuppression,
          OtherComorbidities:
            response.data.data.History?.underlyingConditions
              ?.OtherComorbidities,
          charlsonComorbidityIndex:
            response.data.data.History?.underlyingConditions
              ?.charlsonComorbidityIndex,
          Distension:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Distension,
          Fibrosis:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Fibrosis,
          Restriction:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Restriction,
          Condensations:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Condensations,
          Interstitial:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Interstitial,
          Emphysema:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Emphysema,
          Bronchiectasis:
            response.data.data.History?.underlyingConditions?.chestImaging
              ?.Bronchiectasis,
          chestImagingDate:
            response.data.data.History?.underlyingConditions?.chestImagingDate,
          PulmonaryFunctionalTesting:
            response.data.data.History?.underlyingConditions
              ?.PulmonaryFunctionalTesting,
          PulmonaryFunctionalTestingDate:
            response.data.data.History?.underlyingConditions
              ?.PulmonaryFunctionalTestingDate,
          FEV1_FVC: response.data.data.History?.underlyingConditions?.FEV1_FVC,
          FEV1: response.data.data.History?.underlyingConditions?.FEV1,
          PulmonaryFunctionalTestingFile:
            response.data.data.History?.underlyingConditions
              ?.PulmonaryFunctionalTestingFile,
          RespiratoryPolygraphy:
            response.data.data.History?.underlyingConditions
              ?.RespiratoryPolygraphy,
          RespiratoryPolygraphyDate:
            response.data.data.History?.underlyingConditions
              ?.RespiratoryPolygraphyDate,
          AHI: response.data.data.History?.underlyingConditions?.AHI,
          DI: response.data.data.History?.underlyingConditions?.DI,
          meanSpO2: response.data.data.History?.underlyingConditions?.meanSpO2,
          RespiratoryPolygraphyFile:
            response.data.data.History?.underlyingConditions
              ?.RespiratoryPolygraphyFile,
          //Functional State
          mMRC: response.data.data.History?.FunctionalState?.mMRC,
          CAT: response.data.data.History?.FunctionalState?.CAT,
          WHO: response.data.data.History?.FunctionalState?.WHO,
          MacCabe: response.data.data.History?.FunctionalState?.MacCabe,
          totalEpworthScore:
            response.data.data.History?.FunctionalState?.EpworthScore
              ?.totalEpworthScore,
          epworthInterpretation:
            response.data.data.History?.FunctionalState?.EpworthScore
              ?.epworthInterpretation,
          // Treatment
          smoke: response.data.data.History?.Treatment?.smoke,
          smokeCessationDelay:
            response.data.data.History?.Treatment?.smokeCessationDelay,
          LABA: response.data.data.History?.Treatment?.inhaledMedications?.LABA,
          LAMA: response.data.data.History?.Treatment?.inhaledMedications?.LAMA,
          SABA: response.data.data.History?.Treatment?.inhaledMedications?.SABA,
          ICS: response.data.data.History?.Treatment?.inhaledMedications?.ICS,
          physiotherapy: response.data.data.History?.Treatment?.physiotherapy,
          rehabilitation: response.data.data.History?.Treatment?.rehabilitation,
          lasilix: response.data.data.History?.Treatment?.lasilix,
          bBlockers: response.data.data.History?.Treatment?.bBlockers,
          aldactone: response.data.data.History?.Treatment?.aldactone,
          lThyroxine: response.data.data.History?.Treatment?.lThyroxine,
          others: response.data.data.History?.Treatment?.others,
          OLD: response.data.data.History?.Treatment?.OLD,
          NIV: response.data.data.History?.Treatment?.NIV,
          // ICU/PD Acute presentation
          //Severity
          Diagnosis:
            response.data.data.IcuPdAcutePresentation?.Severity?.Diagnosis,
          SAPSIII: response.data.data.IcuPdAcutePresentation?.Severity?.SAPSIII,
          APACHEIII:
            response.data.data.IcuPdAcutePresentation?.Severity?.APACHEIII,
          MOF: response.data.data.IcuPdAcutePresentation?.Severity?.MOF,
          //Relevant Treatanle traits
          RHF: response.data.data.IcuPdAcutePresentation
            ?.RelevantTreabletableTraits?.RHF,
          BronchialHR:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.BronchialHR,
          Asthma:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Asthma,
          LHF: response.data.data.IcuPdAcutePresentation
            ?.RelevantTreabletableTraits?.LHF,
          Reflux:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Reflux,
          Emphysema1:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Emphysema,
          OSAS: response.data.data.IcuPdAcutePresentation
            ?.RelevantTreabletableTraits?.OSAS,
          Obesity:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Obesity,
          Hyperoesinophilia:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Hyperoesinophilia,
          KidneyFailure:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.KidneyFailure,
          Anemia:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Anemia,
          Arythmia:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.Arythmia,
          OtherTTE:
            response.data.data.IcuPdAcutePresentation
              ?.RelevantTreabletableTraits?.OtherTTE,
          //Reliable Biomarkers
          Eosinophilia:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.Eosinophilia,
          Hemoglobin:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.Hemoglobin,
          Creatinine:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.Creatinine,
          FT4: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.FT4,
          TSH: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.TSH,
          PAH: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.TTE?.PAH,
          RVdilatation:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
              ?.RVdilatation,
          LLHEF:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
              ?.LLHEF,
          LVDiastolicDysfunction:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
              ?.LVDiastolicDysfunction,
          HTCM: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.TTE?.HTCM,
          ICM: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.TTE?.ICM,
          MDR: response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
            ?.MDRBacteriaCarriage?.MDR,
          Pseudomonas:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.MDRBacteriaCarriage?.Pseudomonas,
          Acinetobacter:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.MDRBacteriaCarriage?.Acinetobacter,
          BroadSpectrumATBuse:
            response.data.data.IcuPdAcutePresentation?.ReliableBiomarkers
              ?.BroadSpectrumATBuse,
          //Ventilatory Support During The Acute Setting
          O2: response.data.data.IcuPdAcutePresentation
            ?.VentilatorySupportDuringTheAcuteSetting?.O2,
          NIV1: response.data.data.IcuPdAcutePresentation
            ?.VentilatorySupportDuringTheAcuteSetting?.NIV,
          CPAP: response.data.data.IcuPdAcutePresentation
            ?.VentilatorySupportDuringTheAcuteSetting?.CPAP,
          HFNC: response.data.data.IcuPdAcutePresentation
            ?.VentilatorySupportDuringTheAcuteSetting?.HFNC,
          IMV: response.data.data.IcuPdAcutePresentation
            ?.VentilatorySupportDuringTheAcuteSetting?.IMV,
          Tracheotomy:
            response.data.data.IcuPdAcutePresentation
              ?.VentilatorySupportDuringTheAcuteSetting?.Tracheotomy,
          //ICU/PD Discharge
          DateOfDischarge:
            response.data.data.icuPdDischarge?.Autonomy?.DateOfDischarge,
          HR: response.data.data.icuPdDischarge?.Autonomy?.HR,
          SixMWT: response.data.data.icuPdDischarge?.Autonomy?.SixMWT,
          mMRC1: response.data.data.icuPdDischarge?.Autonomy?.mMRC,
          WHO1: response.data.data.icuPdDischarge?.Autonomy?.WHO,
          AKI: response.data.data.icuPdDischarge?.Autonomy
            ?.PersistentComplications?.AKI,
          LHF1: response.data.data.icuPdDischarge?.Autonomy
            ?.PersistentComplications?.LHF,
          RHF1: response.data.data.icuPdDischarge?.Autonomy
            ?.PersistentComplications?.RHF,
          //Biomarkers
          PH1: response.data.data.icuPdDischarge?.Biomarkers?.PH,
          pCO21: response.data.data.icuPdDischarge?.Biomarkers?.pCO2,
          pO21: response.data.data.icuPdDischarge?.Biomarkers?.pO2,
          ChestCTscan:
            response.data.data.icuPdDischarge?.Biomarkers?.ChestCTscan,
          Distension1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Distension,
          Fibrosis1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Fibrosis,
          Restriction1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Restriction,
          Condensations1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Condensations,
          Interstitial1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Interstitial,
          Emphysema2:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Emphysema,
          Bronchiectasis1:
            response.data.data.icuPdDischarge?.Biomarkers?.chestImaging
              ?.Bronchiectasis,
          ChestCTscanFile:
            response.data.data.icuPdDischarge?.Biomarkers?.ChestCTscanFile,
          RespiratoryPolygraphyAtICU:
            response.data.data.icuPdDischarge?.Biomarkers
              ?.RespiratoryPolygraphyAtICU,
          RespiratoryPolygraphyDate1:
            response.data.data.icuPdDischarge?.Biomarkers
              ?.RespiratoryPolygraphyDate,
          AHI_H: response.data.data.icuPdDischarge?.Biomarkers?.AHI_H,
          DI_H: response.data.data.icuPdDischarge?.Biomarkers?.DI_H,
          meanSpO21: response.data.data.icuPdDischarge?.Biomarkers?.meanSpO2,
          RespiratoryPolygraphyFile1:
            response.data.data.icuPdDischarge?.Biomarkers
              ?.RespiratoryPolygraphyFile,
          ICU_PDStayReport:
            response.data.data.icuPdDischarge?.Biomarkers?.ICU_PDStayReport,
          AP3Scan: response.data.data.icuPdDischarge?.Biomarkers?.AP3Scan,
          // Management
          DateManagement:
            response.data.data.icuPdDischarge?.Management?.DateManagement,
          Smoke: response.data.data.icuPdDischarge?.Management?.Smoke,
          LABA1:
            response.data.data.icuPdDischarge?.Management?.inhaledMedications
              ?.LABA,
          LAMA1:
            response.data.data.icuPdDischarge?.Management?.inhaledMedications
              ?.LAMA,
          SABA1:
            response.data.data.icuPdDischarge?.Management?.inhaledMedications
              ?.SABA,
          ICS1: response.data.data.icuPdDischarge?.Management
            ?.inhaledMedications?.ICS,
          Physiotherapy:
            response.data.data.icuPdDischarge?.Management?.Physiotherapy,
          Rehabilitation:
            response.data.data.icuPdDischarge?.Management?.Rehabilitation,
          Lasilix: response.data.data.icuPdDischarge?.Management?.Lasilix,
          BBlockers: response.data.data.icuPdDischarge?.Management?.bBlockers,
          Aldactone: response.data.data.icuPdDischarge?.Management?.aldactone,
          LThyroxine: response.data.data.icuPdDischarge?.Management?.LThyroxine,
          Others: response.data.data.icuPdDischarge?.Management?.others,
          // Home NIV Initiation Report
          VentilatorySupportAtDischarge:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport
              ?.VentilatorySupportAtDischarge,
          IPAP: response.data.data.icuPdDischarge?.HomeNIVInitiationReport
            ?.IPAP,
          EPAP: response.data.data.icuPdDischarge?.HomeNIVInitiationReport
            ?.EPAP,
          OLD1: response.data.data.icuPdDischarge?.HomeNIVInitiationReport?.OLD,
          Leaks:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport?.Leaks,
          AHI1: response.data.data.icuPdDischarge?.HomeNIVInitiationReport?.AHI,
          PVA: response.data.data.icuPdDischarge?.HomeNIVInitiationReport?.PVA,
          NocturnalDuration:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport
              ?.NocturnalDuration,
          DiurnalDuration:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport
              ?.DiurnalDuration,
          provider1:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport
              ?.provider,
          otherProvider1:
            response.data.data.icuPdDischarge?.HomeNIVInitiationReport
              ?.otherProvider,
        });
        console.log("get consultation by id", formValues);
      } else {
        setPatient({});
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du patient:", error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files.length > 0
            ? files[0]
            : prev[name] // Conserver l'ancien fichier s'il n'y a pas de nouveau fichier sélectionné
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // patient démographics
    formData.append("name", formValues.name);
    if (formValues.birthDate) {
      formData.append("birthDate", formValues.birthDate);
    }
    formData.append("residency", formValues.residency);
    formData.append("occupation", formValues.occupation);
    // ID
    formData.append("icuPdFileNumber", formValues.icuPdFileNumber);
    formData.append("phoneNumber", formValues.phoneNumber);
    if (formValues.icuPdDischargeDate) {
      formData.append("icuPdDischargeDate", formValues.icuPdDischargeDate);
    }

    formData.append("attendingPhysician", formValues.attendingPhysician);
    // Insurance
    formData.append("cnamId", formValues.cnamId);
    if (formValues.healthcareInsuranceCardScanFile) {
      formData.append(
        "healthcareInsuranceCardScanFile",
        formValues.healthcareInsuranceCardScanFile
      );
    }

    formData.append("apciIrc11J45", formValues.apciIrc11J45);
    if (formValues.apciScanFile) {
      formData.append("apciScanFile", formValues.apciScanFile);
    }

    formData.append("provider", formValues.provider);
    formData.append("otherProvider", formValues.otherProvider);
    // Underlying Conditions
    formData.append("bmi", formValues.bmi);
    formData.append("chronicDiseases", formValues.chronicDiseases);
    formData.append("phenotype", formValues.phenotype);
    formData.append("gold", formValues.gold);
    formData.append(
      "moderateExacerbationsLastYear",
      formValues.moderateExacerbationsLastYear
    );
    formData.append(
      "severeExacerbationsLastYear",
      formValues.severeExacerbationsLastYear
    );
    formData.append("PH", formValues.PH);
    formData.append("PO2", formValues.PO2);
    formData.append("PCO2", formValues.PCO2);

    formData.append("BICAR", formValues.BICAR);
    formData.append("Diabetes", formValues.Diabetes);
    formData.append("Hypertension", formValues.Hypertension);
    formData.append(
      "ChronicleftHearFailure",
      formValues.ChronicleftHearFailure
    );
    formData.append("Hypothyroidism", formValues.Hypothyroidism);
    formData.append("Immunosuppression", formValues.Immunosuppression);
    formData.append("OtherComorbidities", formValues.OtherComorbidities);
    formData.append(
      "charlsonComorbidityIndex",
      formValues.charlsonComorbidityIndex
    );
    formData.append("Distension", formValues.Distension);
    formData.append("Fibrosis", formValues.Fibrosis);
    formData.append("Restriction", formValues.Restriction);
    formData.append("Condensations", formValues.Condensations);
    formData.append("Interstitial", formValues.Interstitial);
    formData.append("Emphysema", formValues.Emphysema);
    formData.append("Bronchiectasis", formValues.Bronchiectasis);
    if (formValues.chestImagingDate) {
      formData.append("chestImagingDate", formValues.chestImagingDate);
    }

    formData.append(
      "PulmonaryFunctionalTesting",
      formValues.PulmonaryFunctionalTesting
    );
    if (formValues.PulmonaryFunctionalTestingDate) {
      formData.append(
        "PulmonaryFunctionalTestingDate",
        formValues.PulmonaryFunctionalTestingDate
      );
    }
    formData.append("FEV1_FVC", formValues.FEV1_FVC);
    formData.append("FEV1", formValues.FEV1);
    if (formValues.PulmonaryFunctionalTestingFile) {
      formData.append(
        "PulmonaryFunctionalTestingFile",
        formValues.PulmonaryFunctionalTestingFile
      );
    }

    formData.append("RespiratoryPolygraphy", formValues.RespiratoryPolygraphy);
    if (formValues.RespiratoryPolygraphyDate) {
      formData.append(
        "RespiratoryPolygraphyDate",
        formValues.RespiratoryPolygraphyDate
      );
    }

    formData.append("AHI", formValues.AHI);
    formData.append("DI", formValues.DI);
    formData.append("meanSpO2", formValues.meanSpO2);
    if (formValues.RespiratoryPolygraphyFile) {
      formData.append(
        "RespiratoryPolygraphyFile",
        formValues.RespiratoryPolygraphyFile
      );
    }

    formData.append("mMRC", formValues.mMRC);
    formData.append("CAT", formValues.CAT);
    formData.append("WHO", formValues.WHO);
    formData.append("MacCabe", formValues.MacCabe);
    formData.append("epworthInterpretation", formValues.epworthInterpretation);
    formData.append("totalEpworthScore", formValues.totalEpworthScore);
    // Underlying Conditions
    formData.append("smoke", formValues.smoke);
    formData.append("smokeCessationDelay", formValues.smokeCessationDelay);
    formData.append("LABA", formValues.LABA);
    formData.append("LAMA", formValues.LAMA);
    formData.append("SABA", formValues.SABA);
    formData.append("ICS", formValues.ICS);
    formData.append("physiotherapy", formValues.physiotherapy);
    formData.append("rehabilitation", formValues.rehabilitation);
    formData.append("lasilix", formValues.lasilix);
    formData.append("bBlockers", formValues.bBlockers);
    formData.append("aldactone", formValues.aldactone);
    formData.append("lThyroxine", formValues.lThyroxine);
    formData.append("others", formValues.others);
    formData.append("OLD", formValues.OLD);
    formData.append("NIV", formValues.NIV);
    // ICU/PD Acute presentation
    //Severity
    formData.append("Diagnosis", formValues.Diagnosis);
    formData.append("SAPSIII", formValues.SAPSIII);
    formData.append("APACHEIII", formValues.APACHEIII);
    formData.append("MOF", formValues.MOF);
    //Relevant Treabletable Traits
    formData.append("RHF", formValues.RHF);
    formData.append("BronchialHR", formValues.BronchialHR);
    formData.append("Asthma", formValues.Asthma);
    formData.append("LHF", formValues.LHF);
    formData.append("Reflux", formValues.Reflux);
    formData.append("Emphysema1", formValues.Emphysema1);
    formData.append("OSAS", formValues.OSAS);
    formData.append("Obesity", formValues.Obesity);
    formData.append("Hyperoesinophilia", formValues.Hyperoesinophilia);
    formData.append("KidneyFailure", formValues.KidneyFailure);
    formData.append("Anemia", formValues.Anemia);
    formData.append("Arythmia", formValues.Arythmia);
    formData.append("OtherTTE", formValues.OtherTTE);
    //Reliable Biomarkers
    formData.append("Eosinophilia", formValues.Eosinophilia);
    formData.append("Hemoglobin", formValues.Hemoglobin);
    formData.append("Creatinine", formValues.Creatinine);
    formData.append("FT4", formValues.FT4);
    formData.append("TSH", formValues.TSH);
    formData.append("PAH", formValues.PAH);
    formData.append("RVdilatation", formValues.RVdilatation);
    formData.append("LLHEF", formValues.LLHEF);
    formData.append(
      "LVDiastolicDysfunction",
      formValues.LVDiastolicDysfunction
    );
    formData.append("HTCM", formValues.HTCM);
    formData.append("ICM", formValues.ICM);
    formData.append("MDR", formValues.MDR);
    formData.append("Pseudomonas", formValues.Pseudomonas);
    formData.append("Acinetobacter", formValues.Acinetobacter);
    formData.append("BroadSpectrumATBuse", formValues.BroadSpectrumATBuse);
    //Ventilatory Support During The Acute Setting
    formData.append("O2", formValues.O2);
    formData.append("NIV1", formValues.NIV1);
    formData.append("CPAP", formValues.CPAP);
    formData.append("HFNC", formValues.HFNC);
    formData.append("IMV", formValues.IMV);
    formData.append("Tracheotomy", formValues.Tracheotomy);
    //ICU/PD Discharge
    if (formValues.DateOfDischarge) {
      formData.append("DateOfDischarge", formValues.DateOfDischarge);
    }

    formData.append("HR", formValues.HR);
    formData.append("SixMWT", formValues.SixMWT);
    formData.append("mMRC1", formValues.mMRC1);
    formData.append("WHO1", formValues.WHO1);
    formData.append("AKI", formValues.AKI);
    formData.append("LHF1", formValues.LHF1);
    formData.append("RHF1", formValues.RHF1);
    //Biomarkers
    formData.append("PH1", formValues.PH1);
    formData.append("pCO21", formValues.pCO21);
    formData.append("pO21", formValues.pO21);
    formData.append("ChestCTscan", formValues.ChestCTscan);
    formData.append("Distension1", formValues.Distension1);
    formData.append("Fibrosis1", formValues.Fibrosis1);
    formData.append("Restriction1", formValues.Restriction1);
    formData.append("Condensations1", formValues.Condensations1);
    formData.append("Interstitial1", formValues.Interstitial1);
    formData.append("Emphysema2", formValues.Emphysema2);
    formData.append("Bronchiectasis1", formValues.Bronchiectasis1);
    if (formValues.ChestCTscanFile) {
      formData.append("ChestCTscanFile", formValues.ChestCTscanFile);
    }

    formData.append(
      "RespiratoryPolygraphyAtICU",
      formValues.RespiratoryPolygraphyAtICU
    );
    if (formValues.RespiratoryPolygraphyDate1) {
      formData.append(
        "RespiratoryPolygraphyDate1",
        formValues.RespiratoryPolygraphyDate1
      );
    }

    formData.append("AHI_H", formValues.AHI_H);
    formData.append("DI_H", formValues.DI_H);
    formData.append("meanSpO21", formValues.meanSpO21);
    if (formValues.RespiratoryPolygraphyFile1) {
      formData.append(
        "RespiratoryPolygraphyFile1",
        formValues.RespiratoryPolygraphyFile1
      );
    }
    if (formValues.ICU_PDStayReport) {
      formData.append("ICU_PDStayReport", formValues.ICU_PDStayReport);
    }
    if (formValues.AP3Scan) {
      formData.append("AP3Scan", formValues.AP3Scan);
    }

    // Management
    if (formValues.DateManagement) {
      formData.append("DateManagement", formValues.DateManagement);
    }

    formData.append("Smoke", formValues.Smoke);
    formData.append("LABA1", formValues.LABA1);
    formData.append("LAMA1", formValues.LAMA1);
    formData.append("SABA1", formValues.SABA1);
    formData.append("ICS1", formValues.ICS1);
    formData.append("Physiotherapy", formValues.Physiotherapy);
    formData.append("Rehabilitation", formValues.Rehabilitation);
    formData.append("Lasilix", formValues.Lasilix);
    formData.append("BBlockers", formValues.BBlockers);
    formData.append("Aldactone", formValues.Aldactone);
    formData.append("LThyroxine", formValues.LThyroxine);
    formData.append("Others", formValues.Others);
    // Home NIV Initiation Report
    formData.append(
      "VentilatorySupportAtDischarge",
      formValues.VentilatorySupportAtDischarge
    );
    formData.append("IPAP", formValues.IPAP);
    formData.append("EPAP", formValues.EPAP);
    formData.append("OLD1", formValues.OLD1);
    formData.append("Leaks", formValues.Leaks);
    formData.append("AHI1", formValues.AHI1);
    formData.append("PVA", formValues.PVA);
    formData.append("NocturnalDuration", formValues.NocturnalDuration);
    formData.append("DiurnalDuration", formValues.DiurnalDuration);
    formData.append("provider1", formValues.provider1);
    formData.append("otherProvider1", formValues.otherProvider1);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/patient/patient/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "Patient updated successfully",
        });
        //navigate(`/patientslist`);
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to update patient",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred while updating the patient.",
      });
    }
  };

  return (
    <Lyout>
      <>
        {contextHolder}
        <form
          className="mx-auto scroll"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <PatientDemographics
            isOpen={isOpen}
            toggleAccordion={toggleAccordion}
            formValues={formValues}
            handleChange={handleChange}
            patient={patient}
          />
          <ID
            isOpen={isOpen1}
            toggleAccordion={toggleAccordion1}
            formValues={formValues}
            patient={patient}
            handleChange={handleChange}
          />
          {/*Section 3*/}
          <Insurance
            isOpen={isOpen2}
            toggleAccordion={toggleAccordion2}
            formValues={formValues}
            patient={patient}
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
            patient={patient}
            toggleAccordion={toggleAccordion4}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 6*/}
          <Treatment
            isOpen={isOpen5}
            patient={patient}
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
            patient={patient}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 8*/}
          <RelevantTreatableTraits
            isOpen={isOpen7}
            toggleAccordion={toggleAccordion7}
            formValues={formValues}
            patient={patient}
            handleChange={handleChange}
          />
          {/*Section 9*/}
          <ReliableBiomarkers
            isOpen={isOpen8}
            toggleAccordion={toggleAccordion8}
            formValues={formValues}
            handleChange={handleChange}
            patient={patient}
          />
          {/*Section 8*/}
          <VentilatorySupportDuringTheAcuteSetting
            isOpen={isOpen12}
            toggleAccordion={toggleAccordion12}
            formValues={formValues}
            handleChange={handleChange}
            patient={patient}
          />
          <h1 className="text-[15px] leading-4 lg:text-[30px]  lg:leading-8 font-bold text-headingColor">
            ICU/PD Discharge :
          </h1>
          {/*section 10*/}
          <Autonomy
            isOpen={isOpen9}
            toggleAccordion={toggleAccordion9}
            formValues={formValues}
            patient={patient}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 11*/}
          <Biomarkers
            isOpen={isOpen10}
            patient={patient}
            toggleAccordion={toggleAccordion10}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 12*/}
          <Management
            isOpen={isOpen11}
            patient={patient}
            toggleAccordion={toggleAccordion11}
            formValues={formValues}
            handleChange={handleChange}
          />
          <HomeNIVInitiationReport
            isOpen={isOpen13}
            patient={patient}
            toggleAccordion={toggleAccordion13}
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

export default EditPatient;
