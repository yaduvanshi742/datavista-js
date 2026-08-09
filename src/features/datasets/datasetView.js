import { MAX_TABLE_ROWS } from '../../config/constants.js';
import { getActiveDataset, setState, state } from '../../core/state.js';
import { deleteDataset } from '../../data/datasetRepository.js';
import { emptyState } from '../../ui/emptyState.js';
import { showNotice } from '../../ui/notice.js';
import { $, escapeHtml } from '../../utils/dom.js';
import { formatBytes, formatDate, normalizeCell } from '../../utils/format.js';
import { getFilteredRows, sortRows } from './datasetService.js';

export function renderDatasetsPage(render) {
  const container = $('#page-datasets');
  const active = getActiveDataset();

  if (!state.datasets.length) {
    container.innerHTML = emptyState('No datasets yet', 'Import a CSV or JSON file to start exploring your data.');
    return;
  }

  const rows = sortRows(getFilteredRows(active, state.searchTerm), state.sort.column, state.sort.direction);

  container.innerHTML = `
    <div class="grid grid-2">
      <section class="card">
        <div class="card-head">
          <div>
            <p class="eyebrow">Saved datasets</p>
            <h2>Your workspace</h2>
          </div>
        </div>
        <div class="dataset-list">
          ${state.datasets.map((dataset) => datasetCard(dataset)).join('')}
        </div>
      </section>
      <section class="card">
        <div class="card-head">
          <div>
            <p class="eyebrow">Active table</p>
            <h2>${escapeHtml(active.name)}</h2>
          </div>
        </div>
        <div class="toolbar">
          <input class="input" id="tableSearch" type="search" value="${escapeHtml(state.searchTerm)}" placeholder="Search rows..." />
          <button class="button ghost" id="exportCsvButton">Export CSV</button>
          <button class="button ghost" id="exportJsonButton">Export JSON</button>
        </div>
        ${tableMarkup(active, rows)}
      </section>
    </div>
  `;

  container.querySelectorAll('[data-select-dataset]').forEach((button) => {
    button.addEventListener('click', () => {
      setState({ activeDatasetId: button.dataset.selectDataset, searchTerm: '', sort: { column: null, direction: 'asc' } });
      render();
    });
  });

  container.querySelectorAll('[data-delete-dataset]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!confirm('Delete this dataset from the local workspace?')) return;
      await deleteDataset(button.dataset.deleteDataset);
      showNotice('Dataset deleted.');
      await render(true);
    });
  });

  $('#tableSearch')?.addEventListener('input', (event) => {
    setState({ searchTerm: event.target.value });
    render();
  });

  container.querySelectorAll('[data-sort-column]').forEach((header) => {
    header.addEventListener('click', () => {
      const column = header.dataset.sortColumn;
      const direction = state.sort.column === column && state.sort.direction === 'asc' ? 'desc' : 'asc';
      setState({ sort: { column, direction } });
      render();
    });
  });
}

function datasetCard(dataset) {
  const active = dataset.id === state.activeDatasetId;
  return `
    <article class="dataset-item">
      <div>
        <h3>${escapeHtml(dataset.name)}</h3>
        <p class="muted">${escapeHtml(dataset.description || 'No description added')}</p>
        <div class="pill-row">
          <span class="pill">${dataset.type.toUpperCase()}</span>
          <span class="pill">${dataset.rowCount} rows</span>
          <span class="pill">${dataset.columnCount} columns</span>
          <span class="pill">${formatBytes(dataset.fileSize)}</span>
        </div>
        <small class="muted">Imported ${formatDate(dataset.createdAt)}</small>
      </div>
      <div class="toolbar">
        <button class="button ${active ? 'primary' : 'ghost'}" data-select-dataset="${dataset.id}">${active ? 'Selected' : 'Open'}</button>
        <button class="button ghost" data-delete-dataset="${dataset.id}">Delete</button>
      </div>
    </article>
  `;
}

function tableMarkup(dataset, rows) {
  const visibleRows = rows.slice(0, MAX_TABLE_ROWS);
  return `
    <p class="muted">Showing ${visibleRows.length} of ${rows.length} matching rows. Click a column heading to sort.</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${dataset.columns.map((column) => `<th data-sort-column="${escapeHtml(column)}">${escapeHtml(column)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${visibleRows.map((row) => `
            <tr>${dataset.columns.map((column) => `<td>${escapeHtml(normalizeCell(row[column]))}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
