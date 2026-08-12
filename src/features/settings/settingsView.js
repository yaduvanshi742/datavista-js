import { setState, state } from '../../core/state.js';
import { clearDatasets, saveDataset } from '../../data/datasetRepository.js';
import { setSetting } from '../../data/settingsRepository.js';
import { showNotice } from '../../ui/notice.js';
import { $ } from '../../utils/dom.js';
import { createDataset } from '../datasets/datasetService.js';
import { exportWorkspace } from '../export/exporter.js';

export function renderSettingsPage(render) {
  const container = $('#page-settings');
  container.innerHTML = `
    <div class="grid grid-2">
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Appearance</p><h2>Theme</h2></div></div>
        <p class="muted">Switch between light and dark workspace themes.</p>
        <div class="toolbar" style="margin-top:16px;">
          <button class="button ${state.theme === 'light' ? 'primary' : 'ghost'}" data-theme-choice="light">Light</button>
          <button class="button ${state.theme === 'dark' ? 'primary' : 'ghost'}" data-theme-choice="dark">Dark</button>
        </div>
      </section>
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Backup</p><h2>Export and import</h2></div></div>
        <p class="muted">Download your workspace or restore a previous backup.</p>
        <div class="toolbar" style="margin-top:16px;">
          <button class="button ghost" id="exportWorkspaceButton">Export workspace</button>
          <label class="button ghost" for="backupInput">Import backup</label>
          <input id="backupInput" type="file" accept="application/json,.json" hidden />
        </div>
      </section>
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Danger zone</p><h2>Reset workspace</h2></div></div>
        <p class="muted">This removes all locally saved datasets from this browser.</p>
        <div class="toolbar" style="margin-top:16px;">
          <button class="button ghost" id="resetWorkspaceButton">Clear all datasets</button>
        </div>
      </section>
    </div>
  `;

  container.querySelectorAll('[data-theme-choice]').forEach((button) => {
    button.addEventListener('click', async () => {
      const theme = button.dataset.themeChoice;
      document.documentElement.dataset.theme = theme;
      await setSetting('theme', theme);
      setState({ theme });
      render();
    });
  });

  $('#exportWorkspaceButton')?.addEventListener('click', () => exportWorkspace(state.datasets));

  $('#backupInput')?.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const backup = JSON.parse(await file.text());
    if (!Array.isArray(backup.datasets)) throw new Error('Invalid backup file.');

    for (const dataset of backup.datasets) {
      await saveDataset({ ...dataset, id: dataset.id || createDataset(dataset).id });
    }

    showNotice('Workspace backup imported.');
    await render(true);
  });

  $('#resetWorkspaceButton')?.addEventListener('click', async () => {
    if (!confirm('Clear every saved dataset from this browser?')) return;
    await clearDatasets();
    showNotice('Workspace cleared.');
    await render(true);
  });
}
