console.log("🌐 Content Script Loaded");

declare const chrome: any;

chrome.runtime.onMessage.addListener((message: any) => {
  console.log("📨 Content Script Received:", message);

  if (message.type === "HIGHLIGHT_PAGE") {
    document.body.style.backgroundColor = "yellow";
    document.body.style.border = "8px solid green";

    console.log("🎉 Page Highlighted");
  }
});