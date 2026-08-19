/**
 * data.js
 * ---------------------------------------------------------------------------
 * Single source of truth for the Worker Progress Report page.
 * script.js reads these objects and drives every checkbox, radio-style
 * selection, and text field on the page — nothing is hardcoded in HTML.
 *
 * Three sample datasets are provided:
 *   - SAMPLE_A : "small" dataset, mirrors the reference document
 *   - SAMPLE_B : "large" dataset — every optional field populated,
 *                used to confirm the layout holds up with maximum content
 *   - SAMPLE_EMPTY : minimal / blank report (0 optional fields filled in)
 * ---------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// SAMPLE A — matches the reference PDF
// -----------------------------------------------------------------------
const SAMPLE_A = {
  meta: {
    claimNo: "20042047",
    formTag: "WP",
    workerName: "Madeleine Willson",
    workerAppId: "712041",
    submitted: "March 19, 2024 19:21",
  },

  returnToWork: {
    // exactly one of these keys should be true: notMissedTime | notReturned | returnedOn
    status: "returnedOn",
    returnedOnDate: "March 15, 2024",
    // working arrangement: fullRegular | fullReduced | modifiedRegular | modifiedReduced | other
    workingArrangement: "modifiedReduced",
    otherText: "",
    howItsGoing: "Terrible. Testing Testing",
    expectedReturnDate: "",
    concerns: "",
    lastContactName: "",
    lastContactDate: "",
  },

  recovery: {
    // fullyRecovered | notFullyRecovered
    status: "fullyRecovered",
    comments: "",
  },

  painScale: {
    // integer 1-10, or null if not answered
    value: null,
  },

  medicalTreatment: {
    // continuing | notContinuing
    status: null,
    providerType: "",
    lastTreatmentDate: "",
    lastTreatmentProviderName: "",
    nextTreatmentDate: "",
    isChiroOrPhysio: false,
    frequency: "",
  },

  medication: {
    // taking | notTaking
    status: null,
    medicationName: "",
  },

  homeExercises: {
    // doing | notDoing
    status: null,
    exercisesList: "",
  },

  otherInformation: "No info Testing Testing",

  certificationAcknowledged: true,
  privacyAcknowledged: true,
};

// -----------------------------------------------------------------------
// SAMPLE B — "large" dataset, every optional field populated
// -----------------------------------------------------------------------
const SAMPLE_B = {
  meta: {
    claimNo: "20099981",
    formTag: "WP",
    workerName: "Jordan A. Reyes",
    workerAppId: "845213",
    submitted: "July 14, 2024 09:12",
  },

  returnToWork: {
    status: "notReturned",
    returnedOnDate: "",
    workingArrangement: "other",
    otherText: "On modified remote duties, 3 days/week, pending physio clearance",
    howItsGoing: "",
    expectedReturnDate: "August 5, 2024",
    concerns:
      "Long commute may aggravate lower back; requesting a graduated schedule and an ergonomic chair at the workstation.",
    lastContactName: "Priya Nandakumar (Supervisor)",
    lastContactDate: "July 10, 2024",
  },

  recovery: {
    status: "notFullyRecovered",
    comments:
      "Range of motion in the lower back has improved roughly 40% since the last report. Still experiencing stiffness after prolonged sitting.",
  },

  painScale: {
    value: 4,
  },

  medicalTreatment: {
    status: "continuing",
    providerType: "Physiotherapist",
    lastTreatmentDate: "July 9, 2024",
    lastTreatmentProviderName: "Dr. Elaine Foster",
    nextTreatmentDate: "July 23, 2024",
    isChiroOrPhysio: true,
    frequency: "2x per week",
  },

  medication: {
    status: "taking",
    medicationName: "Naproxen 250mg, twice daily as needed",
  },

  homeExercises: {
    status: "doing",
    exercisesList: "Pelvic tilts, cat-cow stretch, walking 20 min/day, core bracing exercises",
  },

  otherInformation:
    "Requesting an accommodation review meeting before full return to regular duties. Employer has been notified.",

  certificationAcknowledged: true,
  privacyAcknowledged: true,
};

// -----------------------------------------------------------------------
// SAMPLE EMPTY — minimal report, nothing optional filled in
// -----------------------------------------------------------------------
const SAMPLE_EMPTY = {
  meta: {
    claimNo: "00000000",
    formTag: "WP",
    workerName: "Sample Worker",
    workerAppId: "000000",
    submitted: "—",
  },
  returnToWork: {
    status: null,
    returnedOnDate: "",
    workingArrangement: null,
    otherText: "",
    howItsGoing: "",
    expectedReturnDate: "",
    concerns: "",
    lastContactName: "",
    lastContactDate: "",
  },
  recovery: { status: null, comments: "" },
  painScale: { value: null },
  medicalTreatment: {
    status: null,
    providerType: "",
    lastTreatmentDate: "",
    lastTreatmentProviderName: "",
    nextTreatmentDate: "",
    isChiroOrPhysio: false,
    frequency: "",
  },
  medication: { status: null, medicationName: "" },
  homeExercises: { status: null, exercisesList: "" },
  otherInformation: "",
  certificationAcknowledged: false,
  privacyAcknowledged: false,
};

// The dataset actually rendered on page load; swappable via the demo toolbar.
let ACTIVE_REPORT = SAMPLE_A;
