// Keep track of processed URLs with timestamps
const processedUrls = new Map();

// Function to handle button clicks
const handleButtonClick = (event) => {
  // Look for "Connect" or "Send" buttons
  const button = event.target.closest('button');
  if (!button) return;
  
  // Debug logging
  console.log('Button clicked:', {
    text: button.textContent,
    ariaLabel: button.getAttribute('aria-label'),
    innerHTML: button.innerHTML
  });
  
  const buttonText = button.textContent || '';
  const ariaLabel = button.getAttribute('aria-label') || '';
  
  // Check against case-insensitive patterns
  const patterns = ['Send without note', 'Send now', 'Connect', 'Send'];
  const matches = patterns.some(pattern => 
    buttonText.includes(pattern) || 
    buttonText.toLowerCase().includes(pattern.toLowerCase()) ||
    ariaLabel.includes(pattern) ||
    ariaLabel.toLowerCase().includes(pattern.toLowerCase())
  );
  
  if (matches) {
    console.log('Connection button detected');
    const currentUrl = window.location.href;
    const now = Date.now();
    
    // Check if this URL was processed in the last 30 seconds
    const lastProcessed = processedUrls.get(currentUrl);
    if (lastProcessed && (now - lastProcessed) < 30000) {
      console.log('URL recently processed, skipping');
      return;
    }

    // Get profile information
    const profileName = document.querySelector('h1')?.textContent.trim() || 'Unknown';
    console.log('Profile name:', profileName);
    
    // Record this URL as processed
    processedUrls.set(currentUrl, now);
    
    // Clean up old entries from processedUrls
    for (const [url, timestamp] of processedUrls.entries()) {
      if (now - timestamp > 30000) {
        processedUrls.delete(url);
      }
    }
    
    // Send message to background script
    console.log('Sending message to background script');
    chrome.runtime.sendMessage({
      type: 'CONNECTION_REQUEST',
      data: {
        name: profileName,
        url: currentUrl
      }
    });
  }
};

// Add click listener to the document
document.addEventListener('click', handleButtonClick, true);

// Debug log to confirm content script is loaded
console.log('LinkedIn connection tracker content script loaded'); 