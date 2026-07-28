console.log("🌐 Content Script Loaded");

declare const chrome: any;

chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {

    console.log("📨 Content Script Received:", message);

    if (message.type === "HIGHLIGHT_PAGE") {
        document.body.style.backgroundColor = "yellow";
        document.body.style.border = "8px solid green";

        console.log("🎉 Page Highlighted");
    }

    if (message.type === "ANALYZE_PAGE") {

        const pageData = {
            title: document.title,
            url: window.location.href,
            text: document.body.innerText.substring(0, 3000)
        };

        sendResponse(pageData);
    }

    return true;
});