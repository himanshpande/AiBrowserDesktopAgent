console.log("🚀 Background Script Running");

const chrome = (globalThis as any).chrome;

chrome.runtime.onMessage.addListener(
  (message: any, _sender: any, _sendResponse: any) => {
    console.log("📩 Message Received:", message);

    if (message.type === "HIGHLIGHT_PAGE") {
  console.log("✅ Highlight request received!");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
    if (!tabs[0]?.id) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      type: "HIGHLIGHT_PAGE",
    });
  });
}
  }
);