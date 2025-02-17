document.addEventListener('DOMContentLoaded', async () => {
  const { pendingConnection } = await chrome.storage.local.get('pendingConnection');
  document.getElementById('profileName').textContent = pendingConnection.name;

  const saveNote = async () => {
    const note = document.getElementById('noteInput').value;
    const timestamp = new Date().toISOString();
    
    // Get existing connections or initialize empty array
    const { connections = [] } = await chrome.storage.local.get('connections');
    
    // Add new connection
    connections.unshift({
      ...pendingConnection,
      note,
      timestamp,
      isManual: false
    });
    
    // Save to chrome.storage.local
    await chrome.storage.local.set({ connections });
    await chrome.storage.local.remove('pendingConnection');
    
    window.close();
  };

  document.getElementById('saveNote').addEventListener('click', saveNote);
  document.getElementById('noteInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveNote();
    }
  });
}); 