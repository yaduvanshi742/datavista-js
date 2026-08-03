import { SAMPLE_DATASET } from '../config/constants.js';
import { initRouter } from '../core/router.js';
import { getActiveDataset, setState, state } from '../core/state.js';
import { getDatasets, saveDataset } from '../data/datasetRepository.js';
import { getSetting, setSetting } from '../data/settingsRepository.js';
import { renderChartsPage } from '../features/charts/chartsView.js';
import { renderDashboardPage } from '../features/dashboard/dashboardView.js';
import { createDataset } from '../features/datasets/datasetService.js';
import { renderDatasetsPage } from '../features/datasets/datasetView.js';
import { exportDatasetCsv, exportDatasetJson } from '../features/export/exporter.js';
import { readFileAsDataset } from '../features/import/importer.js';
import { renderInsightsPage } from '../features/insights/insightsView.js';
import { renderSettingsPage } from '../features/settings/settingsView.js';
import { showNotice } from '../ui/notice.js';
import { $, escapeHtml } from '../utils/dom.js';

let pendingImport = null;

export async function initApp() {
  const theme = await getSetting('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  setState({ theme });

  await refreshDatasets();
  bindGlobalEvents();
  initRouter(() => render());
  render();
  registerServiceWorker();
}

async function refreshDatasets() {
  const datasets = await getDatasets();
  setState({ datasets, activeDatasetId: state.activeDatasetId || datasets[0]?.id || null });
}

export async function render(reload = false) {
  if (reload) await refreshDatasets();

  $('#sidebarDatasetCount').textContent = `${state.datasets.length} ${state.datasets.length === 1 ? 'dataset' : 'datasets'}`;

  renderDashboardPage();
  renderDatasetsPage(render);
  renderInsightsPage();
  renderChartsPage(render);
  renderSettingsPage(render);

  bindExportButtons();
}

function bindGlobalEvents() {
  $('#themeToggle').addEventListener('click', async () => {
    const theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    await setSetting('theme', theme);
    setState({ theme });
    render();
  });

  $('#sidebarToggle').addEventListener('click', () => $('.sidebar').classList.toggle('open'));

  $('#sampleButton').addEventListener('click', async () => {
    const dataset = createDataset({
      ...SAMPLE_DATASET,
      fileName: 'sample-sales.csv',
      fileSize: JSON.stringify(SAMPLE_DATASET.rows).length
    });
    await saveDataset(dataset);
    setState({ activeDatasetId: dataset.id });
    showNotice('Sample dataset loaded.');
    await render(true);
  });

  $('#fileInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      pendingImport = await readFileAsDataset(file);
      $('#importFileName').textContent = file.name;
      $('#datasetNameInput').value = file.name.replace(/\.[^.]+$/, '').replaceAll('-', ' ');
      $('#datasetDescriptionInput').value = '';
      $('#importPreview').innerHTML = `
        <strong>${pendingImport.rows.length} rows detected</strong>
        <p class="muted">File type: ${pendingImport.type.toUpperCase()}</p>
        <pre>${escapeHtml(JSON.stringify(pendingImport.rows.slice(0, 3), null, 2))}</pre>
      `;
      $('#importDialog').showModal();
    } catch (error) {
      showNotice(error.message);
    } finally {
      event.target.value = '';
    }
  });

  $('#cancelImportButton').addEventListener('click', () => $('#importDialog').close());

  $('#importForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!pendingImport) return;

    const dataset = createDataset({
      ...pendingImport,
      name: $('#datasetNameInput').value,
      description: $('#datasetDescriptionInput').value
    });

    await saveDataset(dataset);
    setState({ activeDatasetId: dataset.id });
    $('#importDialog').close();
    pendingImport = null;
    showNotice('Dataset imported successfully.');
    await render(true);
  });
}

function bindExportButtons() {
  $('#exportCsvButton')?.addEventListener('click', () => exportDatasetCsv(getActiveDataset()));
  $('#exportJsonButton')?.addEventListener('click', () => exportDatasetJson(getActiveDataset()));
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
}
