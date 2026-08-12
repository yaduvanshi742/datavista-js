# Architecture

DataVista JS uses a modular frontend structure. The app is built with standard browser APIs and does not require a backend.

## Main layers

- `src/app` starts the application and connects features together.
- `src/core` stores shared state and routing logic.
- `src/data` manages IndexedDB access and repositories.
- `src/features` contains business features such as import, datasets, charts, insights, export, and settings.
- `src/ui` contains reusable interface helpers.
- `src/utils` contains pure helper functions for CSV parsing, formatting, downloads, and DOM helpers.

## Data flow

1. A user imports a CSV or JSON file.
2. The import feature reads and parses the file.
3. A dataset object is created with metadata and rows.
4. The repository saves it into IndexedDB.
5. Views read shared state and render the dashboard, table, charts, and insights.

## Storage

IndexedDB stores datasets and settings locally in the browser. The app does not upload files or data to any server.
