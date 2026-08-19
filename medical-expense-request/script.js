/**
 * script.js
 * ---------------------------------------------------------------------------
 * All DOM rendering for the Medical & Travel Expense Request page.
 * Reads from the dataset objects defined in data.js and writes markup
 * into the static section containers defined in index.html.
 *
 * Reusable helpers:
 *   - el(tag, className, text)     -> create a DOM element quickly
 *   - renderTable(tbodyEl, rows, columns, emptyColSpan) -> generic table renderer
 *   - yesNo(bool)                  -> "Yes" / "No" formatter
 *   - setTextAll(selector, text)   -> set textContent on every match
 *     (used for footer fields, which repeat identically on page 1 and 2)
 * ---------------------------------------------------------------------------
 */

// ------------------------------- helpers -----------------------------------

/** Create an element with an optional class and text content. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

/** Format a boolean as Yes/No; passes through strings unchanged. */
function yesNo(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value || "";
}

/** Set textContent on every element matching a CSS selector. */
function setTextAll(selector, text) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text || "";
  });
}

/**
 * Generic table body renderer. Handles 0 rows, 1 row, and many rows from
 * the same code path — nothing here changes based on row count except
 * which branch runs.
 *
 * @param {HTMLTableSectionElement} tbody   target <tbody>
 * @param {Array<Object>} rows              array of row data objects
 * @param {Array<Function>} columns         array of functions (row) => cell text
 * @param {number} emptyColSpan             colspan to use for the "no records" row
 */
function renderTable(tbody, rows, columns, emptyColSpan) {
  tbody.innerHTML = "";

  if (!rows || rows.length === 0) {
    const tr = el("tr", "empty-row");
    const td = el("td", "", "No records submitted for this section.");
    td.colSpan = emptyColSpan;
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((getValue) => {
      const td = el("td", "value", getValue(row));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// ---------------------------- section renderers -----------------------------

function renderPrescriptionDrugs(data) {
  const tbody = document.querySelector("#table-prescription tbody");
  renderTable(
    tbody,
    data.prescriptionDrugs,
    [
      (r) => r.drugName,
      (r) => r.prescriptionDate,
      (r) => r.datePurchased,
      (r) => r.providerName,
      (r) => r.paidAmount,
    ],
    5
  );
}

function renderOtcDrugs(data) {
  const tbody = document.querySelector("#table-otc tbody");
  renderTable(
    tbody,
    data.otcDrugs,
    [
      (r) => r.drugName,
      (r) => r.datePurchased,
      (r) => r.paidAmount,
      (r) => r.sellerName,
      (r) => r.reason,
    ],
    5
  );
}

function renderMedicalSupplies(data) {
  const tbody = document.querySelector("#table-supplies tbody");
  renderTable(
    tbody,
    data.medicalSupplies,
    [
      (r) => r.itemPurchased,
      (r) => r.datePurchased,
      (r) => yesNo(r.wasPrescribed),
      (r) => r.providerName,
      (r) => r.paidAmount,
      (r) => r.sellerName,
    ],
    6
  );
}

function renderParking(data) {
  const tbody = document.querySelector("#table-parking tbody");
  renderTable(
    tbody,
    data.parking,
    [
      (r) => r.providerAddress,
      (r) => r.date,
      (r) => r.paidAmount,
      (r) => yesNo(r.meterUsed),
      (r) => r.meterNumber,
    ],
    5
  );
}

function renderMileage(data) {
  const tbody = document.querySelector("#table-mileage tbody");
  renderTable(
    tbody,
    data.mileage,
    [
      (r) => r.appointmentDate,
      (r) => r.providerAddress,
      (r) => r.workplaceAddress,
      (r) => r.km,
    ],
    4
  );
}

function renderFares(data) {
  const tbody = document.querySelector("#table-fares tbody");
  renderTable(
    tbody,
    data.fares,
    [
      (r) => r.appointmentDate,
      (r) => r.startingAddress,
      (r) => r.providerAddress,
      (r) => r.type,
      (r) => r.totalFare,
    ],
    5
  );
}

function renderHeaderAndFooter(data) {
  document.getElementById("claim-no").textContent = data.meta.claimNo;
  document.getElementById("worker-name").textContent = data.meta.workerName;

  // Footer fields repeat identically on page 1 and page 2, so they're
  // targeted by class rather than id and set on every match at once.
  setTextAll(".footer-app-id .value", data.meta.workerAppId);
  setTextAll(".footer-submitted .value", data.meta.submitted);
  setTextAll(".footer-page-total", "2");

  const checkbox = document.getElementById("privacy-checkbox");
  checkbox.checked = !!data.privacyAcknowledged;
}

// ------------------------------ orchestrator --------------------------------

/**
 * Render the entire document from a given dataset object.
 * Called once on load, and again whenever the demo toolbar swaps datasets.
 */
function renderDocument(data) {
  renderHeaderAndFooter(data);
  renderPrescriptionDrugs(data);
  renderOtcDrugs(data);
  renderMedicalSupplies(data);
  renderParking(data);
  renderMileage(data);
  renderFares(data);
}

/** Swap the active dataset (used by the demo toolbar buttons). */
function loadDataset(dataset, buttonId) {
  ACTIVE_DATASET = dataset;
  renderDocument(ACTIVE_DATASET);

  // Reflect which sample is active in the toolbar UI
  document.querySelectorAll(".demo-toolbar button[id^='btn-']").forEach((btn) => {
    btn.classList.toggle("active", btn.id === buttonId);
  });
}

// ------------------------------- wire up UI ----------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderDocument(ACTIVE_DATASET);

  document.getElementById("btn-a").addEventListener("click", () => loadDataset(SAMPLE_A, "btn-a"));
  document.getElementById("btn-b").addEventListener("click", () => loadDataset(SAMPLE_B, "btn-b"));
  document.getElementById("btn-empty").addEventListener("click", () => loadDataset(SAMPLE_EMPTY, "btn-empty"));
  document.getElementById("btn-print").addEventListener("click", () => window.print());
});
