import { $ } from '../utils/dom.js';
import { setState, state } from './state.js';

const titles = {
  dashboard: 'Dashboard',
  datasets: 'Datasets',
  insights: 'Insights',
  charts: 'Charts',
  settings: 'Settings'
};

export function initRouter(render) {
  window.addEventListener('hashchange', () => routeFromHash(render));
  routeFromHash(render);
}

export function navigate(route, render) {
  window.location.hash = route;
  setActiveRoute(route, render);
}

function routeFromHash(render) {
  const route = window.location.hash.replace('#', '') || 'dashboard';
  setActiveRoute(route, render);
}

function setActiveRoute(route, render) {
  const safeRoute = titles[route] ? route : 'dashboard';
  setState({ route: safeRoute });
  document.title = `${titles[safeRoute]} - DataVista JS`;
  $('#pageTitle').textContent = titles[safeRoute];

  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  $(`#page-${safeRoute}`)?.classList.add('active');

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.route === safeRoute);
  });

  if (state.route === safeRoute) render();
}
