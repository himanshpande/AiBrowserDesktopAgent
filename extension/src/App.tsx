import { useState } from "react";

declare const chrome: any;

function App() {
  const [status, setStatus] = useState("");

const highlightPage = () => {
  chrome.runtime.sendMessage({
    type: "HIGHLIGHT_PAGE",
  });

  setStatus("Message Sent 🚀");
};

  return (
    <div style={{ width: "320px", padding: "20px" }}>
      <h2>🤖 AI Browser Desktop Agent</h2>

      <button onClick={highlightPage}>
        Highlight Page
      </button>

      <p>{status}</p>
    </div>
  );
}

export default App;