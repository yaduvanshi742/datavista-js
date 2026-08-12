export function buildInsights(dataset) {
  if (!dataset) return null;

  const columns = dataset.columns;
  const rows = dataset.rows;
  const numericColumns = columns.filter((column) => rows.some((row) => typeof row[column] === 'number'));
  const missingValues = columns.map((column) => ({
    column,
    missing: rows.filter((row) => row[column] === '' || row[column] === null || row[column] === undefined).length
  }));

  const duplicateRows = countDuplicateRows(rows);
  const numericStats = numericColumns.map((column) => getNumericStats(column, rows));

  return {
    rowCount: rows.length,
    columnCount: columns.length,
    numericColumns,
    missingValues,
    duplicateRows,
    numericStats
  };
}

export function countDuplicateRows(rows) {
  const seen = new Map();
  let duplicates = 0;

  rows.forEach((row) => {
    const key = JSON.stringify(row);
    const count = seen.get(key) || 0;
    if (count === 1) duplicates += 1;
    seen.set(key, count + 1);
  });

  return duplicates;
}

export function getNumericStats(column, rows) {
  const values = rows.map((row) => row[column]).filter((value) => typeof value === 'number' && Number.isFinite(value));
  const sum = values.reduce((total, value) => total + value, 0);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;
  const average = values.length ? sum / values.length : 0;

  return {
    column,
    count: values.length,
    sum,
    min,
    max,
    average
  };
}
