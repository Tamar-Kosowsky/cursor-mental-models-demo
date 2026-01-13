---
name: Cursor Mental Models Demo Site
overview: Build a static single-page demo website that displays mental model cards from JSON data, with search functionality and modal details view. All files are plain HTML/CSS/vanilla JS with no frameworks or build tools.
todos:
  - id: create-html-skeleton
    content: "Create index.html with semantic structure: header (title + subtitle), search input, cards container div, modal overlay structure"
    status: completed
  - id: create-css-reset
    content: Create styles.css with basic reset and color variables/constants for the design system
    status: completed
  - id: create-css-layout
    content: Implement CSS Grid layout for cards container, card styling (white bg, rounded corners, shadow), and spacing
    status: completed
    dependencies:
      - create-css-reset
  - id: create-css-modal
    content: Style modal overlay (fixed positioning, backdrop, centered content box) and feature tags
    status: completed
    dependencies:
      - create-css-reset
  - id: create-json-structure
    content: Create data/mental-models.json with 3-5 sample mental model entries following the schema (id, title, shortDescription, detailedExplanation, relatedFeatures, docs)
    status: completed
  - id: implement-load-data
    content: Implement loadData() function in app.js to fetch and parse mental-models.json
    status: completed
    dependencies:
      - create-json-structure
  - id: implement-render-cards
    content: Implement renderCards(models) function to generate card HTML from data array and insert into DOM
    status: completed
    dependencies:
      - implement-load-data
      - create-html-skeleton
  - id: implement-search
    content: Implement handleSearch(query) function to filter models by title (case-insensitive) and re-render cards
    status: completed
    dependencies:
      - implement-render-cards
  - id: implement-modal-render
    content: Implement renderModal(model) function to generate modal HTML with title, detailed explanation bullets, feature tags, and doc links
    status: completed
    dependencies:
      - implement-load-data
  - id: implement-modal-open
    content: Add click event listeners to cards to open modal with selected model data
    status: completed
    dependencies:
      - implement-render-cards
      - implement-modal-render
  - id: implement-modal-close
    content: Add click handlers for modal close (close button and click outside backdrop) to hide modal
    status: completed
    dependencies:
      - implement-modal-open
  - id: wire-search-input
    content: Attach input event listener to search input field to trigger handleSearch on user typing
    status: completed
    dependencies:
      - implement-search
  - id: add-error-handling
    content: Add error handling for JSON fetch failures (display user-friendly message)
    status: completed
    dependencies:
      - implement-load-data
  - id: create-readme
    content: Create README.md explaining project purpose, tech stack, how to run locally, and mental models concept
    status: completed
  - id: test-locally
    content: "Test by opening index.html in browser: verify cards render, search works, modal opens/closes, styling looks correct"
    status: completed
    dependencies:
      - wire-search-input
      - implement-modal-close
      - create-readme
  - id: todo-1768331378029-ughru6f56
    content: ""
    status: pending
---

# Cursor Mental Models Demo Site - Implementation Plan

## File Responsibilities

### `index.html`

- Minimal HTML skeleton with semantic structure
- Header section with title and subtitle
- Search input element
- Container div for cards grid
- Modal overlay structure (hidden by default)
- No inline styles or hardcoded content

### `styles.css`

- Reset/normalize basic styles
- Layout: header, search bar, cards grid (CSS Grid)
- Card styling: white background, rounded corners, shadow, padding
- Modal overlay: full-screen overlay with centered content box
- Feature tags: light blue background styling
- Responsive considerations (basic mobile-friendly)
- Color palette:
  - Background: `#f5f5f5`
  - Cards: `white`
  - Primary text: `#222` / `#333`
  - Secondary text: `#666`
  - Accent: `#4f8cff`
  - Feature tags: light blue background

### `app.js`

- `loadData()`: Fetch `data/mental-models.json` using `fetch()`
- `renderCards(models)`: Generate card HTML from data array
- `renderModal(model)`: Generate modal content HTML
- `handleSearch(query)`: Filter models by title (case-insensitive)
- Event listeners:
  - Search input: `input` event → filter and re-render cards
  - Card clicks: open modal with selected model
  - Modal close: click outside or close button → hide modal
- Error handling for JSON load failures

### `data/mental-models.json`

- JSON array of mental model objects
- Each object includes:
  - `id`: unique string identifier
  - `title`: display title (e.g., "Cursor as a Planner")
  - `shortDescription`: 1-2 sentence summary
  - `detailedExplanation`: array of strings (bullet points)
  - `relatedFeatures`: array of feature name strings
  - `docs`: array of `{ label: string, url: string }` objects
- Include 3-5 sample entries to demonstrate structure

### `README.md`

- Project description: static demo for Cursor presentation
- Purpose: explain mental models (conceptual roles Cursor can play)
- Tech stack: plain HTML/CSS/vanilla JS
- How to run: open `index.html` in a browser
- Brief explanation of what mental models represent conceptually 
- 

## Data Flow

```
data/mental-models.json
    ↓ (fetch on page load)
app.js: loadData()
    ↓ (parse JSON)
models array
    ↓ (render)
renderCards(models)
    ↓ (generate HTML)
DOM: cards grid
```

## Interaction Flow

```
User types in search → handleSearch(query)
    ↓ (filter by title, case-insensitive)
Filtered models array
    ↓ (re-render)
renderCards(filteredModels)
    ↓
Updated cards grid

User clicks card → openModal(model)
    ↓ (generate modal HTML)
renderModal(model)
    ↓ (show overlay)
Modal visible with details

User clicks close/outside → closeModal()
    ↓ (hide overlay)
Modal hidden
```

## Technical Considerations

- Use `fetch()` for loading JSON (works with `file://` protocol in modern browsers)
- CSS Grid for responsive card layout
- Modal uses fixed positioning with backdrop
- Search is real-time (on input event)
- No external dependencies or CDN links
- System fonts only (no web fonts)