import { createId } from '../../utils/id.js';

export function createDataset({ name, description, type, rows, fileName, fileSize }) {
  const columns = getColumns(rows);
  return {
    id: createId('dataset'),
    name: name.trim(),
    description: description.trim(),
    type,
    fileName,
    fileSize,
    rowCount: rows.length,
    columnCount: columns.length,
    columns,
    rows,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function getColumns(rows) {
  const columns = new Set();
  rows.forEach((row) => Object.keys(row).forEach((key) => columns.add(key)));
  return Array.from(columns);
}

export function getFilteredRows(dataset, searchTerm = '') {
  if (!dataset) return [];
  const term = searchTerm.trim().toLowerCase();
  if (!term) return [...dataset.rows];

  return dataset.rows.filter((row) => Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(term)));
}

export function sortRows(rows, column, direction = 'asc') {
  if (!column) return rows;
  const modifier = direction === 'asc' ? 1 : -1;

  return [...rows].sort((a, b) => {
    const left = a[column];
    const right = b[column];

    if (typeof left === 'number' && typeof right === 'number') {
      return (left - right) * modifier;
    }

    return String(left ?? '').localeCompare(String(right ?? '')) * modifier;
  });
}
