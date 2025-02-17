document.addEventListener('DOMContentLoaded', async () => {
  const { connections = [] } = await chrome.storage.local.get('connections');
  const connectionsList = document.getElementById('connectionsList');
  const urlInput = document.getElementById('urlInput');
  const reasonInput = document.getElementById('reasonInput');
  
  // Function to show feedback message
  const showFeedback = (message, isError = false) => {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.padding = '10px';
    feedback.style.marginBottom = '10px';
    feedback.style.borderRadius = '4px';
    feedback.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
    feedback.style.color = isError ? '#c62828' : '#2e7d32';
    
    // Insert at the top of the body
    document.body.insertBefore(feedback, document.body.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => feedback.remove(), 3000);
  };

  // Backup functionality
  document.getElementById('backupBtn').addEventListener('click', async () => {
    try {
      const { connections = [] } = await chrome.storage.local.get('connections');
      const blob = new Blob([JSON.stringify(connections, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const now = new Date();
      const dateStr = now.toISOString().replace(/[:.]/g, '-').split('T').join('_');
      const a = document.createElement('a');
      a.href = url;
      a.download = `FollowUpHelper_Backup_${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showFeedback('Backup file downloaded successfully!');
    } catch (error) {
      console.error('Backup failed:', error);
      showFeedback('Failed to create backup file.', true);
    }
  });

  // Restore functionality
  document.getElementById('restoreBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const restoredConnections = JSON.parse(e.target.result);
          if (!Array.isArray(restoredConnections)) {
            throw new Error('Invalid backup file format');
          }
          // Update chrome.storage.local
          await chrome.storage.local.set({ connections: restoredConnections });
          // Update the local connections array
          connections.length = 0; // Clear the array
          connections.push(...restoredConnections); // Add new items
          showFeedback('Data restored successfully!');
          renderConnections(); // Refresh the display
        } catch (err) {
          console.error('Error restoring data:', err);
          showFeedback('Failed to restore data. Please ensure this is a valid backup file.', true);
        }
      };
      
      reader.onerror = () => {
        showFeedback('Error reading backup file.', true);
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  });

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
