import { useParams } from "react-router-dom";

import { PDFDocument } from "pdf-lib";
import Lyout from "../components/lyout/Lyout";

import { useState } from "react";
import PatientFollowUpFindings from "../components/ConsultationComponents/PatientFollowUpFindings";
import BasicMonitoringClinical from "../components/ConsultationComponents/BasicMonitoringClinical";
// import QualityOfLife from "../components/ConsultationComponents/QualityOfLife";

//import logoMedecin from "../assets/images/logoMedecin.png";

function AddConsultation() {

  const { patientId } = useParams();

  console.log(patientId);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

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

  });


  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const toggleAccordion1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };


  const generatePDF = async () => {
    // Charger le PDF existant depuis le dossier assets
    const existingPdfBytes = await fetch(
      "../assets/ordonnance consultation post_icu.pdf"
    ).then((res) => res.arrayBuffer());

    // Créer un nouveau document PDF à partir du PDF existant
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Définir les styles
    firstPage.setFont("Helvetica");
    firstPage.setFontSize(12);

    // Ajouter d'autres informations selon vos besoins
    firstPage.drawText(`Fait à: .......................`, { x: 10, y: 600 });
    firstPage.drawText(`Le: ${formValues.showUpDate}`, { x: 150, y: 600 });
    firstPage.drawText(
      "Nom & Prénom: ................................................",
      { x: 10, y: 580 }
    );

    // Enregistrez le document PDF modifié
    const pdfBytes = await pdfDoc.save();
    // Créer un blob et un lien pour télécharger le PDF modifié
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ordonnance_Medicale.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Lyout>
      <>

        <div id="form-container">
          <form className=" mx-auto scroll" onChange={handleChange}>
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
          
            <div className="flex justify-end">
              <button
                onClick={generatePDF}
                type="submit"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-5"
              >
                Prescription
              </button>
          
          </form>
        </div>
      </>
    </Lyout>
  );
}

export default AddConsultation;
