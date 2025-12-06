// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'get_content') {
        // Basic text extraction
        const content = document.body.innerText;
        // Limit to reasonable length to encourage summarization relative to interesting part
        // Using selection text if available, else body
        const selection = window.getSelection().toString();
        const payload = selection.length > 0 ? selection : content.substring(0, 10000);

        sendResponse(payload);
    }
});
