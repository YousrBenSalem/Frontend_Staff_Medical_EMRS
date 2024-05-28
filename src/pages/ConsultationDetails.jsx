import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lyout from "../components/lyout/Lyout";
import { Empty } from "antd";

function ConsultationDetails() {
  const { consultationId } = useParams();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/consultations/${consultationId}`
        );
        setConsultation(data.data.consultation);
      } catch (error) {
        console.error("Failed to fetch consultation details", error);
      }
    };

    fetchConsultation();
  }, [consultationId]);

  return (
    <Lyout>
      <div>
        {consultation ? (
          <div className=" sm:p-5 antialiased p-3 mt-10  rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
            <div className="mx-auto w-full px-4 lg:px-4">
              <h1 className="text-[#308def] text-[20px] leading-[25px] font-bold mb-10">
                Consultation Details
              </h1>
              <div className="grid gap-4 grid-cols-4  ">
                <p>Doctor Name: {consultation.doctorName}</p>

                <p>No Show: {consultation.noShow ? "Yes" : "No"}</p>
                <p>Reason: {consultation.reason}</p>
                <p>Consultation Date: {consultation.consultationDate}</p>
              </div>
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Events
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>
                  Number of Moderate Exacerbations Since Discharge:
                  {
                    consultation.Events
                      .numberOfModerateExacerbationsSinceDischarge
                  }
                </p>
                <p>
                  Number of Severe Exacerbations Since Discharge:{" "}
                  {consultation.Events.numberOfSvereExacerbationsSinceDischarge}
                </p>
                <p>
                  Hospital Readmission Since Discharge:{" "}
                  {consultation.Events.hospitalReadmissionSinceDischarge}
                </p>
              </div>

              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Basic Monitoring Clinical
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>
                  Encephalopathy:
                  {consultation.basicMonitoringClinical.Encephalopathy
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Nycturia:{" "}
                  {consultation.basicMonitoringClinical.Nycturia ? "Yes" : "No"}
                </p>
                <p>
                  Lower Limbs Edema:{" "}
                  {consultation.basicMonitoringClinical.lowerLimbsEdema
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Epworth Score:{" "}
                  {consultation.basicMonitoringClinical.epworthScore}
                </p>
                <p>
                  Functional State:{" "}
                  {consultation.basicMonitoringClinical.functionalState}
                </p>
                <p>mMRC: {consultation.basicMonitoringClinical.mMRC}</p>
              </div>
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Tolerance
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>Quality of Life: {consultation.Tolerance.QualityOfLife}</p>
                <p>Satisfaction: {consultation.Tolerance.Satisfaction}</p>
                <p>St. Georges: {consultation.Tolerance.StGeorges}</p>
                <p>
                  Family Experience: {consultation.Tolerance.FamilyExperience}
                </p>
                <p>Needs: {consultation.Tolerance.Needs}</p>

                <div>
                  <h3>NIV Side Effects :</h3>
                  <ul>
                    {consultation.Tolerance.NIVSideEffects.map(
                      (sideEffect, index) => (
                        <li key={index}>{sideEffect}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Biomarkers
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>DayTime ABGs: {consultation.Biomarkers.DayTimeABGs}</p>
                <p>pH: {consultation.Biomarkers.pH}</p>
                <p>pCO2: {consultation.Biomarkers.pCO2}</p>
                <p>PO2: {consultation.Biomarkers.PO2}</p>
                <p>HCO3: {consultation.Biomarkers.Hco3}</p>
                <p>SaO2: {consultation.Biomarkers.SaO2}</p>
                <p>PFT: {consultation.Biomarkers.PFT}</p>
                <p>FEV1: {consultation.Biomarkers.FEV1}</p>
                <p>FEV1/FVC Ratio: {consultation.Biomarkers.FEV1FVCRatio}</p>
                <p>TLC: {consultation.Biomarkers.TLC}</p>
                <p>DLCO: {consultation.Biomarkers.DLCO}</p>
                <p>Conclusion: {consultation.Biomarkers.Conclusion}</p>
                <p>Severity: {consultation.Biomarkers.severity}</p>
                <p>GOLD: {consultation.Biomarkers.gold}</p>
                <p>SixMWT: {consultation.Biomarkers.SixMWT}</p>
                <p>Mode: {consultation.Biomarkers.mode}</p>
                <p>AVAPS: {consultation.Biomarkers.AVAPS}</p>
                <p>EPAP: {consultation.Biomarkers.EPAP}</p>
                <p>IPAP: {consultation.Biomarkers.IPAP}</p>
                <p>TImax: {consultation.Biomarkers.TImax}</p>
                <p>TImin: {consultation.Biomarkers.TImin}</p>
                <p>Fixed TI: {consultation.Biomarkers.FixedTI}</p>
                <p>
                  Sensitivity of Inspiratory Cycling:{" "}
                  {consultation.Biomarkers.sensitivityOfInspiratoryCycling}
                </p>
                <p>
                  Sensitivity of Expiratory Cycling:{" "}
                  {consultation.Biomarkers.sensitivityOfExpiratoryCycling}
                </p>
                <p>
                  Inspiratory Rise Time:{" "}
                  {consultation.Biomarkers.inspiratoryRiseTime}
                </p>
                <p>
                  Respiratory Backup Time:{" "}
                  {consultation.Biomarkers.respiratoryBackuTime}
                </p>
                <p>
                  Respiratory Frequency:{" "}
                  {consultation.Biomarkers.respiratoryFrequency}
                </p>
                <p>Fall Time: {consultation.Biomarkers.fallTime}</p>
                <p>Target eVt: {consultation.Biomarkers.targeteVt}</p>
                <p>Maximal PS: {consultation.Biomarkers.maximalPS}</p>
                <p>Minimal PS: {consultation.Biomarkers.minimalPS}</p>
                <p>Daily Use: {consultation.Biomarkers.dailyUse}</p>
                <p>
                  Regularity:{" "}
                  {consultation.Biomarkers.Regularity ? "Yes" : "No"}
                </p>
                <p>
                  Interruptions:{" "}
                  {consultation.Biomarkers.Interruptions ? "Yes" : "No"}
                </p>
                <p>Leaks: {consultation.Biomarkers.Leaks ? "Yes" : "No"}</p>
                <p>AHI: {consultation.Biomarkers.AHI}</p>
              </div>
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Medications Adherence
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>
                  Medications Adherence:{" "}
                  {consultation.medicationsAdherence.medicationsAdherence.join(
                    ", "
                  )}
                </p>
                <p>
                  Reasons of Non-Adherence:{" "}
                  {consultation.medicationsAdherence.reasonsOfNonAdherence}
                </p>
                <p>
                  GOLD Class Discrepancy:{" "}
                  {consultation.medicationsAdherence.goldClassDiscrepancy
                    ? "Yes"
                    : "No"}
                </p>
                <p>Diuretics: {consultation.medicationsAdherence.Diuretics}</p>
                <p>
                  Rehabilitation:{" "}
                  {consultation.medicationsAdherence.Rehabilitation}
                </p>
                <p>
                  Physiotherapy:{" "}
                  {consultation.medicationsAdherence.Physiotherapy}
                </p>
                <p>
                  Smoke Cessation:{" "}
                  {consultation.medicationsAdherence.smokeCessation}
                </p>
                <p>
                  Vaccinations:{" "}
                  {consultation.medicationsAdherence.Vaccinations.join(", ")}
                </p>
                <p>Sum Up: {consultation.medicationsAdherence.SumUp}</p>
              </div>
              <h1 className="text-[#FF0060] text-[20px] leading-[25px] font-bold mb-4">
                Management Adjustment
              </h1>
              <div className="grid  gap-4 grid-cols-3 ">
                <p>
                  Prescription Form:{" "}
                  {consultation.managementAdjustment.prescriptionForm}
                </p>
                <p>Brand Name: {consultation.managementAdjustment.brandName}</p>
                <p>Dosage: {consultation.managementAdjustment.dosage}</p>
                <p>Duration: {consultation.managementAdjustment.duration}</p>
                <p>Others: {consultation.managementAdjustment.others}</p>
                <p>Doctor: {consultation.managementAdjustment.doctor}</p>
                <p>Date: {consultation.managementAdjustment.date}</p>
                <p>
                  Stamp PDF to Patient:{" "}
                  {consultation.managementAdjustment.StampPdfToPatient}
                </p>

                <p>
                  de Novo Prescription:{" "}
                  {consultation.managementAdjustment.Pharmacological.deNovoPrescription.join(
                    ", "
                  )}
                </p>
                <p>
                  Prescription Adjustment:{" "}
                  {consultation.managementAdjustment.Pharmacological
                    .prescriptionAdjustment
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  Vaccination Prescription:{" "}
                  {consultation.managementAdjustment.Pharmacological.vaccinationPrescription.join(
                    ", "
                  )}
                </p>

                <h3>Physiologic</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Empty />
          </div>
        )}
      </div>
    </Lyout>
  );
}

export default ConsultationDetails;
