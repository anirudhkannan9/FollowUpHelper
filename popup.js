document.addEventListener('DOMContentLoaded', async () => {
  const { connections = [] } = await chrome.storage.local.get('connections');
  const connectionsList = document.getElementById('connectionsList');
  
  if (connections.length === 0) {
    connectionsList.innerHTML = '<p>No connections saved yet.</p>';
    return;
  }

  connectionsList.innerHTML = connections
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .map(connection => `
      <div class="connection">
        <a href="${connection.url}" target="_blank">${connection.name}</a>
        <div class="note">${connection.note}</div>
        <div class="timestamp">${new Date(connection.timestamp).toLocaleDateString()}</div>
      </div>
    `)
    .join('');
}); 