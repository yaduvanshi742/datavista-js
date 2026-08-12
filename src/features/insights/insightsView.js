import { getActiveDataset } from '../../core/state.js';
import { emptyState } from '../../ui/emptyState.js';
import { $ } from '../../utils/dom.js';
import { buildInsights } from './insightsService.js';

export function renderInsightsPage() {
  const container = $('#page-insights');
  const dataset = getActiveDataset();

  if (!dataset) {
    container.innerHTML = emptyState('No dataset selected', 'Import or open a dataset to view insights.');
    return;
  }

  const insights = buildInsights(dataset);

  container.innerHTML = `
    <div class="grid grid-4">
      <article class="card stat-card"><strong>${insights.rowCount}</strong><span>Total rows</span></article>
      <article class="card stat-card"><strong>${insights.columnCount}</strong><span>Total columns</span></article>
      <article class="card stat-card"><strong>${insights.numericColumns.length}</strong><span>Numeric columns</span></article>
      <article class="card stat-card"><strong>${insights.duplicateRows}</strong><span>Duplicate rows</span></article>
    </div>
    <div class="grid grid-2" style="margin-top: 18px;">
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Column quality</p><h2>Missing values</h2></div></div>
        <div class="kpi-list">
          ${insights.missingValues.map((item) => `<div class="kpi-item"><span>${item.column}</span><strong>${item.missing}</strong></div>`).join('')}
        </div>
      </section>
      <section class="card">
        <div class="card-head"><div><p class="eyebrow">Numeric summary</p><h2>Column statistics</h2></div></div>
        ${insights.numericStats.length ? insights.numericStats.map((stat) => `
          <div class="kpi-list" style="margin-bottom:16px;">
            <h3>${stat.column}</h3>
            <div class="kpi-item"><span>Average</span><strong>${stat.average.toFixed(2)}</strong></div>
            <div class="kpi-item"><span>Min</span><strong>${stat.min}</strong></div>
            <div class="kpi-item"><span>Max</span><strong>${stat.max}</strong></div>
            <div class="kpi-item"><span>Sum</span><strong>${stat.sum.toFixed(2)}</strong></div>
          </div>
        `).join('') : '<p class="muted">No numeric columns were found.</p>'}
      </section>
    </div>
  `;
}
