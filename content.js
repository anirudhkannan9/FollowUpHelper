// Keep track of processed URLs with timestamps
const processedUrls = new Map();

// Function to handle button clicks
const handleButtonClick = (event) => {
  // Look for "Connect" or "Send" buttons
  const button = event.target.closest('button');
  if (!button) return;
  
  // More detailed debug logging
  console.log('Button clicked:', {
    text: button.textContent?.trim(),
    ariaLabel: button.getAttribute('aria-label'),
    className: button.className,
    parentClassName: button.parentElement?.className,
    innerHTML: button.innerHTML,
    parentHTML: button.parentElement?.innerHTML
  });
  
  const buttonText = button.textContent?.trim() || '';
  const ariaLabel = button.getAttribute('aria-label') || '';
  
  // Check against case-sensitive patterns
  const patterns = [
    'Send without note',
    'Send now',
    'Connect',
    'Send',
    'Connect without note'
  ];

  // Also check if this is a connection-related action in a dropdown or modal
  const isInConnectionContext = 
    document.querySelector('.artdeco-modal__content')?.contains(button) ||
    document.querySelector('.artdeco-dropdown__content-inner')?.contains(button) ||
    document.querySelector('[data-test-modal]')?.contains(button);
  
  const matches = patterns.some(pattern => 
    buttonText.includes(pattern) || 
    ariaLabel.includes(pattern)
  ) || (isInConnectionContext && (
    buttonText.includes('Send') || 
    ariaLabel.includes('Send') ||
    buttonText.includes('Connect') || 
    ariaLabel.includes('Connect')
  ));
  
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