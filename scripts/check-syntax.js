import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const roots = ['src', 'service-worker.js'];
const files = [];

function walk(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    readdirSync(path).forEach((entry) => walk(join(path, entry)));
  } else if (path.endsWith('.js')) {
    files.push(path);
  }
}

roots.forEach(walk);

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status);
}

console.log(`Checked ${files.length} JavaScript files.`);
