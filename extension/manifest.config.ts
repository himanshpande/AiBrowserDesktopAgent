// chrome does not understands react thats why this file is created 
import { defineManifest } from "@crxjs/vite-plugin";


export default defineManifest({
  manifest_version: 3,

  name: "AI Browser Desktop Agent",

  version: "1.0.0",

  description: "AI-powered Browser & Desktop Automation Agent",

  action: {
    default_popup: "index.html",
  },

  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"],
    },
  ],
});