import { getActiveDataset, setState, state } from '../../core/state.js';
import { emptyState } from '../../ui/emptyState.js';
import { $ } from '../../utils/dom.js';
import { drawChart } from './chartRenderer.js';

export function renderChartsPage(render) {
  const container = $('#page-charts');
  const dataset = getActiveDataset();

  if (!dataset) {
    container.innerHTML = emptyState('No chart data yet', 'Import a dataset to build a chart.');
    return;
  }

  const numericColumns = dataset.columns.filter((column) => dataset.rows.some((row) => typeof row[column] === 'number'));
  const labelColumn = state.chart.labelColumn || dataset.columns[0];
  const valueColumn = state.chart.valueColumn || numericColumns[0] || dataset.columns[0];

  container.innerHTML = `
    <section class="card">
      <div class="card-head">
        <div>
          <p class="eyebrow">Chart builder</p>
          <h2>${dataset.name}</h2>
        </div>
      </div>
      <div class="toolbar">
        <select id="labelColumnSelect">${dataset.columns.map((column) => `<option value="${column}" ${column === labelColumn ? 'selected' : ''}>Label: ${column}</option>`).join('')}</select>
        <select id="valueColumnSelect">${numericColumns.map((column) => `<option value="${column}" ${column === valueColumn ? 'selected' : ''}>Value: ${column}</option>`).join('')}</select>
        <select id="chartTypeSelect">
          <option value="bar" ${state.chart.type === 'bar' ? 'selected' : ''}>Bar chart</option>
          <option value="line" ${state.chart.type === 'line' ? 'selected' : ''}>Line chart</option>
          <option value="pie" ${state.chart.type === 'pie' ? 'selected' : ''}>Pie chart</option>
        </select>
      </div>
      <div class="chart-box">
        <canvas id="mainChart"></canvas>
      </div>
    </section>
  `;

  const updateChart = () => {
    setState({
      chart: {
        labelColumn: $('#labelColumnSelect').value,
        valueColumn: $('#valueColumnSelect').value,
        type: $('#chartTypeSelect').value
      }
    });
    render();
  };

  $('#labelColumnSelect').addEventListener('change', updateChart);
  $('#valueColumnSelect').addEventListener('change', updateChart);
  $('#chartTypeSelect').addEventListener('change', updateChart);

  requestAnimationFrame(() => drawChart($('#mainChart'), dataset.rows, labelColumn, valueColumn, state.chart.type));
}
