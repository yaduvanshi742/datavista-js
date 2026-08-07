export function parseCsv(text) {
  const rows = [];
  let current = [];
  let value = '';
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && insideQuotes && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      current.push(value.trim());
      value = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && next === '\n') index += 1;
      current.push(value.trim());
      if (current.some((cell) => cell !== '')) rows.push(current);
      current = [];
      value = '';
    } else {
      value += char;
    }
  }

  current.push(value.trim());
  if (current.some((cell) => cell !== '')) rows.push(current);

  if (rows.length === 0) return [];

  const headers = rows[0].map((header, index) => header || `Column ${index + 1}`);
  return rows.slice(1).map((row) => {
    return headers.reduce((record, header, index) => {
      record[header] = coerceValue(row[index] ?? '');
      return record;
    }, {});
  });
}

export function toCsv(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(escapeCsv).join(',')];

  rows.forEach((row) => {
    lines.push(headers.map((header) => escapeCsv(row[header])).join(','));
  });

  return lines.join('\n');
}

function escapeCsv(value) {
  const stringValue = String(value ?? '');
  if ([',', '"', '\n', '\r'].some((char) => stringValue.includes(char))) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

function coerceValue(value) {
  if (value === '') return '';
  const numberValue = Number(value);
  if (!Number.isNaN(numberValue) && value.trim() !== '') return numberValue;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  return value;
}
