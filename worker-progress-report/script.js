/**
 * script.js
 * ---------------------------------------------------------------------------
 * All DOM rendering for the Worker Progress Report page.
 * Reads from the dataset objects in data.js and drives:
 *   - checkbox state (checked / unchecked) for every "select one" group
 *   - free-text fill-in-the-blank lines
 *   - multi-line comment/freeform boxes
 *   - the 1–10 pain scale
 *
 * Reusable helpers:
 *   - setChecked(id, bool)        -> toggle a single checkbox
 *   - setText(selector, text)     -> set textContent, handles NodeList too
 *   - renderPainScale(value)      -> builds the 10 pain-scale cells dynamically
 * ---------------------------------------------------------------------------
 */

// ------------------------------- helpers -----------------------------------

/** Set the checked state of a checkbox by id (no-op if not found). */
function setChecked(id, isChecked) {
  const node = document.getElementById(id);
  if (node) node.checked = !!isChecked;
}

/**
 * Set text content on one element (by id) or every element matching a
 * class selector (used for repeated footer fields across pages 1–3).
 */
function setText(selectorOrId, text) {
  const value = text || "";
  const byId = document.getElementById(selectorOrId);
  if (byId) {
    byId.textContent = value;
    return;
  }
  document.querySelectorAll(`.${selectorOrId}`).forEach((node) => {
    node.textContent = value;
  });
}

/**
 * Build the 1–10 pain scale row from scratch based on the selected value.
 * Fully dynamic: if value is null/undefined, no cell is marked selected.
 */
function renderPainScale(selectedValue) {
  const container = document.getElementById("pain-scale");
  container.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const label = document.createElement("label");
    label.className = "checkbox-line pain-scale-item";
    label.style.width = "42px";
    
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.disabled = true;
    cb.checked = (i === selectedValue);
    
    label.appendChild(cb);
    label.appendChild(document.createTextNode(" " + i));
    container.appendChild(label);
  }
}

// ---------------------------- section renderers -----------------------------

function renderHeader(data) {
  setText("claim-no", data.meta.claimNo);
  setText("form-tag", data.meta.formTag);
  setText("worker-name", data.meta.workerName);
}

function renderFooters(data) {
  setText("footer-app-id", data.meta.workerAppId);
  setText("footer-submitted", data.meta.submitted);
  setText("footer-page-total", "3");
}

function renderReturnToWork(data) {
  const rtw = data.returnToWork;

  setChecked("cb-not-missed", rtw.status === "notMissedTime");
  setChecked("cb-not-returned", rtw.status === "notReturned");
  setChecked("cb-returned-on", rtw.status === "returnedOn");
  setText("returned-on-date", rtw.status === "returnedOn" ? rtw.returnedOnDate : "");

  setChecked("cb-full-regular", rtw.workingArrangement === "fullRegular");
  setChecked("cb-full-reduced", rtw.workingArrangement === "fullReduced");
  setChecked("cb-mod-regular", rtw.workingArrangement === "modifiedRegular");
  setChecked("cb-mod-reduced", rtw.workingArrangement === "modifiedReduced");
  setChecked("cb-working-other", rtw.workingArrangement === "other");
  setText("working-other-text", rtw.workingArrangement === "other" ? rtw.otherText : "");

  setText("how-its-going", rtw.howItsGoing);
  setText("expected-return-date", rtw.expectedReturnDate);
  setText("concerns", rtw.concerns);
  setText("last-contact-name", rtw.lastContactName);
  setText("last-contact-date", rtw.lastContactDate);
}

function renderRecovery(data) {
  const rec = data.recovery;
  setChecked("cb-not-recovered", rec.status === "notFullyRecovered");
  setChecked("cb-fully-recovered", rec.status === "fullyRecovered");
  setText("recovery-comments", rec.comments);
}

function renderMedicalTreatment(data) {
  const mt = data.medicalTreatment;
  setChecked("cb-not-continuing-treatment", mt.status === "notContinuing");
  setChecked("cb-continuing-treatment", mt.status === "continuing");
  setText("provider-type", mt.status === "continuing" ? mt.providerType : "");
  setText("last-treatment-date", mt.lastTreatmentDate);
  setText("last-treatment-provider", mt.lastTreatmentProviderName);
  setText("next-treatment-date", mt.nextTreatmentDate);
  setChecked("cb-chiro-physio", !!mt.isChiroOrPhysio);
  setText("treatment-frequency", mt.isChiroOrPhysio ? mt.frequency : "");
}

function renderMedication(data) {
  const med = data.medication;
  setChecked("cb-not-taking-medication", med.status === "notTaking");
  setChecked("cb-taking-medication", med.status === "taking");
  setText("medication-name", med.status === "taking" ? med.medicationName : "");
}

function renderHomeExercises(data) {
  const ex = data.homeExercises;
  setChecked("cb-not-doing-exercises", ex.status === "notDoing");
  setChecked("cb-doing-exercises", ex.status === "doing");
  setText("exercises-list", ex.status === "doing" ? ex.exercisesList : "");
}

function renderOtherInformation(data) {
  setText("other-information", data.otherInformation);
}

function renderCertification(data) {
  setChecked("cb-certification", !!data.certificationAcknowledged);
  setChecked("cb-privacy", !!data.privacyAcknowledged);
}

// ------------------------------ orchestrator --------------------------------

/** Render the entire 3-page report from a given dataset object. */
function renderReport(data) {
  renderHeader(data);
  renderFooters(data);
  renderReturnToWork(data);
  renderRecovery(data);
  renderPainScale(data.painScale.value);
  renderMedicalTreatment(data);
  renderMedication(data);
  renderHomeExercises(data);
  renderOtherInformation(data);
  renderCertification(data);
}

/** Swap the active dataset (used by the demo toolbar buttons). */
function loadReport(dataset) {
  ACTIVE_REPORT = dataset;
  renderReport(ACTIVE_REPORT);
}

// ------------------------------- wire up UI ----------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderReport(ACTIVE_REPORT);

  document.getElementById("btn-a").addEventListener("click", () => loadReport(SAMPLE_A));
  document.getElementById("btn-b").addEventListener("click", () => loadReport(SAMPLE_B));
  document.getElementById("btn-empty").addEventListener("click", () => loadReport(SAMPLE_EMPTY));
  document.getElementById("btn-print").addEventListener("click", () => window.print());
});
