# Cursor Mental Models – AI Terms Dictionary

A minimal static website demo for a live presentation about Cursor. This site explains how to **think** about Cursor using high-level mental models—conceptual roles that Cursor can play in your development workflow.

## What Are Mental Models?

Mental models are frameworks for understanding how to use Cursor effectively. Each model represents a different way of thinking about Cursor's capabilities:

- **Cursor as a Planner** - Breaking down complex tasks into actionable steps
- **Cursor as a Pair Programmer** - Real-time collaboration and code suggestions
- **Cursor as a Code Reviewer** - Analyzing code for bugs and best practices
- **Cursor as a CI Fixer** - Understanding and fixing CI test failures
- **Cursor as a Knowledge Retriever** - Searching and understanding your codebase

## Project Overview

This is a **demo project** designed for a live presentation. It is intentionally simple and static:

- No frameworks or build tools
- No backend or external services
- Plain HTML, CSS, and vanilla JavaScript
- All content loaded from a single JSON file
- Works by simply opening `index.html` in a browser

## How to Run Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
   - You can double-click the file, or
   - Use a local server if needed (some browsers require this for fetch API):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (if you have http-server installed)
     npx http-server
     ```
3. Navigate to `http://localhost:8000` (or the port shown)

## File Structure

```
/
├── index.html              # Main HTML structure
├── styles.css              # All styling
├── app.js                  # JavaScript logic
├── data/
│   └── mental-models.json  # Content data
└── README.md               # This file
```

## Features

- **Dynamic Content Loading** - All mental models loaded from JSON
- **Search Functionality** - Filter models by title or description
- **Interactive Cards** - Click any card to view detailed information
- **Modal Details View** - See full explanations, features, and documentation links
- **Responsive Design** - Works on desktop and mobile devices

## Design Philosophy

This demo prioritizes:
- **Clarity over cleverness** - Simple, readable code
- **Explicit over implicit** - No magic, everything is straightforward
- **Accessibility** - Works for non-frontend developers
- **No dependencies** - Pure vanilla web technologies

## For Presenters

This site demonstrates how Cursor can help build even simple projects quickly. The codebase is intentionally minimal to show that powerful functionality doesn't always require complex tooling.

