export const sections = [
  //Patient demographics
  {
    title: "Patient demographics",
    fields: [
      { label: "Name/Surname", type: "text" },
      { label: "Birth date", type: "date" },
      { label: "Residency", type: "text" },
      {
        label: "Occupation",
        type: "select",
        options: ["active", "jobless", "retired"],
      },
    ],
  },
  //ID
  {
    title: "ID",
    fields: [
      { label: "ICU/PD File number", type: "text" },
      { label: "Phone number", type: "tel" },
      { label: "ICU/PD discharge date ", type: "date" },
      { label: "Attending physician ", type: "text" },
    ],
  },

  //Insurance
  {
    title: "Insurance",
    fields: [
      { label: "CNAM ID ", type: "number" },
      { label: "APCI IRCI 11J45 ", type: "select", options: ["yes", "non"] },
      { label: "Provider (name)", type: "text" },
    ],
  },

  //Underlying Condition
  {
    title: "Underlying Condition",
    fields: [
      {
        label: "Chronic disease",
        type: "select",
        options: ["COPD", "OHS", "NMD", "OSAS", "RD", "Overlap"],
      },
      {
        label: "Phenotype ",
        type: "select",
        options: ["Blue bloater", "Pink puffer"],
      },
      { label: "Height", type: "number" },
      { label: "Weight", type: "number" },
      { label: "BMI", type: "number" },
      {
        label: "GOLD ",
        type: "select",
        options: ["A", "B", "E"],
      },
      { label: "Charlson comorbidities index", type: "number" },
      {
        label: "Comorbidities",
        type: "combobox",
        options: [
          "Diabetes",
          "Hypertension",
          "Chronic left Heart Failure",
          "Hypothyroidism",
          "Immunosuppression",
          "Others",
        ],
      },
      { label: "Moderate exacerbations last year", type: "number" },
      { label: "Severe exacerbations last year", type: "number" },
      {
        label: "Chest imaging",
        type: "combobox",
        options: [
          "Distension",
          "sequelae",
          "restriction",
          "condensations",
          "emphysema",
          "bronchiectasis",
          "fibrosis",
        ],
      },
      { label: "Respiratory polygraphy Date", type: "date" },
      {
        label: "Respiratory polygraphy Report",
        type: "file",
        accept: ".pdf,image/*",
      },
      { label: "AHI/H", type: "number" },
      { label: "DI/H", type: "number" },
      { label: "meanSpO2%", type: "number" },
      { label: "Pulmonary Functional Testing date (PFT)", type: "date" },
      {
        label: "Pulmonary Functional Testing (PFT)",
        type: "file",
        accept: ".pdf,image/*",
      },
      { label: "FEV1/FVC", type: "number" },
      { label: "FEV1 % predicted", type: "number" },
    ],
  },

  //Functional State

  {
    title: "Functional state",
    fields: [
      {
        label: "mMRC",
        type: "select",
        options: ["0", "1", "2", "3", "4"],
      },
      { label: "CAT", type: "number" },
      {
        label: "WHO",
        type: "select",
        options: ["Maladie", "Déficience", "Incapacité", "Handicap"],
      },
    ],
  },
  //Pharmacological Treatment
  {
    title: "Pharmacological Treatment",
    fields: [
      {
        label: "Inhaled medications",
        type: "combobox",
        options: ["LABA", "LAMA", "SABA", "ICS"],
      },

      {
        label: "Smoke",
        type: "select",
        options: ["Active", "cessation"],
      },
      { label: "Smoke cessation delay (years)", type: "number" },
      {
        label: "Physiotherapy",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Rehabilitation",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Lasilix",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "B-blockers",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Aldactone",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "L-Thyroxine",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Others",
        type: "String",
      },
    ],
  },
  // ICU/PD Acute Presentation
  //Severity
  {
    title: "Severity",
    fields: [
      {
        label: "Diagnosis",
        name: "diagnosis",
        type: "select",
        options: ["AECOPD", "LHF", "PE", "PNO", "CAP", "ARDS", "Atelectasis"],
      },
      { label: "SAPS II Score ", name: "sapsII", type: "number" },
      { label: "APACHE II Score", name: "apacheII", type: "number" },
      { label: "MOF Score", name: "mof", type: "number" },
      { label: "Commentary", name: "commentary", type: "string" },
    ],
  },
  //Relevant Treatable Traits
  {
    title: "Relevant Treatable Traits",
    fields: [
      {
        label: "Relevant Treatable Traits",
        name: "relevanttreatabletrait",
        type: "combobox",
        options: [
          "RHF",
          "Bronchial HR",
          "Asthma",
          "LHF",
          "Reflux (GERD)",
          "emphysema",
          "OSAS",
          "Obesity",
          "Hyperoesinophilia",
        ],
      },
      {
        label: "Ventilatory support during the acute setting CS ",
        name: "ventilatorysupportduringtheacutesettingCS ",
        type: "combobox",
        options: [
          "RHF",
          "Bronchial HR",
          "Asthma",
          "LHF",
          "Reflux (GERD)",
          "emphysema",
          "OSAS",
          "Obesity",
          "Hyperoesinophilia",
        ],
      },
    ],
  },
  //Reliable Biomarkers
  {
    title: "Reliable Biomarkers",
    fields: [
      {
        label: "pH Value",
        name: "pH",
        type: "number",
      },
      { label: "pCO2 (mmHg)", name: "pCO2", type: "number" },
      { label: "pO2 (mmHg)", name: "pO2", type: "number" },
      {
        label: "Chest X-ray/ CT-scan CM",
        name: "chestImaging",
        type: "combobox",
        options: [
          "Distension",
          "Sequelae",
          "Restriction",
          "Condensations",
          "Emphysema",
          "Bronchiectasis",
          "Fibrosis",
        ],
      },
      {
        label: "TTE",
        name: "tee",
        type: "combobox",
        options: [
          "PAH",
          "RV dilatation",
          "LLHEF",
          "LV Diastolic dysfunction ",
          "HTCM",
          "ICM",
        ],
      },
      { label: "ICU/PD LOS", name: "los", type: "string" },
      {
        label: "MDR bacteria carriage ",
        name: "MDRBacteriaCarriage",
        type: "combobox",
        options: ["MDR", "Pseudomonas", "Acinetobacter"],
      },
      {
        label: "Broad spectrum ATB use  ",
        name: "BroadSpectrumAtbUse",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },

  //ICU/PD Discharge
  // Autonomy, Death/AE risk
  {
    title: "Autonomy, Death/AE risk",
    fields: [
      { label: "Date of discharge", type: "date" },
      { label: "HR b/mn ", type: "number" },
      { label: "6MWT", type: "number" },
      { label: "CAT", type: "number" },
      {
        label: "Persistent complications ",
        type: "combobox",
        options: ["RHF", "LHF", "AKI"],
      },
    ],
  },
  // Biomarkers
  {
    title: "Biomarkers",
    fields: [
      { label: "ABGs at discharge", type: "number" },
      { label: "pH ", type: "number" },
      { label: "pCO2 mmHg ", type: "number" },
      { label: "pO2 mmHg ", type: "number" },
      {
        label: "Respiratory polygraphy",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Respiratory polygraphy date ",
        type: "date",
      },
      { label: "AHI/H  ", type: "number" },
      { label: "DI/H  ", type: "number" },
      { label: "meanSpO2 % ", type: "number" },
      {
        label: "Chest imaging",
        type: "combobox",
        options: [
          "Distension",
          "sequelae",
          "restriction",
          "condensations",
          "emphysema",
          "bronchiectasis",
          "fibrosis",
        ],
      },
      {
        label: "patient photo",
        type: "file",
        accept: ".pdf,image/*",
      },

      {
        label: "Uploads - Respiratory Polygraphy ",
        name: "respiratoryPolygraphy",
        type: "file",
        accept: ".pdf,image/*",
      },
      {
        label: "Uploads - Chest/CT-scan",
        name: "chestCtScan",
        type: "file",
        accept: ".pdf,image/*",
      },
      {
        label: "Uploads - ICU/PD stay report",
        name: "IcuPdStayReport",
        type: "file",
        accept: ".pdf,image/*",
      },
      {
        label: "Uploads -Healthcare Insurance Card scan",
        name: "HealthcareInsuranceCardscan",
        type: "file",
        accept: ".pdf,image/*",
      },
      {
        label: "Uploads -AP3 scan",
        name: "AP3scan",
        type: "file",
        accept: ".pdf,image/*",
      },
      {
        label: "Uploads -APCI scan",
        name: "APCIscan",
        type: "file",
        accept: ".pdf,image/*",
      },
    ],
  },

  //Management
  {
    title: "Management",
    fields: [
      { label: "Date", type: "date" },
      {
        label: "Inhaled medications",
        type: "combobox",
        options: ["LABA", "LAMA", "SABA", "ICS"],
      },

      { label: "Ventilatory support at discharge", type: "date" },
      {
        label: "Ventilator settings Machine Brand/serial/ interface",
        type: "text",
      },

      {
        label: "Occupation",
        type: "select",
        options: ["active", "jobless", "retired"],
      },
      {
        label: "Smoke",
        type: "select",
        options: ["Active", "cessation"],
      },
      { label: "Smoke cessation delay (years)", type: "number" },
      {
        label: "Physiotherapy",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Rehabilitation",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Lasilix",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "B-blockers",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Aldactone",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "L-Thyroxine",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        label: "Others",
        type: "String",
      },
    ],
  },
];
