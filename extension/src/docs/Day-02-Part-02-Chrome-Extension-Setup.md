---

# 🛠 Part 2 – Converting the React Application into a Chrome Extension

In Part 1, we understood the theory behind Chrome Extensions.

We learned:

- Why a normal React application cannot be installed as a Chrome Extension.
- Why Chrome requires a Manifest file.
- What CRXJS does.
- How Chrome loads an Extension.

Now it is time to actually convert our React application into a Chrome Extension.

This section covers every code change that we made.

---

# Step 1 – Creating `manifest.config.ts`

The very first file we created was

```text
extension/
│
├── manifest.config.ts
```

This file did not exist in our React application.

It was added only because we wanted Chrome to recognize our project as an Extension.

---

# Why do we need this file?

Imagine you are creating a new employee account inside a company.

The HR department needs information such as

- Employee Name
- Employee ID
- Department
- Designation

Without these details,

the employee cannot be registered.

Exactly the same happens with Chrome.

Chrome asks

> "Tell me everything about your Extension."

That information is stored inside

```
manifest.config.ts
```

During the build process,

CRXJS converts this file into

```
manifest.json
```

which Chrome can understand.

---

# Code

```ts
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
```

Let's understand every single line.

---

# Import Statement

```ts
import { defineManifest } from "@crxjs/vite-plugin";
```

## Why?

This helper function allows us to write a Manifest using TypeScript.

Instead of manually creating

```
manifest.json
```

we create

```
manifest.config.ts
```

During the build,

CRXJS converts it automatically.

This improves

- Readability
- Type Safety
- Auto Completion

---

# export default defineManifest()

```ts
export default defineManifest({
```

This tells CRXJS

> "Everything written inside this object belongs to the Extension Manifest."

Think of this object as the blueprint of your Extension.

---

# manifest_version

```ts
manifest_version: 3
```

This is one of the most important properties.

It tells Chrome

which Manifest specification we are following.

Currently,

Chrome supports Manifest Version 3.

Version 2 has already been deprecated.

---

# name

```ts
name: "AI Browser Desktop Agent"
```

This is the display name of the Extension.

You will see it

- inside chrome://extensions
- beside the extension icon
- inside Extension Details

Changing this property immediately changes the Extension name.

---

# version

```ts
version: "1.0.0"
```

This represents the current version of the Extension.

Whenever new features are added,

the version should be updated.

Example

```
1.0.0

↓

1.0.1

↓

1.1.0

↓

2.0.0
```

Versioning helps users know whether they are using the latest release.

---

# description

```ts
description:
"AI-powered Browser & Desktop Automation Agent"
```

This description appears inside Chrome's Extensions page.

Although it does not affect functionality,

it helps users understand the purpose of the Extension.

---

# action

```ts
action:{
    default_popup:"index.html"
}
```

This property is extremely important.

Without it,

clicking the Extension icon will not open any popup.

Chrome internally performs this process.

```
User clicks Extension

↓

Chrome reads Manifest

↓

Reads action.default_popup

↓

Loads index.html

↓

Loads React

↓

Shows Popup
```

This is the first time our React application becomes part of a Chrome Extension.

---

# Why does it use index.html?

Many beginners ask

"Why not App.tsx?"

The answer is

Chrome cannot execute React components directly.

React always starts from

```
index.html
```

Flow

```
index.html

↓

main.tsx

↓

App.tsx
```

Therefore,

Chrome opens

```
index.html
```

instead of

```
App.tsx
```

---

# Step 2 – Modifying vite.config.ts

The next file we modified was

```
vite.config.ts
```

---

# Old Configuration

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins:[react()]
});
```

This configuration builds only a React application.

Chrome Extensions require additional processing.

---

# New Configuration

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

export default defineConfig({
    plugins:[
        react(),
        crx({manifest})
    ]
});
```

Let's understand every import.

---

## defineConfig

Provided by Vite.

Used to configure the build process.

---

## react()

Adds React support.

Without it,

JSX cannot compile.

---

## crx()

Provided by

```
@crxjs/vite-plugin
```

This plugin transforms our React project into a valid Chrome Extension.

---

## manifest

```ts
import manifest from "./manifest.config";
```

We import our Manifest configuration

and pass it to the CRX plugin.

Without this import,

CRXJS would not know

how our Extension should be configured.

---

# plugins Array

```ts
plugins:[
react(),
crx({manifest})
]
```

Execution order

```
React

↓

Compile JSX

↓

CRXJS

↓

Generate Extension Files

↓

Build dist/
```

Every build follows this sequence.

---

# Step 3 – Modifying App.tsx

Originally,

Vite displayed

```
Vite + React
```

We replaced it with our own interface.

```tsx
function App() {
    return (
        <div
            style={{
                width:"300px",
                padding:"20px",
                fontFamily:"Arial"
            }}
        >
            <h2>
                🤖 AI Browser Desktop Agent
            </h2>

            <p>
                Extension Loaded Successfully 🚀
            </p>
        </div>
    );
}

export default App;
```

---

# Why was this change important?

We wanted to verify

whether React was successfully rendering

inside the Extension popup.

If this UI appears,

it confirms

that

```
Manifest

↓

Popup

↓

React

↓

Working Successfully
```

---

# Popup Width

Notice

```tsx
width:"300px"
```

Why?

Unlike websites,

Chrome Extension popups have limited width.

Giving an explicit width makes the popup look clean.

---

# Padding

```
padding:"20px"
```

This prevents text from touching the popup edges.

---

# Font Family

```
fontFamily:"Arial"
```

Improves readability.

Later,

we will move all styling into CSS modules.

For Day 2,

inline styling is sufficient.

---

# Project State After Implementation

```
extension/

├── manifest.config.ts
├── vite.config.ts
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
```

Our project was no longer just a React application.

It had officially become a Chrome Extension project.

---

# Summary of Part 2

During this part we learned

✅ How Manifest is created.

✅ Purpose of every Manifest property.

✅ Why `default_popup` points to `index.html`.

✅ How Vite was configured.

✅ Role of the CRXJS plugin.

✅ How React is rendered inside the Extension popup.

---

➡️ **Next:** Part 3 will cover the build process, the `index.css` error we encountered, loading the extension into Chrome, debugging techniques, common mistakes, best practices, and the final Day 2 summary.