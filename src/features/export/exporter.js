import { toCsv } from '../../utils/csv.js';
import { downloadFile } from '../../utils/download.js';

export function exportDatasetCsv(dataset) {
  if (!dataset) return;
  downloadFile(`${slugify(dataset.name)}.csv`, toCsv(dataset.rows), 'text/csv');
}

export function exportDatasetJson(dataset) {
  if (!dataset) return;
  downloadFile(`${slugify(dataset.name)}.json`, JSON.stringify(dataset.rows, null, 2), 'application/json');
}

export function exportWorkspace(datasets) {
  downloadFile('datavista-workspace.json', JSON.stringify({ exportedAt: new Date().toISOString(), datasets }, null, 2));
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'dataset';
}
