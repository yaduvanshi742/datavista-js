export function parseJsonDataset(text) {
  const parsed = JSON.parse(text);

  if (Array.isArray(parsed)) {
    return parsed.map(normalizeRecord);
  }

  if (Array.isArray(parsed.data)) {
    return parsed.data.map(normalizeRecord);
  }

  if (typeof parsed === 'object' && parsed !== null) {
    return Object.entries(parsed).map(([key, value]) => normalizeRecord({ key, value }));
  }

  throw new Error('JSON file must contain an array or object.');
}

function normalizeRecord(record) {
  if (typeof record !== 'object' || record === null || Array.isArray(record)) {
    return { value: record };
  }
  return record;
}
