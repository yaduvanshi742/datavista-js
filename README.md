# DataVista JS

<div align="center">

**A local-first JavaScript data explorer for importing, cleaning, analyzing, visualizing, and exporting CSV/JSON datasets directly in the browser.**

DataVista JS helps users turn raw CSV and JSON files into searchable tables, useful insights, and simple visual dashboards without needing a backend, account, or database server.

</div>

---

## About the Project

DataVista JS is a browser-based data explorer built with vanilla JavaScript.

The project is designed for working with small to medium CSV and JSON datasets directly inside the browser. Users can import data files, preview records in a table, search through rows, sort columns, check dataset quality, generate basic insights, build charts, and export cleaned data.

It is a local-first app, which means the data is handled inside the browser and stored locally using IndexedDB. There is no login system, no backend API, and no cloud upload required.

This project is useful for quick data inspection, simple analysis, learning data handling in JavaScript, and building dashboard-style frontend applications.

---

## What DataVista JS Can Do

DataVista JS gives users a clean workspace for exploring datasets.

Main things you can do with it:

- Import CSV files
- Import JSON files
- Preview datasets in a table
- Search records
- Sort table columns
- Detect missing values
- Detect duplicate rows
- View dataset statistics
- Generate basic numeric insights
- Create simple charts
- Export data as CSV
- Export data as JSON
- Save datasets locally in the browser
- Export and import workspace backups
- Use the app offline after loading it once
- Switch between light and dark mode

---

## Features

### CSV and JSON Import

DataVista JS supports importing structured data from CSV and JSON files.

The import flow reads the selected file in the browser, parses the content, and prepares it for table preview, filtering, insights, and chart generation.

Supported input types:

- `.csv`
- `.json`

---

### Dataset Preview

Imported data is displayed in a clean table layout.

The preview table helps users quickly understand the shape of a dataset, including columns, rows, values, and empty fields.

Table features include:

- Dynamic columns
- Row preview
- Search support
- Sortable columns
- Clean empty-state handling
- Responsive layout for smaller screens

---

### Search and Sorting

Users can search across dataset records and sort table columns.

This makes it easier to inspect rows, find specific values, and understand the dataset without opening spreadsheet software.

Search can be used for:

- Names
- Categories
- IDs
- Text values
- Numeric values
- Any visible table content

---

### Dataset Insights

DataVista JS includes basic insight tools to help users understand their data faster.

Insights include:

- Total rows
- Total columns
- Missing value count
- Duplicate row count
- Numeric column detection
- Basic numeric summaries
- Dataset quality overview

These insights are useful for checking whether a dataset is clean enough to use.

---

### Missing Value Detection

The app can scan imported datasets and detect empty or missing values.

This helps users quickly find data quality problems before exporting or analyzing the dataset further.

Examples of missing values:

- Empty cells
- Blank strings
- Null values
- Undefined fields

---

### Duplicate Row Detection

DataVista JS can detect duplicate records inside a dataset.

This is useful when working with exported files, repeated entries, copied records, or messy data from different sources.

---

### Chart Builder

The app includes a simple chart builder for visualizing dataset values.

Supported chart types:

- Bar chart
- Line chart
- Pie chart

Charts are designed for quick visual understanding, not heavy business intelligence work.

---

### Export Tools

Users can export the active dataset after inspection or cleaning.

Supported export formats:

- CSV
- JSON

The export tools make it easy to reuse the processed data in another tool or save a cleaned copy locally.

---

### Workspace Backup

DataVista JS supports full workspace backup and restore.

Users can export saved datasets and workspace data as a backup file, then import it later if needed.

This is useful before clearing browser storage or moving work to another browser.

---

### Local-First Storage

The app stores data locally using IndexedDB.

This means:

- No account is required
- No server is required
- No cloud database is required
- Data stays inside the browser
- The app can work offline after caching
- Users stay in control of their workspace

---

### PWA and Offline Support

DataVista JS includes Progressive Web App support.

The project includes:

- `manifest.json`
- `service-worker.js`
- Offline asset caching
- Static deployment support

After the app is opened once, supported browsers can cache the main files and allow the app to load offline.

---

### Theme Support

The app includes light and dark mode support.

The selected theme is saved locally so the user does not need to change it every time.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | App structure |
| CSS3 | Styling, layout, and responsiveness |
| JavaScript | App logic and user interactions |
| IndexedDB | Local dataset and workspace storage |
| FileReader API | Reading CSV and JSON files in the browser |
| Canvas/SVG/UI logic | Rendering simple charts |
| Service Worker | Offline support |
| Web App Manifest | PWA support |

---

## Project Structure

```text
datavista-js/
├── index.html
├── package.json
├── manifest.json
├── service-worker.js
├── README.md
├── .gitignore
├── public/
│   └── icons/
├── src/
│   ├── app/
│   ├── config/
│   ├── core/
│   ├── data/
│   ├── features/
│   │   ├── charts/
│   │   ├── dashboard/
│   │   ├── datasets/
│   │   ├── export/
│   │   ├── import/
│   │   ├── insights/
│   │   └── settings/
│   ├── styles/
│   ├── ui/
│   └── utils/
├── docs/
├── scripts/
└── tests/
```

---

## Folder Guide

| Folder | Description |
|---|---|
| `src/app` | App startup and main application setup |
| `src/config` | App constants and configuration values |
| `src/core` | Shared app logic, state handling, and core helpers |
| `src/data` | IndexedDB setup and local data access |
| `src/features/charts` | Chart rendering and chart-related logic |
| `src/features/dashboard` | Dashboard cards, summaries, and workspace overview |
| `src/features/datasets` | Dataset handling and table rendering |
| `src/features/export` | CSV, JSON, and backup export tools |
| `src/features/import` | CSV and JSON import logic |
| `src/features/insights` | Missing values, duplicates, and statistics |
| `src/features/settings` | Theme and workspace settings |
| `src/styles` | CSS files for layout, components, views, and responsive design |
| `src/ui` | Reusable UI helpers and components |
| `src/utils` | Utility functions used across the project |
| `docs` | Additional project documentation |
| `scripts` | Development and checking scripts |
| `tests` | Test files for utilities and app logic |

---

## Getting Started

DataVista JS is a frontend-only project. You do not need a backend or database server.

### Clone the Repository

```bash
git clone https://github.com/yaduvanshi742/datavista-js.git
cd datavista-js
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local server URL in your browser.

You can also open `index.html` directly, but using a local server is better for service worker and browser module behavior.

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the project locally.

### Check JavaScript Files

```bash
npm run check
```

Checks JavaScript files for syntax errors.

### Run Tests

```bash
npm test
```

Runs the included test files.

---

## How to Use

### 1. Import a Dataset

Choose a CSV or JSON file from your device.

DataVista JS will read the file, parse the data, and prepare it for preview.

---

### 2. Preview the Data

After import, the dataset appears in a table.

You can inspect rows, check columns, and understand the dataset structure.

---

### 3. Search and Sort

Use search to find specific values.

Click columns or use sorting controls to organize records.

---

### 4. Review Insights

Open the insights/dashboard section to check:

- Number of rows
- Number of columns
- Missing values
- Duplicate rows
- Numeric columns
- Dataset quality summary

---

### 5. Create Charts

Use the chart builder to visualize selected fields.

Choose a chart type, select the needed columns, and generate a quick visual summary.

---

### 6. Export Data

Export the active dataset as CSV or JSON.

This is useful after checking, filtering, or cleaning the data.

---

### 7. Backup Workspace

Use workspace backup to save local project data.

You can import the backup later to restore your saved datasets.

---

## Data Storage

DataVista JS uses IndexedDB to save workspace data inside the browser.

Stored data may include:

- Imported datasets
- Dataset metadata
- Table state
- App settings
- Backup data
- Theme preference

Data is not uploaded to any server by the app.

---

## Important Storage Note

Because this is a local-first browser app, the data is stored in the browser where the app is used.

Clearing browser data, resetting site storage, or using cleanup tools may remove saved datasets.

For safety, export backups regularly if the data is important.

---

## Deployment

DataVista JS is a static frontend project and can be deployed easily.

Good deployment options:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Firebase Hosting

---

## Deploy on GitHub Pages

1. Push the project files to GitHub.
2. Open the repository.
3. Go to **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose the `main` branch.
7. Select the root folder.
8. Save the settings.

The live site will be available at:

```text
https://yaduvanshi742.github.io/datavista-js/
```

---

## Best Use Cases

DataVista JS is useful for:

- Quickly checking CSV files
- Previewing JSON datasets
- Exploring small datasets
- Learning data handling in JavaScript
- Building frontend dashboard skills
- Practicing chart and table logic
- Cleaning simple data before export
- Creating a local-first browser data tool

---

## Browser Support

DataVista JS works best in modern browsers that support IndexedDB, FileReader, service workers, JavaScript modules, and modern CSS.

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Firefox
- Brave
- Safari

---

## Limitations

DataVista JS is designed for browser-based dataset exploration, so it has some natural limits.

- Very large datasets may depend on browser memory
- It does not replace full spreadsheet software
- It does not include cloud sync
- It does not upload data to a server
- Advanced cleaning features are limited
- Browser storage can be cleared by the user or browser settings

These limits keep the project lightweight, private, and easy to deploy.

---

## Future Improvements

Planned or possible future improvements:

- Drag and drop file import
- More chart types
- Advanced filtering
- Column rename tools
- Remove duplicate rows
- Fill missing values
- Dataset merge tools
- Export chart images
- Dashboard layout builder
- Saved chart cards
- Advanced search operators
- PDF report export
- More test coverage
- Better mobile table experience

---

## Author

**Yadhuvanshi**

JavaScript Developer building useful, practical, and local-first web projects.

GitHub: [@yaduvanshi742](https://github.com/yaduvanshi742)

---

## Final Note

DataVista JS is built to make data exploration simple inside the browser. It combines file import, table preview, search, sorting, insights, charts, export tools, local storage, and offline support into one clean JavaScript project.
