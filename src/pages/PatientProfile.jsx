import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { Empty } from "antd";
import FileCard from "../components/FileCard";

function PatientProfile() {
  const { patientId } = useParams();
  console.log(patientId);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/patient/patients/${patientId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setPatient(response.data.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du patient:",
          error
        );
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  if (!patient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Empty description="Loading..." />
      </div>
    );
  }
  return (
    <div>
      {patient ? (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-10 text-center ">
            Patient Medical Profile
          </h1>
          <div className="flex items-center mb-6  ">
            <div className="w-1/3">
              {patient?.History?.PatientDemographics?.patientPhoto ? (
                <img
                  alt={
                    patient?.History?.PatientDemographics?.name ||
                    "Patient photo"
                  }
                  src={`http://localhost:3000/api/patient/uploads/${patient?.History?.PatientDemographics?.patientPhoto}`}
                  className="w-full h-80 object-cover rounded-lg border border-gray-300 shadow-md"
                />
              ) : (
                <div className="w-full h-80 flex items-center justify-center border border-gray-300 rounded-lg">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
            </div>
            <div className="w-2/3 pl-6">
              <p className="text-lg font-medium mb-2">
                Name:{" "}
                <span className="text-xl mb-4 ml-3">
                  {patient?.History?.PatientDemographics?.name}
                </span>{" "}
              </p>

              <p className="text-lg font-medium mb-2">
                Birth Date:{" "}
                <span className="text-xl mb-4 ml-3">
                  {patient?.History?.PatientDemographics?.birthDate
                    ? new Date(
                        patient?.History?.PatientDemographics?.birthDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>{" "}
              </p>

              <p className="text-lg font-medium mb-2">
                Recidency:
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.PatientDemographics?.residency}
                </span>{" "}
              </p>

              <p className="text-lg font-medium mb-2">
                Occupation:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.PatientDemographics?.occupation}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                icu Pd File Number:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.ID?.icuPdFileNumber}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                Phone Number:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.ID?.phoneNumber}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                ICU PD Discharge Date:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.ID?.icuPdDischargeDate
                    ? new Date(
                        patient?.History?.ID?.icuPdDischargeDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                Attending Physician:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.ID?.attendingPhysician}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                CNAM ID:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.Insurance?.cnamId}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                APCI Irc 11J45:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.Insurance?.apciIrc11J45}
                </span>
              </p>
              <p className="text-lg font-medium mb-2">
                Provider:{" "}
                <span className="text-xl mb-4 ml-3">
                  {" "}
                  {patient?.History?.Insurance?.provider ||
                    patient?.History?.Insurance?.otherProvider}
                </span>
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-5 ">History</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">
                Underlyning Conditions
              </h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">BMI:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.bmi ||
                    "No bmi recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Chronic Diseases:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.chronicDiseases ||
                    "No chronic Diseases recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Phenotype:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.phenotype ||
                    "No phenotype recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Gold:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.gold ||
                    "No phenotype recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Moderate Exacerbations Last Year:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.moderateExacerbationsLastYear ||
                    "No Moderate Exacerbations Last Year recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Severe Exacerbations Last Year:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.severeExacerbationsLastYear ||
                    "No severe Exacerbations Last Year recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">PH:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.PH ||
                    "No PH recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">PO2:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.PO2 ||
                    "No PO2 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">PCO2:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.PCO2 ||
                    "No PCO2 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">BICAR:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.BICAR ||
                    "No BICAR recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">Comorbidities:</p>

                <ul className="list-disc pl-5 C">
                  {patient?.History?.underlyingConditions?.comorbidities
                    ?.Diabetes && (
                    <li className="mb-2">
                      <span className="">Diabetes :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.comorbidities
                    ?.Hypertension && (
                    <li className="mb-2">
                      <span className="">Hypertension :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.comorbidities
                    ?.ChronicleftHeartFailure && (
                    <li className="mb-2">
                      <span className="">Chronic left Heart Failure :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.comorbidities
                    ?.Hypothyroidism && (
                    <li className="mb-2">
                      <span className="">Hypothyroidism :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.comorbidities
                    ?.Immunosuppression && (
                    <li className="mb-2">
                      <span className="">Immunosuppression :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Others Comorbidities:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.OtherComorbidities ||
                    "No Others Comorbidities recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Charlson Comorbidity Index:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.charlsonComorbidityIndex ||
                    "No charlson comorbidity index recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">Chest Imaging:</p>

                <ul className="list-disc pl-5 mb-2">
                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Distension && (
                    <li className="mb-2">
                      <span className="">Distension :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Fibrosis && (
                    <li className="mb-2">
                      <span className="">Fibrosis :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Restriction && (
                    <li className="mb-2">
                      <span className="">Restriction :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Condensations && (
                    <li className="mb-2">
                      <span className="">Condensations :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Interstitial && (
                    <li className="mb-2">
                      <span className="">Interstitial :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Emphysema && (
                    <li className="mb-2">
                      <span className="">Emphysema :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.History?.underlyingConditions?.chestImaging
                    ?.Bronchiectasis && (
                    <li className="mb-2">
                      <span className="">Bronchiectasis :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Chest Imaging Date:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.chestImagingDate
                    ? new Date(
                        patient?.History?.underlyingConditions?.chestImagingDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Pulmonary Functional Testing:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.PulmonaryFunctionalTesting ||
                    "No Pulmonary Functional Testing recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Pulmonary Functional Testing Date:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.PulmonaryFunctionalTestingDate
                    ? new Date(
                        patient?.History?.underlyingConditions?.PulmonaryFunctionalTestingDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">FEV1_FVC:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.FEV1_FVC ||
                    "No FEV1_FVC recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">FEV1:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.FEV1 ||
                    "No FEV1 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Respiratory Polygraphy:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.RespiratoryPolygraphy ||
                    "No Respiratory Polygraphy recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Pulmonary Functional Testing Date:
                </span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions
                    ?.RespiratoryPolygraphyDate
                    ? new Date(
                        patient?.History?.underlyingConditions?.RespiratoryPolygraphyDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">AHI:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.AHI ||
                    "No AHI recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">DI:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.DI ||
                    "No DI recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">mean SpO2:</span>
                <span className="ml-2">
                  {patient?.History?.underlyingConditions?.meanSpO2 ||
                    "No DI recorded."}
                </span>
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Functional State</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">mMRC:</span>
                <span className="ml-2">
                  {patient?.History?.FunctionalState?.mMRC ||
                    "No mMRC recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">WHO:</span>
                <span className="ml-2">
                  {patient?.History?.FunctionalState?.WHO || "No WHO recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">MacCabe:</span>
                <span className="ml-2">
                  {patient?.History?.FunctionalState?.MacCabe ||
                    "No MacCabe recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">Epworth Score:</p>

                <ul className="list-disc pl-5 mb-2">
                  <li className="mb-2">
                    <span className="">Total Epworth Score :</span>
                    <span className="ml-2">
                      {patient?.History?.FunctionalState?.EpworthScore
                        ?.totalEpworthScore ||
                        "No total Epworth Score recorded."}
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="">Epworth Interpretation :</span>
                    <span className="ml-2">
                      {patient?.History?.FunctionalState?.EpworthScore
                        ?.epworthInterpretation ||
                        "No epworth Interpretation recorded."}
                    </span>
                  </li>
                </ul>
              </div>
              <h2 className="text-xl font-semibold mb-4">Treatment</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">Smoke:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.smoke || "No smoke recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Smoke Cessation Delay:
                </span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.smokeCessationDelay ||
                    "No smoke Cessation Delay recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  Inhaled Medications:
                </p>

                <ul className="list-disc pl-5 mb-2">
                  {patient?.History?.Treatment?.inhaledMedications?.LABA && (
                    <li className="mb-2">
                      <span className="">LABA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.Treatment?.inhaledMedications?.LAMA && (
                    <li className="mb-2">
                      <span className="">LAMA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.Treatment?.inhaledMedications?.SABA && (
                    <li className="mb-2">
                      <span className="">SABA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.History?.Treatment?.inhaledMedications?.ICS && (
                    <li className="mb-2">
                      <span className="">ICS :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">Physiotherapy:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.physiotherapy ||
                    "No physiotherapy recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Rehabilitation:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.rehabilitation ||
                    "No rehabilitation recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Lasilix:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.lasilix ||
                    "No lasilix recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">bBlockers:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.bBlockers ||
                    "No bBlockers recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Aldactone:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.aldactone ||
                    "No aldactone recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">lThyroxine:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.lThyroxine ||
                    "No lThyroxine recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Others:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.others || "No others recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">OLD:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.OLD || "No OLD recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">NIV:</span>
                <span className="ml-2">
                  {patient?.History?.Treatment?.NIV || "No NIV recorded."}
                </span>
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-5 mt-5 ">
            ICU/PD Acute presentation
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Severity</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">Diagnosis:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.Severity?.Diagnosis ||
                    "No Diagnosis recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">SAPS III:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.Severity?.SAPSIII ||
                    "No SAPS III recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">APACHEIII:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.Severity?.APACHEIII ||
                    "No APACHE III recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">MOF:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.Severity?.MOF ||
                    "No MOF recorded."}
                </span>
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">
                Relevant Treabletable Traits
              </h2>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  Relevant Treabletable Traits:
                </p>

                <ul className="list-disc pl-5 mb-2">
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.RHF && (
                    <li className="mb-2">
                      <span className="">RHF :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.BronchialHR && (
                    <li className="mb-2">
                      <span className="">Bronchial HR :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Asthma && (
                    <li className="mb-2">
                      <span className="">Asthma :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.LHF && (
                    <li className="mb-2">
                      <span className="">LHF :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Reflux && (
                    <li className="mb-2">
                      <span className="">Reflux :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Emphysema && (
                    <li className="mb-2">
                      <span className="">Emphysema :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.OSAS && (
                    <li className="mb-2">
                      <span className="">OSAS :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Obesity && (
                    <li className="mb-2">
                      <span className="">Obesity :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Hyperoesinophilia && (
                    <li className="mb-2">
                      <span className="">Hyperoesinophilia :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.KidneyFailure && (
                    <li className="mb-2">
                      <span className="">Kidney Failure :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Anemia && (
                    <li className="mb-2">
                      <span className="">Anemia:</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.Arythmia && (
                    <li className="mb-2">
                      <span className="">Arythmia:</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.RelevantTreabletableTraits
                    ?.OtherTTE && (
                    <li className="mb-2">
                      <span className="">Arythmia:</span>
                      <span className="ml-2">
                        {
                          patient?.IcuPdAcutePresentation
                            ?.RelevantTreabletableTraits?.OtherTTE
                        }
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">
                Reliable Biomarkers
              </h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">Eosinophilia:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.Eosinophilia || "No Eosinophilia recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Hemoglobin:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.Hemoglobin || "No Hemoglobin recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Creatinine:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.Creatinine || "No Creatinine recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">FT4:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.FT4 ||
                    "No FT4 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">TSH:</span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TSH ||
                    "No TSH recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">TTE:</p>
                <ul className="list-disc pl-5 mb-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.PAH && (
                    <li className="mb-2">
                      <span className="">PAH :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.RVdilatation && (
                    <li className="mb-2">
                      <span className="">RVdilatation :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.LLHEF && (
                    <li className="mb-2">
                      <span className="">LLHEF :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.LVDiastolicDysfunction && (
                    <li className="mb-2">
                      <span className="">LV Diastolic Dysfunction :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.HTCM && (
                    <li className="mb-2">
                      <span className="">HTCM :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers?.TTE
                    ?.ICM && (
                    <li className="mb-2">
                      <span className="">ICM :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  MDR Bacteria Carriage:
                </p>
                <ul className="list-disc pl-5 mb-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.MDRBacteriaCarriage?.MDR && (
                    <li className="mb-2">
                      <span className="">MDR :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.MDRBacteriaCarriage?.Pseudomonas && (
                    <li className="mb-2">
                      <span className="">Pseudomonas :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.MDRBacteriaCarriage?.Acinetobacter && (
                    <li className="mb-2">
                      <span className="">Acinetobacter :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Broad Spectrum ATB use:
                </span>
                <span className="ml-2">
                  {patient?.IcuPdAcutePresentation?.ReliableBiomarkers
                    ?.BroadSpectrumATBuse ||
                    "No Broad Spectrum ATB use recorded."}
                </span>
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">
                Ventilatory Support During The Acute Setting
              </h2>

              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  Ventilatory Support During The Acute Setting :
                </p>
                <ul className="list-disc pl-5 mb-2">
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.O2 && (
                    <li className="mb-2">
                      <span className="">O2 :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.NIV && (
                    <li className="mb-2">
                      <span className="">NIV :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.CPAP && (
                    <li className="mb-2">
                      <span className="">CPAP :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.HFNC && (
                    <li className="mb-2">
                      <span className="">HFNC :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.IMV && (
                    <li className="mb-2">
                      <span className="">IMV :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.IcuPdAcutePresentation
                    ?.VentilatorySupportDuringTheAcuteSetting?.Tracheotomy && (
                    <li className="mb-2">
                      <span className="">Tracheotomy :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-5 mt-5 ">
            ICU/PD Discharge
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Autonomy</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">Date Of Discharge:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Autonomy?.DateOfDischarge
                    ? new Date(
                        patient?.icuPdDischarge?.Autonomy?.DateOfDischarge
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">HR:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Autonomy?.HR || "No HR recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Six MWT:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Autonomy?.SixMWT ||
                    "No Six MWT recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">mMRC:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Autonomy?.mMRC ||
                    "No Six MWT recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">WHO:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Autonomy?.WHO ||
                    "No Six MWT recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  Persistent Complications:
                </p>
                <ul className="list-disc pl-5 mb-2">
                  {patient?.icuPdDischarge?.Autonomy?.PersistentComplications
                    ?.AKI && (
                    <li className="mb-2">
                      <span className="">AKI :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.icuPdDischarge?.Autonomy?.PersistentComplications
                    ?.LHF && (
                    <li className="mb-2">
                      <span className="">LHF :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.icuPdDischarge?.Autonomy?.PersistentComplications
                    ?.RHF && (
                    <li className="mb-2">
                      <span className="">RHF :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Biomarkers</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">PH:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.PH || "No PH recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">pCO2:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.pCO2 ||
                    "No pCO2 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">pO2:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.pO2 ||
                    "No pO2 recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">ChestCT scan:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.ChestCTscan ||
                    "No ChestCT scan recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">Chest Imaging:</p>

                <ul className="list-disc pl-5 mb-2">
                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Distension && (
                    <li className="mb-2">
                      <span className="">Distension :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Fibrosis && (
                    <li className="mb-2">
                      <span className="">Fibrosis :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Restriction && (
                    <li className="mb-2">
                      <span className="">Restriction :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Condensations && (
                    <li className="mb-2">
                      <span className="">Condensations :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Interstitial && (
                    <li className="mb-2">
                      <span className="">Interstitial :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Emphysema && (
                    <li className="mb-2">
                      <span className="">Emphysema :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                  {patient?.icuPdDischarge?.Biomarkers?.chestImaging
                    ?.Bronchiectasis && (
                    <li className="mb-2">
                      <span className="">Bronchiectasis :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Respiratory Polygraphy At ICU:
                </span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers
                    ?.RespiratoryPolygraphyAtICU ||
                    "No respiratory polygraphy at ICU  recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Respiratory Polygraphy Date:
                </span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers
                    ?.RespiratoryPolygraphyDate
                    ? new Date(
                        patient?.icuPdDischarge?.Biomarkers?.RespiratoryPolygraphyDate
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">AHI_H:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.AHI_H ||
                    "No AHI_H  recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">DI_H:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.DI_H ||
                    "No DI_H recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">meanSpO2:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Biomarkers?.meanSpO2 ||
                    "No meanSpO2 recorded."}
                </span>
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">Management</h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">Date Management:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.DateManagement
                    ? new Date(
                        patient?.icuPdDischarge?.Management?.DateManagement
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Smoke:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.Smoke ||
                    "No Smoke recorded."}
                </span>
              </p>
              <div className="mb-2">
                <p className="text-lg font-medium mb-2 ">
                  Inhaled Medications:
                </p>

                <ul className="list-disc pl-5 mb-2">
                  {patient?.icuPdDischarge?.Management?.inhaledMedications
                    ?.LABA && (
                    <li className="mb-2">
                      <span className="">LABA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Management?.inhaledMedications
                    ?.LAMA && (
                    <li className="mb-2">
                      <span className="">LAMA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Management?.inhaledMedications
                    ?.SABA && (
                    <li className="mb-2">
                      <span className="">SABA :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}

                  {patient?.icuPdDischarge?.Management?.inhaledMedications
                    ?.ICS && (
                    <li className="mb-2">
                      <span className="">ICS :</span>
                      <span className="ml-2">Yes</span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mb-2">
                <span className="text-lg font-medium ">Physiotherapy:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.Physiotherapy ||
                    "No physiotherapy recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Rehabilitation:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.Rehabilitation ||
                    "No rehabilitation recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Lasilix:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.Lasilix ||
                    "No lasilix recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">bBlockers:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.bBlockers ||
                    "No bBlockers recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Aldactone:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.aldactone ||
                    "No aldactone recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">LThyroxine:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.LThyroxine ||
                    "No lThyroxine recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Others:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.Management?.others ||
                    "No others recorded."}
                </span>
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold mb-4">
                Home NIV Initiation Report
              </h2>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Ventilatory Support At Discharge:
                </span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport
                    ?.VentilatorySupportAtDischarge ||
                    "No Ventilatory Support At Discharge recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">IPAP:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.IPAP ||
                    "No IPAP recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">EPAP:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.EPAP ||
                    "No EPAP recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">OLD:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.OLD ||
                    "No OLD recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Leaks:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.Leaks ||
                    "No Ventilatory Leaks recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">AHI:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.AHI ||
                    "No AHI recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">PVA:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.PVA ||
                    "No PVA recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">
                  Nocturnal Duration:
                </span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport
                    ?.NocturnalDuration || "No Nocturnal Duration recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Diurnal Duration:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport
                    ?.DiurnalDuration || "No Diurnal Duration recorded."}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg font-medium ">Provider:</span>
                <span className="ml-2">
                  {patient?.icuPdDischarge?.HomeNIVInitiationReport?.provider ||
                    patient?.icuPdDischarge?.HomeNIVInitiationReport
                      ?.otherProvider ||
                    "No provider recorded."}
                </span>
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-5 mt-5 ">Files</h1>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
              {patient.History.Insurance.healthcareInsuranceCardScanFile && (
                <FileCard
                  fileUrl={`http://localhost:3000/api/patient/uploads/${patient.History.Insurance.healthcareInsuranceCardScanFile}`}
                  fileType="image"
                />
              )}
              {patient.History.Insurance.apciScanFile && (
                <FileCard
                  fileUrl={`http://localhost:3000/api/patient/uploads/${patient.History.Insurance.apciScanFile}`}
                  fileType="image"
                />
              )}
              {patient.History.underlyingConditions
                .PulmonaryFunctionalTestingFile && (
                <FileCard
                  fileUrl={
                    patient.History.underlyingConditions
                      .PulmonaryFunctionalTestingFile
                  }
                  fileType="image"
                />
              )}
              {patient.History.underlyingConditions
                .RespiratoryPolygraphyFile && (
                <FileCard
                  fileUrl={
                    patient.History.underlyingConditions
                      .RespiratoryPolygraphyFile
                  }
                  fileType="image"
                />
              )}
              {patient.icuPdDischarge.Biomarkers.ChestCTscanFile && (
                <FileCard
                  fileUrl={patient.icuPdDischarge.Biomarkers.ChestCTscanFile}
                  fileType="image"
                />
              )}
              {patient.icuPdDischarge.Biomarkers.RespiratoryPolygraphyFile && (
                <FileCard
                  fileUrl={
                    patient.icuPdDischarge.Biomarkers.RespiratoryPolygraphyFile
                  }
                  fileType="image"
                />
              )}
              {patient.icuPdDischarge.Biomarkers.ICU_PDStayReport && (
                <FileCard
                  fileUrl={patient.icuPdDischarge.Biomarkers.ICU_PDStayReport}
                  fileType="image"
                />
              )}
              {patient.icuPdDischarge.Biomarkers.AP3Scan && (
                <FileCard
                  fileUrl={patient.icuPdDischarge.Biomarkers.AP3Scan}
                  fileType="image"
                />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-5 mt-5 ">
            Consultation Files
          </h1>

          <div className="bg-gray-100 p-4 rounded-lg shadow-inner"></div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Empty description="Loading..." />
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
