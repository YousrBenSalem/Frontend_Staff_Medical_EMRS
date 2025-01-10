import { useParams } from "react-router-dom";
import { PDFDocument, StandardFonts } from "pdf-lib";

import Lyout from "../components/lyout/Lyout";
import { useState } from "react";
import { message } from "antd";
import PatientFollowUpFindings from "../components/ConsultationComponents/PatientFollowUpFindings";
import BasicMonitoringClinical from "../components/ConsultationComponents/BasicMonitoringClinical";
/* import QualityOfLife from "../components/ConsultationComponents/QualityOfLife"; */
import Tolerance from "../components/ConsultationComponents/Tolerance";
import Biomarkers from "../components/ConsultationComponents/Biomarkers";
import VentilatorySupport from "../components/ConsultationComponents/VentilatorySupport";
import AdvancedMonitoring from "../components/ConsultationComponents/AdvancedMonitoring";
import MedicationsAdherence from "../components/ConsultationComponents/MedicationsAdherence";
import ManagementAdjustment from "../components/ConsultationComponents/ManagementAdjustment";
import Ventilatory from "../components/ConsultationComponents/Ventilatory";
import Pharmacological from "../components/ConsultationComponents/Pharmacological";
import Physiologic from "../components/ConsultationComponents/Physiologic";
import SumUp from "../components/ConsultationComponents/SumUp";
import NextAppointment from "../components/ConsultationComponents/NextAppointment";
import axios from "axios";
import { useEffect } from "react";
function UpdateConsultation() {
  //  const navigate = useNavigate();
  const { consultationId } = useParams();
  console.log(consultationId);
  const [messageApi, contextHolder] = message.useMessage();
  const [managementAdjustments, setManagementAdjustments] = useState([]);
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
  /*   const [isOpen11, setIsOpen11] = useState(false); */
  const [isOpen12, setIsOpen12] = useState(false);
  const [isOpen13, setIsOpen13] = useState(false);
  const [consultation, setConsultation] = useState({});
  const [patientName, setPatientName] = useState();

  const [formValues, setFormValues] = useState({
    // Patient Follow-Up Findings
    doctorName: "",
    showUpDate: null,
    type: "",
    showUp: "",
    IfNoShow: "",
    numberOfModerateExacerbationsSinceDischarge: 0,
    numberOfSevereExacerbationsSinceDischarge: 0,
    HospitalReadmissionSinceDischarge: 0,
    DateOfHospitalReadmissionSinceDischarge: null,
    Death: "",
    dateOfDeath: null,
    CauseOfDeath: "",
    // Basic Monitoring Clinical
    Encephalopathy: "",
    Nycturia: "",
    Lowerlimbsedema: "",
    mMRC: "",
    epworthInterpretation: "",
    totalEpworthScore: 0,
    // Quality of Life
    // Tolerance
    UnintentionalLeaks: false,
    ConjunctivalIrritation: false,
    Pain: false,
    SkinLesions: false,
    NasalObstruction: false,
    MucosalDryness: false,
    Rhinorrhea: false,
    InappropriateAlarmSettings: false,
    AbdominalDistention: false,
    DisruptedSleep: false,
    Claustrophobia: false,
    AnxietyRelatedToInterface: false,
    // Biomarkers
    PH: 0,
    pCO2: 0,
    PO2: 0,
    Hco3: 0,
    SaO2: 0,
    PFT: "",
    FEV1: 0,
    FVC: 0,
    FEV1_FVCRatio: 0,
    TLC: 0,
    DLCO: 0,
    Conclusion: "",
    Severity: "",
    GOLD: "",
    SixMWT: 0,
    // Medications Adherence
    SmokeCessation: "",
    Rehabilitation: "",
    Physiotherapy: "",
    Diuretics: "",
    ReasonsOfNonAdherence: "",
    GOLD1: "",
    LABA: false,
    LAMA: false,
    SABA: false,
    ICS: false,
    SARSCoV2: false,
    Spneumoniae: false,
    Influenza: false,
    // Ventilatory Support
    Mode: "",
    IPAP: 0,
    EPAP: 0,
    maximalPS: 0,
    MinimalPS: 0,
    TImax: 0,
    TImin: 0,
    FixedTI: 0,
    InspiratoryRiseTime: 0,
    RespiratoryBackupTime: 0,
    SensitivityOfInspiratoryCycling: 0,
    SensitivityOfExpiratoryCycling: 0,
    RespiratoryFrequency: 0,
    FallTime: 0,
    TargetedVt: 0,
    DailyUse: 0,
    Leaks: 0,
    AHI: 0,
    Regularity: "",
    Interruptions: "",
    // Advanced Monitoring
    PVAs: "",
    PVAsTypes: "",
    OSAS: 0,
    CSAS: 0,
    CS: 0,
    HV: 0,
    RespiratoryPolygraphy: "",
    AH_IH: 0,
    ODI_H: 0,
    meanSpO2: 0,
    SpO2: 0,
    OHS: 0,
    RespiratoryPolygraphyFile: null,
    // Sum Up
    sum_Up: "",
    // Management Adjustment

    Class1: "",
    INN_DCI1: 0,
    BrandName1: "",
    CIDdosages1: 0,
    Repetition1: 0,
    Duration1: "",
    Doctor: "",
    Date: null,
    StampPdfToPatient: null,
    // Physiologic
    QuittingSmokingProgram: "",
    InterventionSmoking: "",
    RehabilitationProgram: "",
    InterventionRehabilitation: "",
    Physiotherapy1: "",
    InterventionPhysiotherapy: "",
    // Pharmacological
    PrescriptionAdjustment: "",
    laba: false,
    lama: false,
    saba: false,
    ics: false,
    influenza: false,
    SARSCoV21: false,
    pneumococcus: false,
    // Ventilatory
    NIVwithdrawal: "",
    NIVSuspensionTest: "",
    PSSwitch: "",
    IPAPModification: 0,
    EPAPModification: 0,
    otherModifications: "",
    InterfaceChange: "",
    // Next Appointment
    TTE: false,
    PulmonaryFunctionalTesting: false,
    CNAMRenewalRequest: false,
    ABG: false,
    Polygraphy: false,
    Downlowds: false,
    others: "",
    patientId: "",
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
  /*   const toggleAccordion11 = () => {
    setIsOpen11(!isOpen11);
  }; */
  const toggleAccordion12 = () => {
    setIsOpen12(!isOpen12);
  };
  const toggleAccordion13 = () => {
    setIsOpen13(!isOpen13);
  };
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
            : prev[name]
          : value,
    }));
  };
  const handleAdditionalInputChange = (id, field, value) => {
    setManagementAdjustments((prevValues) => {
      const updatedValues = [...prevValues];
      const index = updatedValues.findIndex((item) => item.id === id);

      if (index > -1) {
        updatedValues[index] = { ...updatedValues[index], [field]: value };
      } else {
        updatedValues.push({ id, [field]: value });
      }

      return updatedValues;
    });
  };
  const fetchConsultation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/Consultations/${consultationId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data && response.data.data) {
        setConsultation(response.data.data);
        setFormValues({
          // PatientFollowUpFindings
          doctorName: response.data.data.PatientFollowUpFindings?.doctorName,
          showUpDate: response.data.data.PatientFollowUpFindings?.showUpDate,
          showUp: response.data.data.PatientFollowUpFindings?.showUp,
          IfNoShow: response.data.data.PatientFollowUpFindings?.IfNoShow,
          type: response.data.data.PatientFollowUpFindings?.Type,
          numberOfModerateExacerbationsSinceDischarge:
            response.data.data.PatientFollowUpFindings
              ?.numberOfModerateExacerbationsSinceDischarge,
          numberOfSevereExacerbationsSinceDischarge:
            response.data.data.PatientFollowUpFindings
              ?.numberOfSevereExacerbationsSinceDischarge,
          HospitalReadmissionSinceDischarge:
            response.data.data.PatientFollowUpFindings
              ?.HospitalReadmissionSinceDischarge,
          DateOfHospitalReadmissionSinceDischarge:
            response.data.data.PatientFollowUpFindings
              ?.DateOfHospitalReadmissionSinceDischarge,
          Death: response.data.data.PatientFollowUpFindings?.Death,
          dateOfDeath: response.data.data.PatientFollowUpFindings?.dateOfDeath,
          CauseOfDeath:
            response.data.data.PatientFollowUpFindings?.CauseOfDeath,
          // Basic Monitoring Clinical
          Encephalopathy:
            response.data.data.BasicMonitoringClinical?.Encephalopathy,
          Nycturia: response.data.data.BasicMonitoringClinical?.Nycturia,
          Lowerlimbsedema:
            response.data.data.BasicMonitoringClinical?.Lowerlimbsedema,
          mMRC: response.data.data.BasicMonitoringClinical?.mMRC,
          epworthInterpretation:
            response.data.data.BasicMonitoringClinical?.EpworthScore
              ?.epworthInterpretation,
          totalEpworthScore:
            response.data.data.BasicMonitoringClinical?.EpworthScore
              ?.totalEpworthScore,
          // Tolerance
          UnintentionalLeaks:
            response.data.data.Tolerance?.NIVSideEffects?.UnintentionalLeaks,
          ConjunctivalIrritation:
            response.data.data.Tolerance?.NIVSideEffects
              ?.ConjunctivalIrritation,
          Pain: response.data.data.Tolerance?.NIVSideEffects?.Pain,
          SkinLesions:
            response.data.data.Tolerance?.NIVSideEffects?.SkinLesions,
          NasalObstruction:
            response.data.data.Tolerance?.NIVSideEffects?.NasalObstruction,
          MucosalDryness:
            response.data.data.Tolerance?.NIVSideEffects?.MucosalDryness,
          Rhinorrhea: response.data.data.Tolerance?.NIVSideEffects?.Rhinorrhea,
          InappropriateAlarmSettings:
            response.data.data.Tolerance?.NIVSideEffects
              ?.InappropriateAlarmSettings,
          AbdominalDistention:
            response.data.data.Tolerance?.NIVSideEffects?.AbdominalDistention,
          DisruptedSleep:
            response.data.data.Tolerance?.NIVSideEffects?.DisruptedSleep,
          Claustrophobia:
            response.data.data.Tolerance?.NIVSideEffects?.Claustrophobia,
          AnxietyRelatedToInterface:
            response.data.data.Tolerance?.NIVSideEffects
              ?.AnxietyRelatedToInterface,
          // Biomarkers
          PH: response.data.data.Biomarkers?.PH,
          pCO2: response.data.data.Biomarkers?.pCO2,
          PO2: response.data.data.Biomarkers?.PO2,
          Hco3: response.data.data.Biomarkers?.Hco3,
          SaO2: response.data.data.Biomarkers?.SaO2,
          PFT: response.data.data.Biomarkers?.PFT,
          FEV1: response.data.data.Biomarkers?.FEV1,
          FVC: response.data.data.Biomarkers?.FVC,
          FEV1_FVCRatio: response.data.data.Biomarkers?.FEV1_FVCRatio,
          TLC: response.data.data.Biomarkers?.TLC,
          DLCO: response.data.data.Biomarkers?.DLCO,
          Conclusion: response.data.data.Biomarkers?.Conclusion,
          Severity: response.data.data.Biomarkers?.Severity,
          GOLD: response.data.data.Biomarkers?.GOLD,
          SixMWT: response.data.data.Biomarkers?.SixMWT,
          // Medications Adherence
          SmokeCessation:
            response.data.data.MedicationsAdherence?.SmokeCessation,
          Rehabilitation:
            response.data.data.MedicationsAdherence?.Rehabilitation,
          Physiotherapy: response.data.data.MedicationsAdherence?.Physiotherapy,
          Diuretics: response.data.data.MedicationsAdherence?.Diuretics,
          ReasonsOfNonAdherence:
            response.data.data.MedicationsAdherence?.ReasonsOfNonAdherence,
          GOLD1: response.data.data.MedicationsAdherence?.GOLD,
          LABA: response.data.data.MedicationsAdherence?.MedicationsAdherence
            ?.LABA,
          LAMA: response.data.data.MedicationsAdherence?.MedicationsAdherence
            ?.LAMA,
          SABA: response.data.data.MedicationsAdherence?.MedicationsAdherence
            ?.SABA,
          ICS: response.data.data.MedicationsAdherence?.MedicationsAdherence
            ?.ICS,
          SARSCoV2:
            response.data.data.MedicationsAdherence?.Vaccinations?.SARSCoV2,
          Spneumoniae:
            response.data.data.MedicationsAdherence?.Vaccinations?.Spneumoniae,
          Influenza:
            response.data.data.MedicationsAdherence?.Vaccinations?.Influenza,
          // Ventilatory Support
          Mode: response.data.data.VentilatorySupport?.Mode,
          IPAP: response.data.data.VentilatorySupport?.IPAP,
          EPAP: response.data.data.VentilatorySupport?.EPAP,
          maximalPS: response.data.data.VentilatorySupport?.maximalPS,
          MinimalPS: response.data.data.VentilatorySupport?.MinimalPS,
          TImax: response.data.data.VentilatorySupport?.TImax,
          TImin: response.data.data.VentilatorySupport?.TImin,
          FixedTI: response.data.data.VentilatorySupport?.FixedTI,
          InspiratoryRiseTime:
            response.data.data.VentilatorySupport?.InspiratoryRiseTime,
          RespiratoryBackupTime:
            response.data.data.VentilatorySupport?.RespiratoryBackupTime,
          SensitivityOfInspiratoryCycling:
            response.data.data.VentilatorySupport
              ?.SensitivityOfInspiratoryCycling,
          SensitivityOfExpiratoryCycling:
            response.data.data.VentilatorySupport
              ?.SensitivityOfExpiratoryCycling,
          RespiratoryFrequency:
            response.data.data.VentilatorySupport?.RespiratoryFrequency,
          FallTime: response.data.data.VentilatorySupport?.FallTime,
          TargetedVt: response.data.data.VentilatorySupport?.TargetedVt,
          DailyUse: response.data.data.VentilatorySupport?.DailyUse,
          Leaks: response.data.data.VentilatorySupport?.Leaks,
          AHI: response.data.data.VentilatorySupport?.AHI,
          Regularity: response.data.data.VentilatorySupport?.Regularity,
          Interruptions: response.data.data.VentilatorySupport?.Interruptions,
          // Advanced Monitoring
          PVAs: response.data.data.AdvancedMonitoring?.PVAs,
          PVAsTypes: response.data.data.AdvancedMonitoring?.PVAsTypes,
          OSAS: response.data.data.AdvancedMonitoring?.OSAS,
          CSAS: response.data.data.AdvancedMonitoring?.CSAS,
          CS: response.data.data.AdvancedMonitoring?.CS,
          HV: response.data.data.AdvancedMonitoring?.HV,
          RespiratoryPolygraphy:
            response.data.data.AdvancedMonitoring?.RespiratoryPolygraphy,
          AH_IH: response.data.data.AdvancedMonitoring?.AH_IH,
          ODI_H: response.data.data.AdvancedMonitoring?.ODI_H,
          meanSpO2: response.data.data.AdvancedMonitoring?.meanSpO2,
          SpO2: response.data.data.AdvancedMonitoring?.SpO2,
          OHS: response.data.data.AdvancedMonitoring?.OHS,
          RespiratoryPolygraphyFile:
            response.data.data.AdvancedMonitoring?.RespiratoryPolygraphyFile,
          // Sum Up
          sum_Up: response.data.data.sum_Up,
          // Management Adjustment

          Class1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.Class,
          INN_DCI1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.INN_DCI,
          BrandName1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.BrandName,
          CIDdosages1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.CIDdosages,
          Repetition1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.Repetition,
          Duration1:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.Duration,
          Doctor:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.Doctor,
          Date: response.data.data.ManagementAdjustment?.ManagementAdjustment
            ?.Date,
          StampPdfToPatient:
            response.data.data.ManagementAdjustment?.ManagementAdjustment
              ?.StampPdfToPatient,
          // Physiologic
          QuittingSmokingProgram:
            response.data.data.Physiologic?.QuittingSmokingProgram,
          InterventionSmoking:
            response.data.data.Physiologic?.InterventionSmoking,
          RehabilitationProgram:
            response.data.data.Physiologic?.RehabilitationProgram,
          InterventionRehabilitation:
            response.data.data.Physiologic?.InterventionRehabilitation,
          Physiotherapy1: response.data.data.Physiologic?.Physiotherapy,
          InterventionPhysiotherapy:
            response.data.data.Physiologic?.InterventionPhysiotherapy,
          // Pharmacological
          PrescriptionAdjustment:
            response.data.data.Pharmacological?.PrescriptionAdjustment,
          laba: response.data.data.Pharmacological?.DeNovoPrescription?.LABA,
          lama: response.data.data.Pharmacological?.DeNovoPrescription?.LAMA,
          saba: response.data.data.Pharmacological?.DeNovoPrescription?.SABA,
          ics: response.data.data.Pharmacological?.DeNovoPrescription?.ICS,
          influenza:
            response.data.data.Pharmacological?.VaccinationPrescription
              ?.influenza,
          SARSCoV21:
            response.data.data.Pharmacological?.VaccinationPrescription
              ?.SARSCoV2,
          pneumococcus:
            response.data.data.Pharmacological?.VaccinationPrescription
              ?.pneumococcus,
          // Ventilatory
          NIVwithdrawal: response.data.data.Ventilatory?.NIVwithdrawal,
          NIVSuspensionTest: response.data.data.Ventilatory?.NIVSuspensionTest,
          PSSwitch: response.data.data.Ventilatory?.PSSwitch,
          IPAPModification: response.data.data.Ventilatory?.IPAPModification,
          EPAPModification: response.data.data.Ventilatory?.EPAPModification,
          otherModifications:
            response.data.data.Ventilatory?.otherModifications,
          InterfaceChange: response.data.data.Ventilatory?.InterfaceChange,
          // Next Appointment
          TTE: response.data.data.NextAppointment?.Needs?.TTE,
          PulmonaryFunctionalTesting:
            response.data.data.NextAppointment?.Needs
              ?.PulmonaryFunctionalTesting,
          CNAMRenewalRequest:
            response.data.data.NextAppointment?.Needs?.CNAMRenewalRequest,
          ABG: response.data.data.NextAppointment?.Biomarkers?.ABG,
          Polygraphy:
            response.data.data.NextAppointment?.Biomarkers?.Polygraphy,
          Downlowds: response.data.data.NextAppointment?.Biomarkers?.Downloads,
          others: response.data.data.NextAppointment?.others,
          patientId: response.data.data.patientId,
        });
        console.log("get consultation by id", formValues);
      } else {
        setConsultation({});
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du consultation:", error);
    }
  };
  useEffect(() => {
    fetchConsultation();
  }, [consultationId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // Patient Follow-Up Findings
    formData.append("doctorName", formValues.doctorName);
    if (formValues.showUpDate) {
      formData.append("showUpDate", formValues.showUpDate);
    }
    formData.append("type", formValues.type);
    formData.append("showUp", formValues.showUp);
    formData.append("IfNoShow", formValues.IfNoShow);
    formData.append(
      "numberOfModerateExacerbationsSinceDischarge",
      formValues.numberOfModerateExacerbationsSinceDischarge
    );
    formData.append(
      "numberOfSevereExacerbationsSinceDischarge",
      formValues.numberOfSevereExacerbationsSinceDischarge
    );
    formData.append(
      "HospitalReadmissionSinceDischarge",
      formValues.HospitalReadmissionSinceDischarge
    );
    if (formValues.DateOfHospitalReadmissionSinceDischarge) {
      formData.append(
        "DateOfHospitalReadmissionSinceDischarge",
        formValues.DateOfHospitalReadmissionSinceDischarge
      );
    }
    formData.append("Death", formValues.Death);
    if (formValues.dateOfDeath) {
      formData.append("dateOfDeath", formValues.dateOfDeath);
    }

    formData.append("CauseOfDeath", formValues.CauseOfDeath);
    // Basic Monitoring Clinical
    formData.append("Encephalopathy", formValues.Encephalopathy);
    formData.append("Nycturia", formValues.Nycturia);
    formData.append("Lowerlimbsedema", formValues.Lowerlimbsedema);
    formData.append("mMRC", formValues.mMRC);
    formData.append("epworthInterpretation", formValues.epworthInterpretation);
    formData.append("totalEpworthScore", formValues.totalEpworthScore);

    // Tolerance
    formData.append("UnintentionalLeaks", formValues.UnintentionalLeaks);
    formData.append(
      "ConjunctivalIrritation",
      formValues.ConjunctivalIrritation
    );
    formData.append("Pain", formValues.Pain);
    formData.append("SkinLesions", formValues.SkinLesions);
    formData.append("NasalObstruction", formValues.NasalObstruction);
    formData.append("MucosalDryness", formValues.MucosalDryness);
    formData.append("Rhinorrhea", formValues.Rhinorrhea);
    formData.append(
      "InappropriateAlarmSettings",
      formValues.InappropriateAlarmSettings
    );
    formData.append("AbdominalDistention", formValues.AbdominalDistention);
    formData.append("DisruptedSleep", formValues.DisruptedSleep);
    formData.append("Claustrophobia", formValues.Claustrophobia);
    formData.append(
      "AnxietyRelatedToInterface",
      formValues.AnxietyRelatedToInterface
    );
    // Biomarkers
    formData.append("PH", formValues.PH);
    formData.append("pCO2", formValues.pCO2);
    formData.append("PO2", formValues.PO2);
    formData.append("Hco3", formValues.Hco3);
    formData.append("SaO2", formValues.SaO2);
    formData.append("PFT", formValues.PFT);
    formData.append("FEV1", formValues.FEV1);
    formData.append("FVC", formValues.FVC);
    formData.append("FEV1_FVCRatio", formValues.FEV1_FVCRatio);
    formData.append("TLC", formValues.TLC);
    formData.append("DLCO", formValues.DLCO);
    formData.append("Conclusion", formValues.Conclusion);
    formData.append("Severity", formValues.Severity);
    formData.append("GOLD", formValues.GOLD);
    formData.append("SixMWT", formValues.SixMWT);
    // Medications Adherence
    formData.append("SmokeCessation", formValues.SmokeCessation);
    formData.append("Rehabilitation", formValues.Rehabilitation);
    formData.append("Physiotherapy", formValues.Physiotherapy);
    formData.append("Diuretics", formValues.Diuretics);
    formData.append("ReasonsOfNonAdherence", formValues.ReasonsOfNonAdherence);
    formData.append("GOLD1", formValues.GOLD1);
    formData.append("LABA", formValues.LABA);
    formData.append("LAMA", formValues.LAMA);
    formData.append("SABA", formValues.SABA);
    formData.append("ICS", formValues.ICS);
    formData.append("SARSCoV2", formValues.SARSCoV2);
    formData.append("Spneumoniae", formValues.Spneumoniae);
    formData.append("Influenza", formValues.Influenza);
    // Ventilatory Supp
    formData.append("Mode", formValues.Mode);
    formData.append("IPAP", formValues.IPAP);
    formData.append("EPAP", formValues.EPAP);
    formData.append("maximalPS", formValues.maximalPS);
    formData.append("MinimalPS", formValues.MinimalPS);
    formData.append("TImax", formValues.TImax);
    formData.append("TImin", formValues.TImin);
    formData.append("FixedTI", formValues.FixedTI);
    formData.append("InspiratoryRiseTime", formValues.InspiratoryRiseTime);
    formData.append("RespiratoryBackupTime", formValues.RespiratoryBackupTime);
    formData.append(
      "SensitivityOfInspiratoryCycling",
      formValues.SensitivityOfInspiratoryCycling
    );

    formData.append(
      "SensitivityOfExpiratoryCycling",
      formValues.SensitivityOfExpiratoryCycling
    );
    formData.append("RespiratoryFrequency", formValues.RespiratoryFrequency);
    formData.append("FallTime", formValues.FallTime);
    formData.append("TargetedVt", formValues.TargetedVt);
    formData.append("DailyUse", formValues.DailyUse);
    formData.append("Leaks", formValues.Leaks);
    formData.append("AHI", formValues.AHI);
    formData.append("Regularity", formValues.Regularity);
    formData.append("Interruptions", formValues.Interruptions);
    // Advanced Monitoring
    formData.append("PVAs", formValues.PVAs);
    formData.append("PVAsTypes", formValues.PVAsTypes);
    formData.append("OSAS", formValues.OSAS);
    formData.append("CSAS", formValues.CSAS);
    formData.append("CS", formValues.CS);
    formData.append("HV", formValues.HV);
    formData.append("RespiratoryPolygraphy", formValues.RespiratoryPolygraphy);
    formData.append("AH_IH", formValues.AH_IH);
    formData.append("ODI_H", formValues.ODI_H);
    formData.append("meanSpO2", formValues.meanSpO2);
    formData.append("SpO2", formValues.SpO2);
    formData.append("OHS", formValues.OHS);
    if (formValues.RespiratoryPolygraphyFile) {
      formData.append(
        "RespiratoryPolygraphyFile",
        formValues.RespiratoryPolygraphyFile
      );
    }

    // Sum Up
    formData.append("sum_Up", formValues.sum_Up);
    // Management Adjustment
    formData.append("Class1", formValues.Class1);
    formData.append("INN_DCI1", formValues.INN_DCI1);
    formData.append("BrandName1", formValues.BrandName1);
    formData.append("CIDdosages1", formValues.CIDdosages1);
    formData.append("Repetition1", formValues.Repetition1);
    formData.append("Duration1", formValues.Duration1);
    formData.append("Doctor", formValues.Doctor);
    if (formValues.Date) {
      formData.append("Date", formValues.Date);
    }
    if (formValues.StampPdfToPatient) {
      formData.append("StampPdfToPatient", formValues.StampPdfToPatient);
    }
    // Physiologic
    formData.append(
      "QuittingSmokingProgram",
      formValues.QuittingSmokingProgram
    );
    formData.append("InterventionSmoking", formValues.InterventionSmoking);
    formData.append("RehabilitationProgram", formValues.RehabilitationProgram);
    formData.append(
      "InterventionRehabilitation",
      formValues.InterventionRehabilitation
    );
    formData.append("Physiotherapy1", formValues.Physiotherapy1);
    formData.append(
      "InterventionPhysiotherapy",
      formValues.InterventionPhysiotherapy
    );
    // Pharmacological
    formData.append(
      "PrescriptionAdjustment",
      formValues.PrescriptionAdjustment
    );
    formData.append("laba", formValues.laba);
    formData.append("lama", formValues.lama);
    formData.append("saba", formValues.saba);
    formData.append("ics", formValues.ics);
    formData.append("influenza", formValues.influenza);
    formData.append("SARSCoV21", formValues.SARSCoV21);
    formData.append("pneumococcus", formValues.pneumococcus);
    // Ventilatory
    formData.append("NIVwithdrawal", formValues.NIVwithdrawal);
    formData.append("NIVSuspensionTest", formValues.NIVSuspensionTest);
    formData.append("PSSwitch", formValues.PSSwitch);
    formData.append("IPAPModification", formValues.IPAPModification);
    formData.append("EPAPModification", formValues.EPAPModification);
    formData.append("otherModifications", formValues.otherModifications);
    formData.append("InterfaceChange", formValues.InterfaceChange);
    // Next Appointment
    formData.append("TTE", formValues.TTE);
    formData.append(
      "PulmonaryFunctionalTesting",
      formValues.PulmonaryFunctionalTesting
    );
    formData.append("CNAMRenewalRequest", formValues.CNAMRenewalRequest);
    formData.append("ABG", formValues.ABG);
    formData.append("Polygraphy", formValues.Polygraphy);
    formData.append("Downlowds", formValues.Downlowds);
    formData.append("others", formValues.others);
    formData.append(
      "ManagementAdjustmentAdded",
      JSON.stringify(managementAdjustments)
    );

    console.log(managementAdjustments);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/Consultations/UpdateConsultation/${consultationId}`,
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
          content: "consultation updated successfully",
        });
        //  navigate("/calenderAddAppointement/:patientId");
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to update consultation",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      messageApi.open({
        type: "error",
        content: "An error occurred while updating the consultation.",
      });
    }
  };
  const patientId = formValues.patientId;
  console.log(patientId);
  const fetchPatientName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/patient/patientName/${patientId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setPatientName(response.data.data);
        console.log(patientName);
      } else {
        setPatientName();
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du patient:", error);
    }
  };
  useEffect(() => {
    fetchPatientName();
  }, [patientId]);
  const generatePDF = async () => {
    try {
      // Charger le PDF existant depuis le dossier assets
      const existingPdfBytes = await fetch(
        "/ordonnance consultation post_icu.pdf"
      ).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

      firstPage.setFont(helveticaFont);
      firstPage.setFontSize(10);
      firstPage.drawText(
        `Le: ${new Date(formValues.showUpDate).toLocaleDateString()}`,
        { x: 450, y: 800 }
      );
      firstPage.drawText(`Nom & Prénom: ${patientName}`, { x: 230, y: 640 });
      firstPage.setFont(helveticaBoldFont);
      firstPage.setFontSize(10);
      firstPage.drawText(`Physiologic : `, { x: 150, y: 600 });

      firstPage.setFont(helveticaFont);
      firstPage.drawText(
        `Quitting Smoking Program: ${formValues.QuittingSmokingProgram}`,
        { x: 150, y: 580 }
      );
      firstPage.drawText(
        `Rehabilitation Program: ${formValues.RehabilitationProgram}`,
        { x: 150, y: 560 }
      );
      firstPage.drawText(
        `Intervention Rehabilitation: ${formValues.InterventionRehabilitation}`,
        { x: 150, y: 540 }
      );
      firstPage.drawText(
        `Physiotherapy Program: ${formValues.Physiotherapy1}`,
        { x: 150, y: 520 }
      );
      firstPage.setFont(helveticaBoldFont);
      firstPage.setFontSize(10);
      firstPage.drawText(`Pharmacological : `, { x: 150, y: 480 });
      firstPage.setFont(helveticaFont);

      firstPage.drawText(
        `Prescription Adjustment: ${formValues.PrescriptionAdjustment}`,
        {
          x: 150,
          y: 460,
        }
      );
      firstPage.drawText(`De novo prescription:`, {
        x: 150,
        y: 440,
      });
      firstPage.drawText(
        `LABA: ${formValues.laba ? "Yes" : "No"} , LAMA: ${
          formValues.lama ? "Yes" : "No"
        }, SABA: ${formValues.saba ? "Yes" : "No"}, ICS: ${
          formValues.ics ? "Yes" : "No"
        }`,
        {
          x: 150,
          y: 420,
        }
      );
      firstPage.drawText(`Vaccination prescription : `, {
        x: 150,
        y: 400,
      });
      firstPage.drawText(
        `Influenza: ${formValues.influenza ? "Yes" : "No"}, SARS-CoV-2: ${
          formValues.SARSCoV21 ? "Yes" : "No"
        }, Pneumococcus: ${formValues.pneumococcus ? "Yes" : "No"}`,
        {
          x: 150,
          y: 380,
        }
      );
      firstPage.setFont(helveticaBoldFont);
      firstPage.setFontSize(10);
      firstPage.drawText(`Ventilatory : `, { x: 150, y: 340 });
      firstPage.setFont(helveticaFont);

      firstPage.drawText(`NIV Withdrawal: ${formValues.NIVwithdrawal}`, {
        x: 150,
        y: 320,
      });
      firstPage.drawText(
        `NIV Suspension Test: ${formValues.NIVSuspensionTest}`,
        { x: 150, y: 300 }
      );
      firstPage.drawText(`PS Switch: ${formValues.PSSwitch}`, {
        x: 150,
        y: 280,
      });
      firstPage.drawText(`IPAP Modification: ${formValues.IPAPModification}`, {
        x: 150,
        y: 260,
      });
      firstPage.drawText(`EPAP Modification: ${formValues.EPAPModification}`, {
        x: 150,
        y: 240,
      });
      firstPage.drawText(
        `Other Modifications: ${formValues.otherModifications}`,
        {
          x: 150,
          y: 220,
        }
      );
      firstPage.drawText(`Interface Change: ${formValues.InterfaceChange}`, {
        x: 150,
        y: 200,
      });
      firstPage.setFont(helveticaBoldFont);
      firstPage.setFontSize(10);
      firstPage.drawText(`Management adjustment : `, { x: 150, y: 160 });
      firstPage.setFont(helveticaFont);

      firstPage.drawText(
        `${formValues.Class1}: ${formValues.INN_DCI1}, ${formValues.BrandName1}, ${formValues.CIDdosages1} * ${formValues.Repetition1}, ${formValues.Duration1}  `,
        {
          x: 150,
          y: 140,
        }
      );
      let yOffset = 120;
      if (managementAdjustments.length > 0) {
        // Boucler sur les éléments du tableau managementAdjustments
        managementAdjustments.forEach((adjustment) => {
          const text = `${adjustment.Class}: ${adjustment.INN_DCI}, ${adjustment.BrandName}, ${adjustment.CIDdosages} * ${adjustment.Repetition}, ${adjustment.Duration}`;

          firstPage.drawText(text, { x: 150, y: yOffset });

          yOffset -= 20; // Diminuer la position verticale pour la prochaine ligne
        });
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Ordonnance_Medicale.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF:", error);
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
          {/*Section 1*/}
          <PatientFollowUpFindings
            consultation={consultation}
            isOpen={isOpen}
            toggleAccordion={toggleAccordion}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 2*/}
          <BasicMonitoringClinical
            isOpen={isOpen1}
            toggleAccordion={toggleAccordion1}
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          {/*Section 3*/}
          {/*         <QualityOfLife
            isOpen={isOpen11}
            toggleAccordion={toggleAccordion11}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          /> */}
          {/*Section 3*/}
          <Tolerance
            isOpen={isOpen2}
            toggleAccordion={toggleAccordion2}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 4*/}
          <Biomarkers
            isOpen={isOpen3}
            toggleAccordion={toggleAccordion3}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 5*/}
          <VentilatorySupport
            isOpen={isOpen13}
            toggleAccordion={toggleAccordion13}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 5*/}
          <AdvancedMonitoring
            isOpen={isOpen4}
            toggleAccordion={toggleAccordion4}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 6*/}
          <MedicationsAdherence
            isOpen={isOpen5}
            toggleAccordion={toggleAccordion5}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 7*/}
          <ManagementAdjustment
            isOpen={isOpen6}
            consultation={consultation}
            toggleAccordion={toggleAccordion6}
            handleAdditionalInputChange={handleAdditionalInputChange}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 8*/}
          <Ventilatory
            isOpen={isOpen7}
            toggleAccordion={toggleAccordion7}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 9*/}
          <Pharmacological
            isOpen={isOpen8}
            toggleAccordion={toggleAccordion8}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*section 10*/}
          <Physiologic
            isOpen={isOpen9}
            toggleAccordion={toggleAccordion9}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*section 11*/}
          <SumUp
            isOpen={isOpen12}
            toggleAccordion={toggleAccordion12}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />
          {/*Section 12*/}
          <NextAppointment
            isOpen={isOpen10}
            toggleAccordion={toggleAccordion10}
            setFormValues={setFormValues}
            formValues={formValues}
            handleChange={handleChange}
          />

          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                generatePDF();
              }}
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-5"
            >
              Prescription
            </button>
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

export default UpdateConsultation;
