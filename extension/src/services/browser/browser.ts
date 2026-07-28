declare const chrome: any;

export const BrowserService = {

    openWebsite(url: string) {
        chrome.tabs.create({ url });
    },

    newTab() {
        chrome.tabs.create({});
    },

    reloadTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
            if (tabs[0]?.id) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    },

    duplicateTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
            if (tabs[0]?.id) {
                chrome.tabs.duplicate(tabs[0].id);
            }
        });
    },

    closeTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
            if (tabs[0]?.id) {
                chrome.tabs.remove(tabs[0].id);
            }
        });
    },

    googleSearch(query: string) {
        chrome.tabs.create({
            url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
        });
    },

    copyCurrentUrl() {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs: any[]) => {
            if (tabs[0]?.url) {
                await navigator.clipboard.writeText(tabs[0].url);
                alert("URL Copied ✅");
            }
        });
    }
};