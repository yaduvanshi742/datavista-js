export const state = {
  datasets: [],
  activeDatasetId: null,
  route: 'dashboard',
  searchTerm: '',
  sort: {
    column: null,
    direction: 'asc'
  },
  chart: {
    labelColumn: null,
    valueColumn: null,
    type: 'bar'
  },
  theme: 'light'
};

const listeners = new Set();

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setState(partial) {
  Object.assign(state, partial);
  listeners.forEach((listener) => listener(state));
}

export function getActiveDataset() {
  return state.datasets.find((dataset) => dataset.id === state.activeDatasetId) || state.datasets[0] || null;
}
