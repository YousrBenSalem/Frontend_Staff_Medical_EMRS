import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lyout from "../components/lyout/Lyout";
import { Empty } from "antd";
import { animated, useSpring } from "react-spring";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";

function ConsultationDetails() {
  const { consultationId } = useParams();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/Consultations/${consultationId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setConsultation(data.data);
      } catch (error) {
        console.error("Failed to fetch consultation details", error);
      }
    };

    fetchConsultation();
  }, [consultationId]);
  const renderAdjustmentGroup = (item, index) => (
    <div
      key={index}
      className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5"
    >
      {Object.entries(item)
        .filter(([key]) => !key.includes("id")) // Filtrer les clés contenant 'id'
        .map(([key, value]) => (
          <p key={key} className="mb-2">
            <span className="">{key}:</span> <span>{value || "N/A"}</span>
          </p>
        ))}
    </div>
  );
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  return (
    <Lyout>
      {consultation ? (
        <animated.div
          style={fadeIn}
          className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer"
        >
          <div className="mx-auto w-full px-4 lg:px-4">
            <h1 className="text-[#308def] text-[20px] leading-[25px] font-bold mb-10 text-center">
              Consultation Details
            </h1>
            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Patient Follow Up Findings
              </h1>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p className="flex items-center">
                  <FaUserMd className="mr-2" />
                  Doctor Name:{" "}
                  {consultation?.PatientFollowUpFindings?.doctorName}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Consultation Date:{" "}
                  {new Date(
                    consultation?.PatientFollowUpFindings?.showUpDate
                  ).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  Type of consultation:{" "}
                  {consultation?.PatientFollowUpFindings?.Type}
                </p>
                <p className="flex items-center">
                  Show Up: {consultation?.PatientFollowUpFindings?.showUp}
                </p>
                <p className="flex items-center">
                  Reason If No Show:{" "}
                  {consultation?.PatientFollowUpFindings?.IfNoShow}
                </p>
                <p>
                  Number of Moderate Exacerbations Since Discharge:{" "}
                  {
                    consultation?.PatientFollowUpFindings
                      ?.numberOfModerateExacerbationsSinceDischarge
                  }
                </p>
                <p>
                  Number of Severe Exacerbations Since Discharge:{" "}
                  {
                    consultation?.PatientFollowUpFindings
                      ?.numberOfSvereExacerbationsSinceDischarge
                  }
                </p>
                <p>
                  Hospital Readmission Since Discharge:{" "}
                  {
                    consultation?.PatientFollowUpFindings
                      ?.HospitalReadmissionSinceDischarge
                  }
                </p>
                <p>
                  Date of Hospital Readmission Since Discharge:{" "}
                  {new Date(
                    consultation?.PatientFollowUpFindings?.DateOfHospitalReadmissionSinceDischarge
                  ).toLocaleDateString()}
                </p>
                <p>Death: {consultation?.PatientFollowUpFindings?.Death}</p>
                <p>
                  date Of Death:{" "}
                  {new Date(
                    consultation?.PatientFollowUpFindings?.dateOfDeath
                  ).toLocaleDateString()}
                </p>
                <p>
                  Cause Of Death:{" "}
                  {consultation?.PatientFollowUpFindings?.CauseOfDeath}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              {" "}
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Basic Monitoring Clinical
              </h1>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Encephalopathy:{" "}
                  {consultation?.BasicMonitoringClinical?.Encephalopathy}
                </p>
                <p>
                  Nycturia: {consultation?.BasicMonitoringClinical?.Nycturia}
                </p>
                <p>
                  Lower limbsedema :{" "}
                  {consultation?.BasicMonitoringClinical?.Lowerlimbsedema}
                </p>
                <p>mMRC :{consultation?.BasicMonitoringClinical?.mMRC}</p>
                <p>
                  Total Epworth Score :
                  {
                    consultation?.BasicMonitoringClinical?.EpworthScore
                      ?.totalEpworthScore
                  }
                </p>
                <p>
                  Epworth Interpretation :
                  {
                    consultation?.BasicMonitoringClinical?.EpworthScore
                      ?.epworthInterpretation
                  }
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              {" "}
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Tolerance : NIV Side Effects
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Unintentional Leaks:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.UnintentionalLeaks
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Conjunctival Irritation:{" "}
                  {consultation?.Tolerance?.NIVSideEffects
                    ?.ConjunctivalIrritation
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Pain:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.Pain ? "Yes" : "No"}
                </p>
                <p>
                  Skin Lesions:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.SkinLesions
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Nasal Obstruction:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.NasalObstruction
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Mucosal Dryness:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.MucosalDryness
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Rhinorrhea:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.Rhinorrhea
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Inappropriate Alarm Settings:{" "}
                  {consultation?.Tolerance?.NIVSideEffects
                    ?.InappropriateAlarmSettings
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Abdominal Distention:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.AbdominalDistention
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Disrupted Sleep:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.DisruptedSleep
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Claustrophobia:{" "}
                  {consultation?.Tolerance?.NIVSideEffects?.Claustrophobia
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Anxiety Related To Interface:{" "}
                  {consultation?.Tolerance?.NIVSideEffects
                    ?.AnxietyRelatedToInterface
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Biomarkers :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>PH: {consultation.Biomarkers.PH}</p>
                <p>pCO2: {consultation.Biomarkers.pCO2}</p>
                <p>PO2: {consultation.Biomarkers.PO2}</p>
                <p>Hco3: {consultation.Biomarkers.Hco3}</p>
                <p>SaO2: {consultation.Biomarkers.SaO2}</p>
                <p>PFT: {consultation.Biomarkers.PFT}</p>
                <p>FEV1: {consultation.Biomarkers.FEV1}</p>
                <p>FVC: {consultation.Biomarkers.FVC}</p>
                <p>FEV1_FVCRatio: {consultation.Biomarkers.FEV1_FVCRatio}</p>
                <p>TLC: {consultation.Biomarkers.TLC}</p>
                <p>DLCO: {consultation.Biomarkers.DLCO}</p>
                <p>Conclusion: {consultation.Biomarkers.Conclusion}</p>
                <p>Severity: {consultation.Biomarkers.Severity}</p>
                <p>GOLD: {consultation.Biomarkers.GOLD}</p>
                <p>SixMWT: {consultation.Biomarkers.SixMWT}</p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Medications Adherence :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Smoke Cessation:{" "}
                  {consultation.MedicationsAdherence.SmokeCessation}
                </p>
                <p>
                  Rehabilitation:{" "}
                  {consultation.MedicationsAdherence.Rehabilitation}
                </p>
                <p>
                  Physiotherapy:{" "}
                  {consultation.MedicationsAdherence.Physiotherapy}
                </p>
                <p>Diuretics: {consultation.MedicationsAdherence.Diuretics}</p>
                <p>
                  Reasons Of Non Adherence:{" "}
                  {consultation.MedicationsAdherence.ReasonsOfNonAdherence}
                </p>
                <p>
                  LABA:{" "}
                  {consultation.MedicationsAdherence.MedicationsAdherence.LABA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  LAMA:{" "}
                  {consultation.MedicationsAdherence.MedicationsAdherence.LAMA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  SABA:{" "}
                  {consultation.MedicationsAdherence.MedicationsAdherence.SABA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  ICS:{" "}
                  {consultation.MedicationsAdherence.MedicationsAdherence.ICS
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  SARSCoV2:{" "}
                  {consultation.MedicationsAdherence.Vaccinations.SARSCoV2
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Spneumoniae:{" "}
                  {consultation.MedicationsAdherence.Vaccinations.Spneumoniae
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Influenza:{" "}
                  {consultation.MedicationsAdherence.Vaccinations.Influenza
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Ventilatory Support :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>Mode: {consultation.VentilatorySupport.Mode}</p>
                <p>IPAP: {consultation.VentilatorySupport.IPAP}</p>
                <p>EPAP: {consultation.VentilatorySupport.EPAP}</p>
                <p>maximalPS: {consultation.VentilatorySupport.maximalPS}</p>
                <p>MinimalPS: {consultation.VentilatorySupport.MinimalPS}</p>
                <p>TImax: {consultation.VentilatorySupport.TImax}</p>
                <p>TImin: {consultation.VentilatorySupport.TImin}</p>
                <p>FixedTI: {consultation.VentilatorySupport.FixedTI}</p>

                <p>
                  Inspiratory Rise Time:{" "}
                  {consultation.VentilatorySupport.InspiratoryRiseTime}
                </p>
                <p>
                  Respiratory Backup Time:{" "}
                  {consultation.VentilatorySupport.RespiratoryBackupTime}
                </p>
                <p>
                  Sensitivity Of Inspiratory Cycling:{" "}
                  {
                    consultation.VentilatorySupport
                      .SensitivityOfInspiratoryCycling
                  }
                </p>
                <p>
                  Sensitivity Of Expiratory Cycling:{" "}
                  {
                    consultation.VentilatorySupport
                      .SensitivityOfExpiratoryCycling
                  }
                </p>
                <p>
                  Respiratory Frequency:{" "}
                  {consultation.VentilatorySupport.RespiratoryFrequency}
                </p>
                <p>Fall Time: {consultation.VentilatorySupport.FallTime}</p>

                <p>Targeted Vt: {consultation.VentilatorySupport.TargetedVt}</p>
                <p>Daily Use: {consultation.VentilatorySupport.DailyUse}</p>
                <p>Leaks: {consultation.VentilatorySupport.Leaks}</p>
                <p>AHI: {consultation.VentilatorySupport.AHI}</p>
                <p>Regularity: {consultation.VentilatorySupport.Regularity}</p>
                <p>
                  Interruptions: {consultation.VentilatorySupport.Interruptions}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Advanced Monitoring :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>PVAs: {consultation.AdvancedMonitoring.PVAs}</p>
                <p>PVAs Types: {consultation.AdvancedMonitoring.PVAsTypes}</p>
                <p>OSAS: {consultation.AdvancedMonitoring.OSAS}</p>
                <p>CSAS: {consultation.AdvancedMonitoring.CSAS}</p>
                <p>CS: {consultation.AdvancedMonitoring.CS}</p>
                <p>HV: {consultation.AdvancedMonitoring.HV}</p>

                <p>
                  Respiratory Polygraphy:{" "}
                  {consultation.AdvancedMonitoring.RespiratoryPolygraphy}
                </p>
                <p>AH_IH: {consultation.AdvancedMonitoring.AH_IH}</p>
                <p>ODI_H: {consultation.AdvancedMonitoring.ODI_H}</p>

                <p>meanSpO2: {consultation.AdvancedMonitoring.meanSpO2}</p>
                <p>SpO2: {consultation.AdvancedMonitoring.SpO2}</p>
                <p>OHS: {consultation.AdvancedMonitoring.OHS}</p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Sum Up :
              </h1>
              <div className="grid gap-4 grid-cols-1  mb-5">
                <p> {consultation.sum_Up}</p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Management Adjustment :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Class:
                  {consultation.ManagementAdjustment.ManagementAdjustment.Class}
                </p>
                <p>
                  INN_DCI:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .INN_DCI
                  }
                </p>
                <p>
                  Brand Name:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .BrandName
                  }
                </p>
                <p>
                  CID dosages:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .CIDdosages
                  }
                </p>
                <p>
                  Repetition:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .Repetition
                  }
                </p>
                <p>
                  Duration:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .Duration
                  }
                </p>
                <p>
                  Doctor:
                  {
                    consultation.ManagementAdjustment.ManagementAdjustment
                      .Doctor
                  }
                </p>
                <p>
                  Date:
                  {new Date(
                    consultation.ManagementAdjustment.ManagementAdjustment.Date
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                  Management Adjustment Added :
                </h1>
                {consultation.ManagementAdjustment.ManagementAdjustmentAdded.map(
                  (item, index) => (
                    <div key={index}>{renderAdjustmentGroup(item, index)}</div>
                  )
                )}
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Physiologic :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Quitting Smoking Program:{" "}
                  {consultation.Physiologic.QuittingSmokingProgram}
                </p>
                <p>
                  Intervention Smoking:{" "}
                  {consultation.Physiologic.InterventionSmoking}
                </p>
                <p>
                  Rehabilitation Program:{" "}
                  {consultation.Physiologic.RehabilitationProgram}
                </p>
                <p>
                  Intervention Rehabilitation:{" "}
                  {consultation.Physiologic.InterventionRehabilitation}
                </p>
                <p>
                  Physiotherapy Program:{" "}
                  {consultation.Physiologic.Physiotherapy}
                </p>
                <p>
                  Intervention Physiotherapy:{" "}
                  {consultation.Physiologic.InterventionPhysiotherapy}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Pharmacological :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  Prescription Adjustment:{" "}
                  {consultation.Pharmacological.PrescriptionAdjustment}
                </p>
                <p>
                  LABA:{" "}
                  {consultation.Pharmacological.DeNovoPrescription.LABA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  LAMA:{" "}
                  {consultation.Pharmacological.DeNovoPrescription.LAMA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  SABA:{" "}
                  {consultation.Pharmacological.DeNovoPrescription.SABA
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  ICS:{" "}
                  {consultation.Pharmacological.DeNovoPrescription.ICS
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  influenza:{" "}
                  {consultation.Pharmacological.VaccinationPrescription
                    .influenza
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  SARSCoV2:{" "}
                  {consultation.Pharmacological.VaccinationPrescription.SARSCoV2
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  pneumococcus:{" "}
                  {consultation.Pharmacological.VaccinationPrescription
                    .pneumococcus
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Ventilatory :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>NIV withdrawal: {consultation.Ventilatory.NIVwithdrawal}</p>
                <p>
                  NIV Suspension Test:{" "}
                  {consultation.Ventilatory.NIVSuspensionTest}
                </p>
                <p>PS Switch: {consultation.Ventilatory.PSSwitch}</p>
                <p>
                  IPAP Modification: {consultation.Ventilatory.IPAPModification}
                </p>
                <p>
                  EPAP Modification: {consultation.Ventilatory.EPAPModification}
                </p>
                <p>
                  Other Modification:
                  {consultation.Ventilatory.otherModifications}
                </p>
                <p>
                  Interface Change: {consultation.Ventilatory.InterfaceChange}
                </p>
              </div>
            </div>

            <div className="sm:p-5 antialiased p-3 mt-10 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Next Appointment :
              </h1>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5">
                <p>
                  TTE: {consultation.NextAppointment.Needs.TTE ? "Yes" : "No"}
                </p>
                <p>
                  Pulmonary Functional Testing:{" "}
                  {consultation.NextAppointment.Needs.PulmonaryFunctionalTesting
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  CNAM Renewal Request:{" "}
                  {consultation.NextAppointment.Needs.CNAMRenewalRequest
                    ? "Yes"
                    : "No"}
                </p>

                <p>
                  ABG:{" "}
                  {consultation.NextAppointment.Biomarkers.ABG ? "Yes" : "No"}
                </p>
                <p>
                  Polygraphy:{" "}
                  {consultation.NextAppointment.Biomarkers.Polygraphy
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Downloads:{" "}
                  {consultation.NextAppointment.Biomarkers.Downloads
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </div>
        </animated.div>
      ) : (
        <Empty />
      )}
    </Lyout>
  );
}

export default ConsultationDetails;
