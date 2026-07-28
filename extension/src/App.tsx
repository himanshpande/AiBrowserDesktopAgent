import { useState } from "react";
import { BrowserService } from "./services/browser/browser";

function App() {

    const [search, setSearch] = useState("");

    return (
        <div style={{ width: 350, padding: 20 }}>

            <h2>🤖 AI Browser Desktop Agent</h2>

            <h3>🌐 Websites</h3>

            <button onClick={() => BrowserService.openWebsite("https://google.com")}>
                Google
            </button>

            <button onClick={() => BrowserService.openWebsite("https://youtube.com")}>
                YouTube
            </button>

            <button onClick={() => BrowserService.openWebsite("https://github.com")}>
                GitHub
            </button>

            <button onClick={() => BrowserService.openWebsite("https://chatgpt.com")}>
                ChatGPT
            </button>

            <hr />

            <h3>📑 Tabs</h3>

            <button onClick={BrowserService.newTab}>
                New Tab
            </button>

            <button onClick={BrowserService.reloadTab}>
                Reload
            </button>

            <button onClick={BrowserService.duplicateTab}>
                Duplicate
            </button>

            <button onClick={BrowserService.closeTab}>
                Close
            </button>

            <hr />

            <h3>🔍 Google Search</h3>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
            />

            <button
                onClick={() => BrowserService.googleSearch(search)}
            >
                Search
            </button>

            <hr />

            <button onClick={BrowserService.copyCurrentUrl}>
                📋 Copy Current URL
            </button>

        </div>
    );
}

export default App;