# Medical & Travel Expense Request

A static, dependency-free recreation of the WCB "Medical & Travel Expense
Request" form, built with plain HTML/CSS/JavaScript, matching the
reference PDF's layout, typography, and 2-page pagination.

## Project structure

```
medical-expense-request/
├── index.html   # Two explicit <main class="page"> blocks (page 1 / page 2)
├── style.css    # Header layout, typography scale, table borders, print rules
├── script.js    # Rendering logic — reads data.js, writes the DOM
├── data.js      # All content: SAMPLE_A / SAMPLE_B / SAMPLE_EMPTY + active dataset
├── assets/
│   └── logo.svg # Official WCB of Manitoba logo
└── README.md
```

## How it works

`index.html` contains only structural markup — the header, section
headings, table column headers, and empty `<tbody>` elements — split
across two `<main class="page">` containers that mirror the reference
PDF's actual page break:

- **Page 1** — header, intro line, Prescription Drugs, Over-the-Counter
  Drugs, Bandages/Braces/Medical Supplies, Parking, and Mileage.
- **Page 2** — Bus or Taxi Fare, the Privacy Notice acknowledgement, and
  a footer pinned to the bottom of the sheet (matching the large
  trailing whitespace under the checkbox in the PDF).

On `DOMContentLoaded`, `script.js` reads a dataset object from `data.js`
(`ACTIVE_DATASET`) and calls `renderDocument(data)`, which:

1. Fills in header/footer fields (claim number, worker name, app ID,
   submitted date) — footer fields are set with `setTextAll()`, since
   the same Worker App ID / Submitted / Page values repeat identically
   on both pages.
2. Calls one render function per section (`renderPrescriptionDrugs`,
   `renderOtcDrugs`, `renderMedicalSupplies`, `renderParking`,
   `renderMileage`, `renderFares`).
3. Each render function delegates to a single generic helper,
   `renderTable(tbody, rows, columns, emptyColSpan)`, which:
   - renders a "No records submitted for this section." row when the
     array is empty (0-row case),
   - otherwise builds one `<tr>` per row object, one `<td>` per column
     function you pass in — the same code path handles 1 row or many.

Because every section reuses `renderTable`, adding a new section only
means adding a new array in `data.js`, a `<table>` skeleton in HTML, and
a 2–3 line wrapper function.

## Matching the PDF visually

- **Header** — a tight 3-column grid (logo far left → address
  center-left → title + claim box on the right), a single bottom
  border, and minimal padding, so it reads as one compact header band
  rather than a tall banner.
- **Typography** — section headings (`h2`) are bold and a full step
  larger than body/table text; the claim box uses the same bold, boxed
  proportions as the PDF; body copy sits at a smaller, denser size to
  match the PDF's information density.
- **Tables** — uniform 1px solid dark borders on every cell (header and
  body alike), tables span 100% of the content width, and every
  data-driven cell (never the labels) is colored blue via `td.value`,
  matching the PDF's blue "filled-in" values exactly.
- **Spacing** — section margins were tightened throughout so the
  vertical rhythm between sections matches the PDF instead of leaving
  large gaps.

## Dynamic fields

Everything below is driven from `data.js`, never hardcoded in HTML:

- Claim number, worker name, Worker App ID, submitted timestamp
- Prescription Drugs table rows
- Over-the-Counter Drugs table rows
- Bandages/Braces/Medical Supplies table rows (including the "Was this
  Prescribed?" Yes/No formatting)
- Parking table rows (including "Meter Used?" Yes/No formatting)
- Mileage table rows
- Bus/Taxi Fare table rows
- Privacy-notice acknowledgement checkbox state

A demo toolbar (hidden when printing) lets you swap between three
datasets at runtime without touching code:

- **Sample A** — matches the reference PDF exactly (1 row per section)
- **Sample B** — many rows in every section, used to confirm table
  rendering and print pagination hold up under load
- **Empty** — every table has 0 rows, to confirm the empty-state message
  renders correctly

## Page break / print behaviour

- Each `.page` forces a print page break (`break-after: page`), so the
  on-screen layout and the printed output always split at the same
  point: page 1 ends after Mileage, page 2 starts at Bus or Taxi Fare —
  exactly like the source PDF.
- The Mileage section carries a `.keep-together` class
  (`break-inside: avoid`) so its heading, note, and table are never
  split across a page boundary.
- Table headers repeat automatically on every printed page
  (`thead { display: table-header-group }`), and individual table rows
  avoid splitting where the browser supports it.
- `@page { size: A4; margin: 15mm 16mm }` sizes the printed output to a
  real A4 sheet with margins matching the reference document.

## Assumptions made

- The source document's checkbox/underline fields ("Meter Used?", "Was
  this Prescribed?") are rendered as plain Yes/No table cells rather than
  interactive checkboxes, since in the original PDF they are answers
  already filled in per row, not standalone form controls.
- The single "I understand that the Privacy Notice applies…" checkbox at
  the bottom is rendered as a disabled checkbox whose checked state is
  driven by `data.js` (`privacyAcknowledged`), reflecting a submitted,
  read-only report rather than a live form.
- The organization's mailing address/phone block is treated as static
  boilerplate (not claim-specific data) and lives directly in `index.html`.
- Currency values are stored as pre-formatted strings (e.g. `"$20.00"`)
  in `data.js` rather than raw numbers, since the source document only
  displays formatted totals with no arithmetic across rows.
- The page break between page 1 and page 2 is fixed at "after Mileage,
  before Bus/Taxi Fare" to match the reference PDF, rather than being
  computed dynamically from content height — this mirrors how the
  source PDF itself paginates.
- `assets/logo.svg` is the official WCB of Manitoba logo as supplied,
  scaled to a fixed display width (`.logo { width: 168px }`) to match
  its position and proportions in the reference header.

## How to run

No build step or server is required.

1. Open `medical-expense-request/index.html` directly in a browser, **or**
2. Serve the folder with any static file server, e.g.:
   ```bash
   cd medical-expense-request
   python3 -m http.server 8080
   ```
   then visit `http://localhost:8080`.

Use the toolbar at the top of the page to switch sample datasets, or
click **Print / Save PDF** to see the print-specific layout: two A4
pages, table headers repeating per page, and content splitting at the
same point as the reference document.
