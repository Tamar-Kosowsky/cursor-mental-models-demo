# Cursor Mental Models – AI Terms Dictionary

A minimal static website that explains how to think about Cursor using high-level mental models. Each mental model represents a conceptual role that Cursor can play in your development workflow.

## Purpose

This is a **demo project** created for a live Cursor presentation. It demonstrates how to build a simple, static website without any frameworks, build tools, or external dependencies.

## What Are Mental Models?

Mental models are conceptual frameworks that help you understand how to use Cursor effectively. Instead of thinking about Cursor as just a tool, these models help you understand the different *roles* Cursor can play:

- **Cursor as a Planner** - Strategic planning and task breakdown
- **Cursor as a Pair Programmer** - Collaborative coding partner
- **Cursor as a Code Reviewer** - Code quality and bug detection
- **Cursor as a CI Fixer** - Debugging CI/CD pipeline issues
- **Cursor as a Knowledge Retriever** - Searching and understanding your codebase

Each mental model helps you frame your questions and interactions with Cursor in a way that leads to better results.

## How to Run

Simply open `index.html` in your web browser. No build step, no server, no installation required.

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. That's it!

## Project Structure

```text
├── index.html              # Main HTML file
├── styles.css              # All styling
├── app.js                  # JavaScript functionality
├── data/
│   └── mental-models.json  # Content data (all mental models)
└── README.md              # This file
```

## Technical Details

This project is intentionally simple:

- **Plain HTML** - No templating or frameworks
- **Plain CSS** - No CSS preprocessors or frameworks
- **Vanilla JavaScript** - No libraries or frameworks
- **Static JSON** - All content loaded from a single JSON file
- **No build tools** - Works directly in the browser
- **No backend** - Everything runs client-side

The site loads data dynamically from `data/mental-models.json` and renders everything using vanilla JavaScript. All interactions (search, modal display) are handled with simple event listeners.

## Features

- **Card-based UI** - Browse mental models as cards
- **Real-time Search** - Filter models as you type
- **Detailed Modal View** - Click any card to see full details
- **Responsive Design** - Works on different screen sizes
- **Accessible** - Semantic HTML and keyboard navigation

## For Presenters

This demo showcases:
- How Cursor can help build complete projects from scratch
- The importance of clear requirements and planning
- Building simple, maintainable code without over-engineering
- Creating a working prototype quickly

The code is intentionally explicit and readable, making it easy to explain to non-frontend developers.

