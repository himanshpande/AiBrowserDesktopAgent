import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "AI Browser Desktop Agent",

  version: "1.0.0",

  description: "AI-powered Browser & Desktop Automation Agent",

  action: {
    default_popup: "index.html",
  },
});