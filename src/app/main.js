import { initApp } from './app.js';

initApp().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main style="max-width: 760px; margin: 80px auto; font-family: system-ui; padding: 24px;">
      <h1>DataVista JS could not start</h1>
      <p>${error.message}</p>
    </main>
  `;
});
