chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CONNECTION_REQUEST') {
    // Store the pending connection
    chrome.storage.local.set({
      'pendingConnection': message.data
    });
    
    // Create popup window - simplified positioning
    chrome.windows.create({
      url: 'note.html',
      type: 'popup',
      width: 400,
      height: 300,
      focused: true  // This ensures the window is focused when created
    });
  }
}); 