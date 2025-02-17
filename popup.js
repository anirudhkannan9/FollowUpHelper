document.addEventListener('DOMContentLoaded', async () => {
  const { connections = [] } = await chrome.storage.local.get('connections');
  const connectionsList = document.getElementById('connectionsList');
  const urlInput = document.getElementById('urlInput');
  const reasonInput = document.getElementById('reasonInput');
  
  // Function to add a new manual connection
  const addManualConnection = async () => {
    const url = urlInput.value.trim();
    const note = reasonInput.value.trim();
    
    if (!url) return;
    
    const newConnection = {
      url,
      note,
      timestamp: new Date().toISOString(),
      isManual: true
    };
    
    connections.unshift(newConnection);
    await chrome.storage.local.set({ connections });
    
    // Clear inputs
    urlInput.value = '';
    reasonInput.value = '';
    
    // Refresh the list
    renderConnections();
  };
  
  // Handle Enter key in inputs
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') reasonInput.focus();
  });
  
  reasonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addManualConnection();
    }
  });
  
  // Function to render connections
  const renderConnections = () => {
    if (connections.length === 0) {
      connectionsList.innerHTML = '<p>No connections saved yet.</p>';
      return;
    }

    connectionsList.innerHTML = connections
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(connection => `
        <div class="connection">
          <a href="${connection.url}" target="_blank">
            ${connection.isManual ? connection.url : connection.name}
          </a>
          <div class="note">${connection.note}</div>
          <div class="timestamp">${new Date(connection.timestamp).toLocaleDateString()}</div>
        </div>
      `)
      .join('');
  };
  
  // Initial render
  renderConnections();
}); 