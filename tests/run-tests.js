import assert from 'node:assert/strict';
import { parseCsv, toCsv } from '../src/utils/csv.js';
import { countDuplicateRows, getNumericStats } from '../src/features/insights/insightsService.js';
import { aggregateRows } from '../src/features/charts/chartRenderer.js';

const rows = parseCsv('name,revenue\nA,10\nB,20\nA,5');
assert.equal(rows.length, 3);
assert.equal(rows[0].revenue, 10);

const csv = toCsv(rows);
assert.ok(csv.includes('name,revenue'));

const stats = getNumericStats('revenue', rows);
assert.equal(stats.sum, 35);
assert.equal(stats.max, 20);

const grouped = aggregateRows(rows, 'name', 'revenue');
assert.equal(grouped.find((item) => item.label === 'A').value, 15);

assert.equal(countDuplicateRows([{ a: 1 }, { a: 1 }, { a: 2 }]), 1);

console.log('All tests passed.');
