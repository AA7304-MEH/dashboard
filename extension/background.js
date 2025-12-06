chrome.action.onClicked.addListener((tab) => {
    // Inject content script if not already present (failsafe)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }, () => {
        // Ask content script for text
        chrome.tabs.sendMessage(tab.id, { text: 'get_content' }, (response) => {
            if (response) {
                // Encode content and open our app
                // Note: In a real extension, we might use local storage or a pop-up. 
                // For MVP, we pass data via URL params or just open the tab.
                // Since URL params have limits, we'll copy to clipboard in content script or just open Repurpose page.

                // Better approach for MVP: Open Repurpose page and let user paste.
                // Or use an intermediate 'popup' to copy content.

                // Simpler: Just open the repurpose page
                chrome.tabs.create({ url: 'http://localhost:3000/repurpose' });
            }
        });
    });
});
