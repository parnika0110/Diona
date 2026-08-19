# Worker Progress Report

A static, dependency-free recreation of the WCB "Worker Progress Report"
form, built with plain HTML/CSS/JavaScript across a 3-page layout.

## Project structure

```
worker-progress-report/
├── index.html   # Semantic markup for 3 pages; all values start empty
├── style.css    # Visual styling, responsive rules, print rules (page breaks)
├── script.js    # Rendering logic — reads data.js, writes the DOM
├── data.js      # All content: sample datasets + the "active" dataset
├── assets/
│   └── logo.png # Placeholder logo
└── README.md
```

## How it works

`index.html` is split into three `<main class="page">` blocks (mirroring
the 3-page PDF: Return to Work / Recovery — Pain Scale / Treatment /
Medication / Exercises — Certification). Every checkbox starts
unchecked and disabled (read-only report, not a live input form), and
every text field is an empty `<span>` or `<p>`.

On `DOMContentLoaded`, `script.js` reads `ACTIVE_REPORT` from `data.js`
and calls `renderReport(data)`, which:

1. Fills header/footer fields on all three pages at once (`setText` can
   target either a single `id` or every element sharing a class, which
   is how the repeated footer — `Worker App ID`, `Submitted`, page
   number — is kept in sync across pages).
2. Sets checkbox state for every "select one" group from a single
   `status` string in `data.js` (e.g. `returnToWork.status` is one of
   `"notMissedTime" | "notReturned" | "returnedOn"`), so exactly one
   checkbox in each group is ever checked, driven entirely by data.
3. Builds the 1–10 pain scale from scratch (`renderPainScale`) — ten
   `<div>` cells are generated in a loop, and the one matching
   `painScale.value` gets a `selected` class. If the value is `null`,
   no cell is marked, correctly modeling "not answered."
4. Fills every free-text comment box (`How is it going`, `Concerns`,
   `Recovery comments`, `Other information`, etc.) from plain strings.

## Dynamic fields

Everything below is driven from `data.js`:

- Claim number, form tag, worker name, Worker App ID, submitted timestamp
- Return-to-work status (radio-style, 3 options) + returned-on date
- Working arrangement (radio-style, 5 options incl. "Other" + free text)
- "How is your return to work going" freeform comment
- Expected return date, concerns, last contact name/date
- Recovery status (radio-style, 2 options) + recovery comments
- Pain scale (1–10, or unanswered)
- Medical treatment status, provider type, last/next treatment
  date+provider, chiro/physio flag + frequency
- Medication status + medication name
- Home exercises status + exercise list
- Other information (freeform)
- Certification and privacy-notice checkbox states

A demo toolbar (hidden when printing) swaps between three datasets:

- **Sample A (small)** — mirrors the reference document
- **Sample B (large)** — every optional field populated, to confirm
  layout and print pagination hold up with maximum content
- **Empty** — every status is unset and every text field blank, to
  confirm the "nothing answered" state renders cleanly (no stray
  checkmarks, no empty-looking bold text)

## Assumptions made

- All checkboxes are rendered `disabled` — this recreates a **submitted,
  read-only** report (as the source PDF is), not a form a user is
  actively filling in. State is 100% controlled by `data.js`.
- Each "select one" group is backed by a single `status` string rather
  than one boolean per option, guaranteeing only one option can ever be
  marked — matching the mutually-exclusive intent of the original
  checkboxes even though the PDF itself doesn't enforce that
  programmatically.
- The pain scale is treated as a single optional integer (1–10 or
  unanswered) rather than a set of independent booleans.
- Page breaks are modeled as three separate `<main class="page">`
  containers rather than one long scrolling document, so the on-screen
  and printed layouts both clearly show "Page X of 3."
- The certification paragraph is static boilerplate text (not
  claim-specific data) and lives directly in `index.html`; only the
  associated checkbox states come from `data.js`.
- `assets/logo.svg` is the official WCB of Manitoba logo as supplied,
  scaled to a fixed display width (`.logo { width: 180px }`) since its
  native proportions are wide (~2.8:1) rather than square.

## How to run

No build step or server is required.

1. Open `worker-progress-report/index.html` directly in a browser, **or**
2. Serve the folder with any static file server, e.g.:
   ```bash
   cd worker-progress-report
   python3 -m http.server 8080
   ```
   then visit `http://localhost:8080`.

Use the toolbar to switch sample datasets, or click **Print / Save PDF**
to preview the print layout — each `.page` forces a page break so the
printed output lines up 1:1 with the on-screen 3-page structure.
