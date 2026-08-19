/**
 * data.js
 * ---------------------------------------------------------------------------
 * Single source of truth for all dynamic content rendered on the
 * Medical & Travel Expense Request page.
 *
 * Nothing in index.html is hardcoded — every table row, header value,
 * and footer value is pulled from the objects below by script.js.
 *
 * Three full sample datasets are provided:
 *   - SAMPLE_A     : matches the reference PDF exactly (1 row per section)
 *   - SAMPLE_B     : many rows in every section — stress-tests table
 *                    rendering, pagination, and print page breaks
 *   - SAMPLE_EMPTY : every table has 0 rows
 *
 * Switch datasets at runtime with the "Sample A / Sample B / Empty"
 * buttons in the demo toolbar, or by changing ACTIVE_DATASET below.
 * ---------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// SAMPLE A — matches the reference PDF
// -----------------------------------------------------------------------
const SAMPLE_A = {
  meta: {
    claimNo: "20042047",
    workerName: "Madeleine Willson",
    workerAppId: "712041",
    submitted: "March 28, 2024 20:43",
  },

  prescriptionDrugs: [
    {
      drugName: "Naproxen",
      prescriptionDate: "February 28, 2024",
      datePurchased: "February 29, 2024",
      providerName: "Dr. Best",
      paidAmount: "$20.00",
    },
  ],

  otcDrugs: [
    {
      drugName: "Advil",
      datePurchased: "March 28, 2024",
      paidAmount: "$8.00",
      sellerName: "Shoppers Drug Mart",
      reason: "Pain",
    },
  ],

  medicalSupplies: [
    {
      itemPurchased: "Tensor",
      datePurchased: "February 28, 2024",
      wasPrescribed: true,
      providerName: "Dr. Best",
      paidAmount: "$10.00",
      sellerName: "Shoppers DrugMart",
    },
  ],

  parking: [
    {
      providerAddress: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada",
      date: "March 28, 2024",
      paidAmount: "$10.00",
      meterUsed: true,
      meterNumber: "12245",
    },
  ],

  mileage: [
    {
      appointmentDate: "March 28, 2024",
      providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada",
      workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
      km: "20 km",
    },
  ],

  fares: [
    {
      appointmentDate: "March 28, 2024",
      startingAddress: "",
      providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
      type: "Bus",
      totalFare: "$3.00",
    },
    {
      appointmentDate: "March 27, 2024",
      startingAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada",
      providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada",
      type: "Taxi",
      totalFare: "$15.00",
    },
  ],

  privacyAcknowledged: true,
};

// -----------------------------------------------------------------------
// SAMPLE B — many rows in every section
// -----------------------------------------------------------------------
const SAMPLE_B = {
  meta: {
    claimNo: "20099981",
    workerName: "Jordan A. Reyes",
    workerAppId: "845213",
    submitted: "July 14, 2024 09:12",
  },

  prescriptionDrugs: [
    { drugName: "Naproxen", prescriptionDate: "Jan 3, 2024", datePurchased: "Jan 4, 2024", providerName: "Dr. Best", paidAmount: "$20.00" },
    { drugName: "Cyclobenzaprine", prescriptionDate: "Jan 10, 2024", datePurchased: "Jan 11, 2024", providerName: "Dr. Best", paidAmount: "$34.50" },
    { drugName: "Gabapentin", prescriptionDate: "Jan 20, 2024", datePurchased: "Jan 21, 2024", providerName: "Dr. Osei", paidAmount: "$41.25" },
    { drugName: "Amoxicillin", prescriptionDate: "Feb 2, 2024", datePurchased: "Feb 2, 2024", providerName: "Dr. Osei", paidAmount: "$18.00" },
    { drugName: "Diclofenac Gel", prescriptionDate: "Feb 15, 2024", datePurchased: "Feb 16, 2024", providerName: "Dr. Best", paidAmount: "$27.75" },
    { drugName: "Tramadol", prescriptionDate: "Mar 1, 2024", datePurchased: "Mar 2, 2024", providerName: "Dr. Chan", paidAmount: "$52.00" },
  ],

  otcDrugs: [
    { drugName: "Advil", datePurchased: "Jan 5, 2024", paidAmount: "$8.00", sellerName: "Shoppers Drug Mart", reason: "Pain" },
    { drugName: "Tylenol", datePurchased: "Jan 18, 2024", paidAmount: "$9.50", sellerName: "Shoppers Drug Mart", reason: "Headache" },
    { drugName: "Robaxacet", datePurchased: "Feb 8, 2024", paidAmount: "$12.00", sellerName: "Rexall", reason: "Muscle spasm" },
    { drugName: "Polysporin", datePurchased: "Feb 22, 2024", paidAmount: "$11.25", sellerName: "Shoppers Drug Mart", reason: "Wound care" },
    { drugName: "Epsom Salt", datePurchased: "Mar 5, 2024", paidAmount: "$6.00", sellerName: "Walmart", reason: "Soaking / swelling" },
  ],

  medicalSupplies: [
    { itemPurchased: "Tensor Bandage", datePurchased: "Jan 4, 2024", wasPrescribed: true, providerName: "Dr. Best", paidAmount: "$10.00", sellerName: "Shoppers DrugMart" },
    { itemPurchased: "Wrist Brace", datePurchased: "Jan 12, 2024", wasPrescribed: true, providerName: "Dr. Best", paidAmount: "$32.00", sellerName: "Rexall" },
    { itemPurchased: "Ice Pack", datePurchased: "Jan 25, 2024", wasPrescribed: false, providerName: "", paidAmount: "$15.00", sellerName: "Walmart" },
    { itemPurchased: "Lumbar Support", datePurchased: "Feb 10, 2024", wasPrescribed: true, providerName: "Dr. Osei", paidAmount: "$58.00", sellerName: "Shoppers DrugMart" },
    { itemPurchased: "Crutches (pair)", datePurchased: "Feb 28, 2024", wasPrescribed: true, providerName: "Dr. Chan", paidAmount: "$45.00", sellerName: "Medical Supply Co." },
  ],

  parking: [
    { providerAddress: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada", date: "Jan 4, 2024", paidAmount: "$10.00", meterUsed: true, meterNumber: "12245" },
    { providerAddress: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", date: "Jan 18, 2024", paidAmount: "$8.50", meterUsed: true, meterNumber: "88213" },
    { providerAddress: "665 William Ave, Winnipeg MB R3E 0Z2, Canada", date: "Feb 8, 2024", paidAmount: "$0.00", meterUsed: false, meterNumber: "" },
    { providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", date: "Mar 1, 2024", paidAmount: "$12.00", meterUsed: true, meterNumber: "40021" },
  ],

  mileage: [
    { appointmentDate: "Jan 4, 2024", providerAddress: "HSC, 820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: "20 km" },
    { appointmentDate: "Jan 18, 2024", providerAddress: "665 William Ave, Winnipeg MB R3E 0Z2, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: "16 km" },
    { appointmentDate: "Feb 8, 2024", providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada", km: "22 km" },
  ],

  fares: [
    { appointmentDate: "Jan 4, 2024", startingAddress: "", providerAddress: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada", type: "Bus", totalFare: "$3.00" },
    { appointmentDate: "Jan 18, 2024", startingAddress: "25 Furby St, Winnipeg MB R3C2A2, Canada", providerAddress: "440 Edmonton St, Winnipeg MB R3B 2M4, Canada", type: "Taxi", totalFare: "$15.00" },
    { appointmentDate: "Feb 8, 2024", startingAddress: "", providerAddress: "820 Sherbrook St, Winnipeg MB R3A 1R9, Canada", type: "Bus", totalFare: "$3.00" },
    { appointmentDate: "Mar 1, 2024", startingAddress: "", providerAddress: "333 St Mary Ave, Winnipeg MB R3C4A5, Canada", type: "Bus", totalFare: "$3.50" },
  ],

  privacyAcknowledged: true,
};

// -----------------------------------------------------------------------
// SAMPLE EMPTY — verifies "0 rows" behaviour for every table
// -----------------------------------------------------------------------
const SAMPLE_EMPTY = {
  meta: {
    claimNo: "00000000",
    workerName: "Sample Worker",
    workerAppId: "000000",
    submitted: "—",
  },
  prescriptionDrugs: [],
  otcDrugs: [],
  medicalSupplies: [],
  parking: [],
  mileage: [],
  fares: [],
  privacyAcknowledged: false,
};

// The dataset actually rendered on page load. script.js reads this object;
// the demo toolbar in index.html can swap it at runtime via loadDataset().
let ACTIVE_DATASET = SAMPLE_A;
