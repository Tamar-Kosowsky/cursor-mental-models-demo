# Cursor Mental Models – AI Terms Dictionary

A minimal static website demo for live Cursor presentations that explains how to think about Cursor using high-level mental models.

## Purpose

This site demonstrates conceptual roles that Cursor can play in software development. Each mental model card represents a different way to understand and interact with Cursor:

- **Cursor as a Planner** – Breaking down complex tasks into manageable steps
- **Cursor as a Pair Programmer** – Collaborative coding partner
- **Cursor as a Code Reviewer** – Examining code for quality and issues
- **Cursor as a CI Fixer** – Diagnosing and fixing CI/CD failures
- **Cursor as a Knowledge Retriever** – Searching and understanding codebases

Mental models help developers understand when and how to use Cursor effectively by providing conceptual frameworks for different use cases.

## Tech Stack

This is intentionally a **static demo** with no build tools or frameworks:

- Plain HTML
- Plain CSS
- Vanilla JavaScript
- No backend, APIs, or external services
- No build step required

## Running Locally

Simply open `index.html` in your web browser. That's it!

The site loads data from `data/mental-models.json` and renders it dynamically.

## Features

- **Card Grid View** – Browse all mental models at a glance
- **Search** – Filter models by title (case-insensitive)
- **Modal Details** – Click any card to see full explanation, features, and documentation links
- **Responsive Design** – Works on desktop and mobile devices

## Project Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── app.js              # JavaScript functionality
├── data/
│   └── mental-models.json  # Content data
└── README.md           # This file
```

## Demo Notes

This project is designed for live presentation demos. It prioritizes:
- **Clarity** over cleverness
- **Simplicity** over complexity
- **Readability** over optimization

Everything is intentionally straightforward so the audience can understand how it works without frontend expertise.
