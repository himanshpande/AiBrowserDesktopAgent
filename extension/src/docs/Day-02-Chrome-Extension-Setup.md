# 📅 Day 02 - Chrome Extension Setup (Part 1)

> **Project:** AI Browser Desktop Agent
>
> **Day:** 02
>
> **Topic:** Converting a React + Vite Application into a Chrome Extension using Manifest V3
>
> **Difficulty:** ⭐ Beginner
>
> **Estimated Time:** 45–60 Minutes

---

# 📖 Introduction

On **Day 1**, we successfully created our project using **React**, **TypeScript**, and **Vite**.

At this stage, our project was only a **normal React web application**.

Although it worked perfectly inside a browser, Chrome still did **not** recognize it as an extension.

This is because a React application and a Chrome Extension are two completely different types of software.

Understanding this difference is the most important concept of Day 2.

---

# 🎯 Objective

The objective of Day 2 was **not** to build AI.

The objective was **not** to automate browsers.

The objective was simply:

> Convert our existing React application into a valid Chrome Extension.

By the end of this day we wanted to achieve the following:

- Chrome should recognize our project as an Extension.
- The extension should appear inside Chrome.
- Clicking the extension icon should open our React application.
- React should run inside the popup instead of a normal browser tab.

---

# 📂 Project State Before Starting Day 2

Our project looked like this.

```text
AIBrowserDesktopAgent/

├── desktop-agent/
├── docs/
├── shared/
└── extension/
    │
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── ...
    │
    ├── package.json
    ├── vite.config.ts
    └── ...
```

Everything inside the **extension** folder was simply a React project created using Vite.

Nothing in this project indicated that it was a Chrome Extension.

---

# 🌐 How a Normal React Application Works

When we run a React application, the browser follows this flow.

```text
Browser

↓

index.html

↓

main.tsx

↓

App.tsx

↓

React Components

↓

User Interface
```

Let's understand every step.

---

## Step 1 — Browser Opens index.html

Whenever we type

```
http://localhost:5173
```

the browser loads **index.html**.

This file is the starting point of every Vite application.

---

## Step 2 — index.html Loads main.tsx

Inside index.html, Vite loads **main.tsx**.

This file initializes React.

---

## Step 3 — main.tsx Renders App.tsx

Inside main.tsx we usually find something similar to:

```tsx
createRoot(document.getElementById("root")!).render(
    <App />
)
```

React now renders App.tsx.

---

## Step 4 — App.tsx Displays UI

App.tsx contains our user interface.

Example:

```tsx
function App(){
    return(
        <h1>Hello World</h1>
    )
}
```

React displays this on the screen.

---

# ✅ Final Flow

```text
Browser

↓

index.html

↓

main.tsx

↓

App.tsx

↓

React UI
```

This architecture is valid only for web applications.

Chrome Extensions work differently.

---

# 🧩 How a Chrome Extension Works

Chrome never starts from App.tsx.

It never starts from main.tsx.

It never starts from index.html.

Instead, Chrome first searches for a file called:

```text
manifest.json
```

Without this file Chrome refuses to load the extension.

Its flow looks like this.

```text
Chrome

↓

manifest.json

↓

Popup

↓

index.html

↓

main.tsx

↓

App.tsx
```

Notice the difference.

React starts from **index.html**.

Chrome Extensions start from **manifest.json**.

This single difference changes the entire architecture.

---

# 📌 What is Manifest?

The Manifest is the identity card of your Chrome Extension.

Think of it like an Aadhaar Card.

Without Aadhaar you cannot prove your identity.

Similarly,

without Manifest,

Chrome cannot identify your extension.

The Manifest tells Chrome:

- What is the extension name?
- What is the extension version?
- Which popup should open?
- Which permissions are required?
- Which background scripts exist?
- Which content scripts should run?

Without this information Chrome does not know how your extension should behave.

---

# 📌 Why Didn't We Create manifest.json?

Instead of writing:

```
manifest.json
```

we created:

```
manifest.config.ts
```

Many beginners get confused here.

The reason is simple.

We are using **CRXJS**.

CRXJS automatically converts

```text
manifest.config.ts

↓

manifest.json
```

during the build process.

This gives us two advantages.

### Advantage 1

We can write our manifest using TypeScript.

### Advantage 2

Auto completion works.

### Advantage 3

Less chances of syntax mistakes.

---

# 🚀 What is CRXJS?

CRXJS is a Vite plugin specially designed for Chrome Extension development.

Without CRXJS

our build would look like this.

```text
React

↓

Vite Build

↓

Website
```

With CRXJS

```text
React

↓

Vite Build

↓

CRXJS

↓

Chrome Extension
```

CRXJS generates all the files Chrome expects.

Because of this plugin,

we don't have to manually configure many extension files.

---

# 📦 Packages Installed

We installed two packages.

```bash
npm install -D @crxjs/vite-plugin @types/chrome
```

Let's understand why.

---

## @crxjs/vite-plugin

Purpose:

Converts a Vite project into a Chrome Extension.

Without this package

Chrome Extension build is not possible.

---

## @types/chrome

Purpose:

Provides TypeScript definitions for Chrome APIs.

Example:

Later in this project we will use APIs such as

```ts
chrome.tabs

chrome.runtime

chrome.storage

chrome.action
```

Without @types/chrome,

TypeScript will show errors because it does not know these APIs.

Installing this package prepares our project for future Chrome API development.

---

# 🏗 Architecture Before Day 2

```text
React App

Browser

↓

index.html

↓

main.tsx

↓

App.tsx
```

---

# 🏗 Architecture After Day 2 (Target)

```text
Chrome

↓

Manifest

↓

Popup

↓

index.html

↓

main.tsx

↓

App.tsx
```

Notice that Manifest becomes the new entry point.

This is the biggest architectural change introduced on Day 2.

---

# 📝 Summary of Part 1

In this part we learned:

✅ Difference between a React application and a Chrome Extension.

✅ Why Chrome requires a Manifest file.

✅ Why we created `manifest.config.ts` instead of `manifest.json`.

✅ What CRXJS does internally.

✅ Why `@types/chrome` is required.

✅ How the startup flow changes when converting a React app into a Chrome Extension.

---

➡️ **Next:** Part 2 will cover the actual implementation, including `manifest.config.ts`, `vite.config.ts`, `App.tsx`, and the complete build process.