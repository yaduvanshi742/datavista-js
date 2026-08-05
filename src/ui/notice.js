import { $ } from '../utils/dom.js';

let timeoutId = null;

export function showNotice(message) {
  const notice = $('#notice');
  notice.textContent = message;
  notice.classList.remove('hidden');

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    notice.classList.add('hidden');
  }, 3600);
}
