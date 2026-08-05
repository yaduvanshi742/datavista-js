export function emptyState(title, message, action = '') {
  return `
    <div class="empty-state">
      <h3>${title}</h3>
      <p>${message}</p>
      ${action}
    </div>
  `;
}
