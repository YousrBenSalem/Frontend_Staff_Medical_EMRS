import { useParams, useNavigate } from "react-router-dom";

import { PDFDocument, StandardFonts } from "pdf-lib";
import Lyout from "../components/lyout/Lyout";
import { message } from "antd";
import { useEffect, useState } from "react";
import PatientFollowUpFindings from "../components/ConsultationComponents/PatientFollowUpFindings";
import BasicMonitoringClinical from "../components/ConsultationComponents/BasicMonitoringClinical";
// import QualityOfLife from "../components/ConsultationComponents/QualityOfLife";
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
//import logoMedecin from "../assets/images/logoMedecin.png";

function AddConsultation() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { patientId } = useParams();

  console.log(patientId);

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
  const [patientName, setPatientName] = useState();

  const [formValues, setFormValues] = useState({
    // Patient Follow-Up Findings
    doctorName: "",
    showUpDate: "",
    type: "",
    showUp: "",
    IfNoShow: "",
    numberOfModerateExacerbationsSinceDischarge: 0,
    numberOfSevereExacerbationsSinceDischarge: 0,
    HospitalReadmissionSinceDischarge: 0,
    DateOfHospitalReadmissionSinceDischarge: "",
    Death: "",
    dateOfDeath: "",
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

    // Management Adjustment
    Class1: "",
    INN_DCI1: 0,
    BrandName1: "",
    CIDdosages1: 0,
    Repetition1: 0,
    Duration1: "",
    Doctor: "",
    Date: "",
    StampPDFToPatient: null,
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
  const [managementAdjustments, setManagementAdjustments] = useState([]);

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
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    const getValue = (field) => event.target[field]?.value || "";
    const getFile = (field) => event.target[field]?.files[0] || null;
    const getCheckbox = (field) => event.target[field]?.checked || false;
    const getNumber = (field) => parseFloat(event.target[field]?.value) || 0;
    const formValues = {
      doctorName: getValue("doctorName"),
      showUpDate: getValue("showUpDate"),
      type: getValue("type"),
      showUp: getValue("showUp"),
      IfNoShow: getValue("IfNoShow"),
      numberOfModerateExacerbationsSinceDischarge: getNumber(
        "numberOfModerateExacerbationsSinceDischarge"
      ),
      numberOfSevereExacerbationsSinceDischarge: getNumber(
        "numberOfSevereExacerbationsSinceDischarge"
      ),
      HospitalReadmissionSinceDischarge: getNumber(
        "HospitalReadmissionSinceDischarge"
      ),
      DateOfHospitalReadmissionSinceDischarge: getValue(
        "DateOfHospitalReadmissionSinceDischarge"
      ),
      Death: getValue("Death"),
      dateOfDeath: getValue("dateOfDeath"),
      CauseOfDeath: getValue("CauseOfDeath"),
      // Basic Monitoring Clinical
      Encephalopathy: getValue("Encephalopathy"),
      Nycturia: getValue("Nycturia"),
      Lowerlimbsedema: getValue("Lowerlimbsedema"),
      mMRC: getValue("mMRC"),
      epworthInterpretation: getValue("epworthInterpretation"),
      totalEpworthScore: getNumber("totalEpworthScore"),

      // Quality of Life
      // Tolerance
      UnintentionalLeaks: getCheckbox("UnintentionalLeaks"),
      ConjunctivalIrritation: getCheckbox("ConjunctivalIrritation"),
      Pain: getCheckbox("Pain"),
      SkinLesions: getCheckbox("SkinLesions"),
      NasalObstruction: getCheckbox("NasalObstruction"),
      MucosalDryness: getCheckbox("MucosalDryness"),
      Rhinorrhea: getCheckbox("Rhinorrhea"),
      InappropriateAlarmSettings: getCheckbox("InappropriateAlarmSettings"),
      AbdominalDistention: getCheckbox("AbdominalDistention"),
      DisruptedSleep: getCheckbox("DisruptedSleep"),
      Claustrophobia: getCheckbox("Claustrophobia"),
      AnxietyRelatedToInterface: getCheckbox("AnxietyRelatedToInterface"),
      // Biomarkers
      PH: getNumber("PH"),
      pCO2: getNumber("pCO2"),
      PO2: getNumber("PO2"),
      Hco3: getNumber("Hco3"),
      SaO2: getNumber("SaO2"),
      PFT: getValue("PFT"),
      FEV1: getNumber("FEV1"),
      FVC: getNumber("FVC"),
      FEV1_FVCRatio: getNumber("FEV1_FVCRatio"),
      TLC: getNumber("TLC"),
      DLCO: getNumber("DLCO"),
      Conclusion: getValue("Conclusion"),
      Severity: getValue("Severity"),
      GOLD: getValue("GOLD"),
      SixMWT: getNumber("SixMWT"),
      // Medications Adherence
      SmokeCessation: getValue("SmokeCessation"),
      Rehabilitation: getValue("Rehabilitation"),
      Physiotherapy: getValue("Physiotherapy"),
      Diuretics: getValue("Diuretics"),
      ReasonsOfNonAdherence: getValue("ReasonsOfNonAdherence"),
      GOLD1: getValue("GOLD1"),
      LABA: getCheckbox("LABA"),
      LAMA: getCheckbox("LAMA"),
      SABA: getCheckbox("SABA"),
      ICS: getCheckbox("ICS"),
      SARSCoV2: getCheckbox("SARSCoV2"),
      Spneumoniae: getCheckbox("Spneumoniae"),
      Influenza: getCheckbox("Influenza"),
      // Ventilatory Support
      Mode: getValue("Mode"),
      IPAP: getNumber("IPAP"),
      EPAP: getNumber("EPAP"),
      maximalPS: getNumber("maximalPS"),
      MinimalPS: getNumber("MinimalPS"),
      TImax: getNumber("TImax"),
      TImin: getNumber("TImin"),
      FixedTI: getNumber("FixedTI"),
      InspiratoryRiseTime: getNumber("InspiratoryRiseTime"),
      RespiratoryBackupTime: getNumber("RespiratoryBackupTime"),
      SensitivityOfInspiratoryCycling: getNumber(
        "SensitivityOfInspiratoryCycling"
      ),
      SensitivityOfExpiratoryCycling: getNumber(
        "SensitivityOfExpiratoryCycling"
      ),
      RespiratoryFrequency: getNumber("RespiratoryFrequency"),
      FallTime: getNumber("FallTime"),
      TargetedVt: getNumber("TargetedVt"),
      DailyUse: getNumber("DailyUse"),
      Leaks: getNumber("Leaks"),
      AHI: getNumber("AHI"),
      Regularity: getValue("Regularity"),
      Interruptions: getValue("Interruptions"),
      // Advanced Monitoring
      PVAs: getValue("PVAs"),
      PVAsTypes: getValue("PVAsTypes"),
      OSAS: getNumber("OSAS"),
      CSAS: getNumber("CSAS"),
      CS: getNumber("CS"),
      HV: getNumber("HV"),
      RespiratoryPolygraphy: getValue("RespiratoryPolygraphy"),
      AH_IH: getNumber("AH_IH"),
      ODI_H: getNumber("ODI_H"),
      meanSpO2: getNumber("meanSpO2"),
      SpO2: getNumber("SpO2"),
      OHS: getNumber("OHS"),
      // Sum Up
      sum_Up: getValue("sum_Up"),
      // Management Adjustment

      // Management Adjustment
      Class1: getValue("Class1"),
      INN_DCI1: getNumber("INN_DCI1"),
      BrandName1: getValue("BrandName1"),
      CIDdosages1: getNumber("CIDdosages1"),
      Repetition1: getNumber("Repetition1"),
      Duration1: getValue("Duration1"),
      Doctor: getValue("Doctor"),
      Date: getValue("Date"),
      // Physiologic
      QuittingSmokingProgram: getValue("QuittingSmokingProgram"),
      InterventionSmoking: getValue("InterventionSmoking"),
      RehabilitationProgram: getValue("RehabilitationProgram"),
      InterventionRehabilitation: getValue("InterventionRehabilitation"),
      Physiotherapy1: getValue("Physiotherapy1"),
      InterventionPhysiotherapy: getValue("InterventionPhysiotherapy"),
      // Pharmacological
      PrescriptionAdjustment: getValue("PrescriptionAdjustment"),
      laba: getCheckbox("laba"),
      lama: getCheckbox("lama"),
      saba: getCheckbox("saba"),
      ics: getCheckbox("ics"),

      influenza: getCheckbox("influenza"),
      SARSCoV21: getCheckbox("SARSCoV21"),
      pneumococcus: getCheckbox("pneumococcus"),
      // Ventilatory
      NIVwithdrawal: getValue("NIVwithdrawal"),
      NIVSuspensionTest: getValue("NIVSuspensionTest"),
      PSSwitch: getValue("PSSwitch"),
      IPAPModification: getNumber("IPAPModification"),
      EPAPModification: getNumber("EPAPModification"),
      otherModifications: getValue("otherModifications"),
      InterfaceChange: getValue("InterfaceChange"),
      // Next Appointment
      TTE: getCheckbox("TTE"),
      PulmonaryFunctionalTesting: getCheckbox("PulmonaryFunctionalTesting"),
      CNAMRenewalRequest: getCheckbox("CNAMRenewalRequest"),
      ABG: getCheckbox("ABG"),
      Polygraphy: getCheckbox("Polygraphy"),
      Downlowds: getCheckbox("Downlowds"),
      others: getValue("others"),
      patientId: patientId,
    };

    const formData = new FormData();
    console.log(
      "RespiratoryPolygraphyFile",
      getFile("RespiratoryPolygraphyFile")
    );
    formData.append(
      "RespiratoryPolygraphyFile",
      getFile("RespiratoryPolygraphyFile")
    );

    console.log("StampPdfToPatient", getFile("StampPdfToPatient"));
    formData.append("StampPdfToPatient", getFile("StampPdfToPatient"));

    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        } else if (!isNaN(value) && typeof value === "number") {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    console.log("le formulaire de form Data est contient ", formValues);
    // This will log the formData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    formData.append(
      "ManagementAdjustmentAdded",
      JSON.stringify(managementAdjustments)
    );

    console.log(managementAdjustments);
    try {
      const response = await fetch(
        `http://localhost:3000/api/Consultations/addConsultation`,

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
          content: "Consultation added with success",
        });
        const newConsultation = await response.json();
        const patientId = newConsultation.patientId;
        console.log("newPatient", patientId);
        navigate(`/calenderAddAppointement/${patientId}`);
        console.log("Consultation ajoutée pour le patient ID:", patientId);
      } else {
        messageApi.open({
          type: "error",
          content: "Consultation didn't add with success",
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
      firstPage.drawText(`Le: ${formValues.showUpDate}`, { x: 450, y: 800 });
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
      link.download = `Ordonnance_Medicale_${patientName}.pdf`;
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
        <div id="form-container">
          <form
            className=" mx-auto scroll"
            onChange={handleChange}
            onSubmit={handleSubmitAdd}
          >
            {/*Section 1*/}
            <PatientFollowUpFindings
              isOpen={isOpen}
              toggleAccordion={toggleAccordion}
              formValues={formValues}
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
            {/*   <QualityOfLife
              isOpen={isOpen11}
              toggleAccordion={toggleAccordion11}
              formValues={formValues}
              handleChange={handleChange}
            /> */}
            {/*Section 3*/}
            <Tolerance
              isOpen={isOpen2}
              toggleAccordion={toggleAccordion2}
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
            {/*Section 6*/}
            <MedicationsAdherence
              isOpen={isOpen5}
              toggleAccordion={toggleAccordion5}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 5*/}
            <VentilatorySupport
              isOpen={isOpen13}
              toggleAccordion={toggleAccordion13}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 5*/}
            <AdvancedMonitoring
              isOpen={isOpen4}
              toggleAccordion={toggleAccordion4}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*section 11*/}
            <SumUp
              isOpen={isOpen12}
              toggleAccordion={toggleAccordion12}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 7*/}
            <ManagementAdjustment
              isOpen={isOpen6}
              toggleAccordion={toggleAccordion6}
              formValues={formValues}
              handleChange={handleChange}
              handleAdditionalInputChange={handleAdditionalInputChange}
            />
            {/*section 10*/}
            <Physiologic
              isOpen={isOpen9}
              toggleAccordion={toggleAccordion9}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 9*/}
            <Pharmacological
              isOpen={isOpen8}
              toggleAccordion={toggleAccordion8}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 8*/}
            <Ventilatory
              isOpen={isOpen7}
              toggleAccordion={toggleAccordion7}
              formValues={formValues}
              handleChange={handleChange}
            />
            {/*Section 12*/}
            <NextAppointment
              isOpen={isOpen10}
              toggleAccordion={toggleAccordion10}
              formValues={formValues}
              handleChange={handleChange}
            />

            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault(); // Empêche le rechargement de la page
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
        </div>
      </>
    </Lyout>
  );
}

export default AddConsultation;
