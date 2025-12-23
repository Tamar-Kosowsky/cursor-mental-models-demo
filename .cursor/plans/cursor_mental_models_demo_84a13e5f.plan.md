---
name: Cursor Mental Models Demo
overview: Create a static single-page website that displays Cursor mental models as interactive cards, with search functionality and modal details view. All content loaded from JSON, no frameworks or build tools.
todos:
  - id: create-json
    content: Create data/mental-models.json with 5 mental model objects (Planner, Pair Programmer, Code Reviewer, CI Fixer, Knowledge Retriever)
    status: completed
  - id: create-html-skeleton
    content: Create index.html with header, search section, cards container, and modal structure
    status: completed
  - id: create-css-base
    content: Create styles.css with reset, design system variables, and base layout styles
    status: completed
  - id: implement-load-data
    content: Implement loadData() function in app.js to fetch and parse mental-models.json
    status: completed
    dependencies:
      - create-json
  - id: implement-render-cards
    content: Implement renderCards() function to generate card HTML from model data and insert into DOM
    status: completed
    dependencies:
      - create-html-skeleton
      - implement-load-data
  - id: implement-render-modal
    content: Implement renderModal() function to generate modal content with detailed explanation, features, and docs
    status: completed
    dependencies:
      - create-html-skeleton
      - implement-load-data
  - id: implement-search
    content: Implement handleSearch() function with case-insensitive filtering by title and description
    status: completed
    dependencies:
      - implement-render-cards
  - id: implement-modal-open
    content: Implement openModal() function to show modal with selected model details
    status: completed
    dependencies:
      - implement-render-modal
  - id: implement-modal-close
    content: Implement closeModal() function to hide modal overlay
    status: completed
    dependencies:
      - implement-modal-open
  - id: add-event-listeners
    content: Add event listeners for search button, card clicks, and modal close button
    status: completed
    dependencies:
      - implement-search
      - implement-modal-open
      - implement-modal-close
  - id: style-cards
    content: Style cards in styles.css (white background, rounded corners, shadow, hover effects)
    status: completed
    dependencies:
      - create-css-base
  - id: style-modal
    content: Style modal overlay and content box in styles.css (centered, backdrop, proper spacing)
    status: completed
    dependencies:
      - create-css-base
  - id: style-feature-tags
    content: Style feature tags in styles.css (light blue background, darker blue text, rounded)
    status: completed
    dependencies:
      - create-css-base
  - id: create-readme
    content: Create README.md explaining project purpose, how to run locally, and mental models concept
    status: completed
  - id: test-locally
    content: Test by opening index.html in browser - verify data loads, search works, modal opens/closes
    status: completed
    dependencies:
      - add-event-listeners
      - style-cards
      - style-modal
      - style-feature-tags
---

# Cursor Mental Models Demo - Implementation Plan

## Architecture Overview

A minimal static website with three core files plus data:

- `index.html` - Structure and semantic markup
- `styles.css` - All styling (no inline styles)
- `app.js` - Data loading, rendering, search, and modal logic
- `data/mental-models.json` - Content source (5 mental models)

## File Responsibilities

### [index.html](index.html)

- Semantic HTML structure
- Header with title and subtitle
- Search input with button
- Container for dynamically rendered cards
- Modal overlay structure (hidden by default)
- No hardcoded content (cards rendered via JS)

### [styles.css](styles.css)

- CSS reset/normalize basics
- Design system variables (colors, spacing)
- Layout styles (header, search, grid)
- Card styles (white background, rounded corners, shadow)
- Modal overlay styles (centered, backdrop)
- Feature tag styles (light blue background)
- Responsive grid (cards wrap on smaller screens)

### [app.js](app.js)

- `loadData()` - Fetch and parse `data/mental-models.json`
- `renderCards(models)` - Generate card HTML from data
- `renderModal(model)` - Generate modal content from selected model
- `handleSearch()` - Filter models by title/description (case-insensitive)
- `openModal(modelId)` - Show modal with selected model details
- `closeModal()` - Hide modal
- Event listeners (search button, card clicks, close button)

### [data/mental-models.json](data/mental-models.json)

- Array of 5 mental model objects
- Each with: id, title, shortDescription, detailedExplanation, relatedFeatures, docs

## Data Flow

```javascript
JSON File → loadData() → renderCards() → DOM
                ↓
         Search Filter → renderCards() → DOM
                ↓
         Card Click → openModal() → renderModal() → DOM
```