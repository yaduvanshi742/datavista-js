import { DATASET_STORE } from '../config/constants.js';
import { requestToPromise, runTransaction } from './db.js';

export async function getDatasets() {
  return runTransaction(DATASET_STORE, 'readonly', async (store) => {
    const datasets = await requestToPromise(store.getAll());
    return datasets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  });
}

export async function getDataset(id) {
  return runTransaction(DATASET_STORE, 'readonly', (store) => requestToPromise(store.get(id)));
}

export async function saveDataset(dataset) {
  return runTransaction(DATASET_STORE, 'readwrite', (store) => store.put(dataset));
}

export async function deleteDataset(id) {
  return runTransaction(DATASET_STORE, 'readwrite', (store) => store.delete(id));
}

export async function clearDatasets() {
  return runTransaction(DATASET_STORE, 'readwrite', (store) => store.clear());
}
