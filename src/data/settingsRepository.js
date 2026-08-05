import { SETTINGS_STORE } from '../config/constants.js';
import { requestToPromise, runTransaction } from './db.js';

export async function getSetting(key, fallback = null) {
  const item = await runTransaction(SETTINGS_STORE, 'readonly', (store) => requestToPromise(store.get(key)));
  return item ? item.value : fallback;
}

export async function setSetting(key, value) {
  return runTransaction(SETTINGS_STORE, 'readwrite', (store) => store.put({ key, value }));
}
