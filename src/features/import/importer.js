import { parseCsv } from '../../utils/csv.js';
import { parseJsonDataset } from '../../utils/json.js';

export async function readFileAsDataset(file) {
  const text = await file.text();
  const extension = file.name.split('.').pop()?.toLowerCase();
  const isJson = file.type.includes('json') || extension === 'json';
  const rows = isJson ? parseJsonDataset(text) : parseCsv(text);

  if (!rows.length) {
    throw new Error('The selected file does not contain readable rows.');
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    type: isJson ? 'json' : 'csv',
    rows
  };
}
