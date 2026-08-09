export function drawChart(canvas, rows, labelColumn, valueColumn, type = 'bar') {
  const context = canvas.getContext('2d');
  const width = canvas.width = canvas.clientWidth * devicePixelRatio;
  const height = canvas.height = canvas.clientHeight * devicePixelRatio;
  context.scale(devicePixelRatio, devicePixelRatio);

  const viewWidth = canvas.clientWidth;
  const viewHeight = canvas.clientHeight;
  context.clearRect(0, 0, viewWidth, viewHeight);

  const data = aggregateRows(rows, labelColumn, valueColumn).slice(0, 12);
  if (!data.length) {
    context.fillStyle = '#64748b';
    context.font = '16px sans-serif';
    context.fillText('Select a label column and numeric value column.', 24, 40);
    return;
  }

  if (type === 'line') return drawLine(context, data, viewWidth, viewHeight);
  if (type === 'pie') return drawPie(context, data, viewWidth, viewHeight);
  return drawBar(context, data, viewWidth, viewHeight);
}

export function aggregateRows(rows, labelColumn, valueColumn) {
  if (!labelColumn || !valueColumn) return [];
  const map = new Map();

  rows.forEach((row) => {
    const label = String(row[labelColumn] ?? 'Unknown');
    const value = Number(row[valueColumn]);
    if (Number.isFinite(value)) map.set(label, (map.get(label) || 0) + value);
  });

  return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function drawBar(context, data, width, height) {
  const padding = 42;
  const max = Math.max(...data.map((item) => item.value));
  const barWidth = (width - padding * 2) / data.length;
  context.fillStyle = '#2563eb';

  data.forEach((item, index) => {
    const x = padding + index * barWidth + 8;
    const barHeight = ((height - padding * 2) * item.value) / max;
    const y = height - padding - barHeight;
    context.fillRect(x, y, Math.max(12, barWidth - 16), barHeight);
    context.fillStyle = '#64748b';
    context.font = '11px sans-serif';
    context.save();
    context.translate(x, height - 16);
    context.rotate(-0.55);
    context.fillText(item.label.slice(0, 12), 0, 0);
    context.restore();
    context.fillStyle = '#2563eb';
  });
}

function drawLine(context, data, width, height) {
  const padding = 42;
  const max = Math.max(...data.map((item) => item.value));
  context.strokeStyle = '#2563eb';
  context.lineWidth = 3;
  context.beginPath();

  data.forEach((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(1, data.length - 1);
    const y = height - padding - ((height - padding * 2) * item.value) / max;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });

  context.stroke();
  context.fillStyle = '#2563eb';
  data.forEach((item, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(1, data.length - 1);
    const y = height - padding - ((height - padding * 2) * item.value) / max;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
  });
}

function drawPie(context, data, width, height) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) * 0.32;
  const centerX = width / 2;
  const centerY = height / 2;
  const palette = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#475569'];
  let angle = -Math.PI / 2;

  data.forEach((item, index) => {
    const slice = (item.value / total) * Math.PI * 2;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, angle, angle + slice);
    context.closePath();
    context.fillStyle = palette[index % palette.length];
    context.fill();
    angle += slice;
  });
}
