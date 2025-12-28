# Cursor Mental Models – AI Terms Dictionary

A minimal static website demo that explains how to think about Cursor using high-level mental models.

## Purpose

This is a **demo project** created for a live presentation about Cursor. It demonstrates how to conceptualize Cursor's capabilities through different mental models or "roles" that Cursor can play in your development workflow.

## What Are Mental Models?

Mental models are conceptual frameworks that help you understand how to use Cursor effectively. Each mental model represents a different way of thinking about Cursor's role:

- **Cursor as a Planner**: Strategic planning partner that breaks down complex tasks
- **Cursor as a Pair Programmer**: Collaborative coding partner working alongside you
- **Cursor as a Code Reviewer**: Code review assistant for bugs and improvements
- **Cursor as a CI Fixer**: Troubleshooting assistant for CI failures and build issues
- **Cursor as a Knowledge Retriever**: Search and documentation lookup tool

These models help you frame your questions and requests to Cursor in ways that lead to better results.

## Project Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js              # JavaScript functionality
├── data/
│   └── mental-models.json  # Content data (single source of truth)
└── README.md           # This file
```

## Running Locally

This is a **static website** with no build step, backend, or external dependencies.

1. Open `index.html` in a web browser
2. That's it!

**Note**: For the JSON file to load properly, you may need to serve the files through a local web server. You can use:

- Python: `python -m http.server 8000` (then visit `http://localhost:8000`)
- Node.js: `npx http-server` (then visit the URL shown)
- VS Code: Use the "Live Server" extension

Or simply open `index.html` directly in your browser - modern browsers handle local file loading for simple demos.

## Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks, no build tools
- **Dynamic Content**: All content loaded from `data/mental-models.json`
- **Search**: Case-insensitive title-based filtering
- **Modal Details**: Click any card to see detailed information
- **Responsive**: Works on desktop and mobile devices

## Demo Intent

This site is intentionally simple and static to demonstrate core concepts without complexity. It's designed for clarity and ease of understanding, perfect for a live presentation setting.

