import { getActiveDataset, state } from '../../core/state.js';
import { emptyState } from '../../ui/emptyState.js';
import { $, escapeHtml } from '../../utils/dom.js';
import { formatBytes, formatDate } from '../../utils/format.js';

export function renderDashboardPage() {
  const container = $('#page-dashboard');
  const active = getActiveDataset();
  const totalRows = state.datasets.reduce((sum, dataset) => sum + dataset.rowCount, 0);
  const totalColumns = state.datasets.reduce((sum, dataset) => sum + dataset.columnCount, 0);
  const totalSize = state.datasets.reduce((sum, dataset) => sum + (dataset.fileSize || 0), 0);

  container.innerHTML = `
    <div class="grid grid-4">
      <article class="card stat-card"><strong>${state.datasets.length}</strong><span>Datasets</span></article>
      <article class="card stat-card"><strong>${totalRows}</strong><span>Total rows</span></article>
      <article class="card stat-card"><strong>${totalColumns}</strong><span>Total columns</span></article>
      <article class="card stat-card"><strong>${formatBytes(totalSize)}</strong><span>Imported size</span></article>
    </div>
    <div class="grid grid-2" style="margin-top: 18px;">
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Active dataset</p><h2>${active ? escapeHtml(active.name) : 'Nothing selected'}</h2></div></div>
        ${active ? `
          <p class="muted">${escapeHtml(active.description || 'No description added')}</p>
          <div class="pill-row">
            <span class="pill">${active.type.toUpperCase()}</span>
            <span class="pill">${active.rowCount} rows</span>
            <span class="pill">${active.columnCount} columns</span>
            <span class="pill">${formatBytes(active.fileSize)}</span>
          </div>
          <p class="muted" style="margin-top: 12px;">Imported ${formatDate(active.createdAt)}</p>
        ` : emptyState('Start with a dataset', 'Import a CSV or JSON file, or load the sample dataset.')}
      </section>
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Recent imports</p><h2>Workspace activity</h2></div></div>
        ${state.datasets.length ? state.datasets.slice(0, 6).map((dataset) => `
          <div class="kpi-item">
            <span>${escapeHtml(dataset.name)}</span>
            <strong>${dataset.rowCount} rows</strong>
          </div>
        `).join('') : '<p class="muted">No imports yet.</p>'}
      </section>
    </div>
  `;
}
