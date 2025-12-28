---
name: Cursor Mental Models Dictionary
overview: Create a static single-page website that displays mental models for understanding Cursor, with card-based UI, real-time search, and modal details view. All content loaded from JSON, no frameworks or build tools.
todos: []
---

# Cursor Mental Models Dictionary - Implementation Plan

## Architecture Overview

A minimal static website with three core files (HTML, CSS, JS) plus a JSON data file. All content is dynamically loaded from JSON - no hardcoded HTML content. The site uses vanilla JavaScript to render cards, handle search filtering, and manage modal interactions.

## File Responsibilities

### `index.html`

- Basic HTML5 structure
- Semantic header with title and subtitle
- Search input field
- Container div for cards grid
- Modal overlay structure (initially hidden)
- Links to `styles.css` and `app.js`

### `styles.css`

- CSS reset/normalize for consistent cross-browser rendering
- Layout: header, search bar, cards grid (CSS Grid or Flexbox)
- Card styling: white background, rounded corners, shadow, hover effects
- Modal overlay: full-screen backdrop, centered content box
- Feature tags styling: light blue background with darker blue text
- Responsive considerations for presentation (works on common screen sizes)
- System font stack (no web fonts)

### `app.js`

- `loadData()`: Fetch and parse `data/mental-models.json`
- `renderCards(models)`: Generate card HTML from data, inject into DOM
- `renderCard(model)`: Create individual card element with title, description, feature tags
- `handleSearch(query)`: Filter models array, re-render cards
- `openModal(model)`: Show modal with detailed explanation, features, docs links
- `closeModal()`: Hide modal overlay
- Event listeners: search input, card clicks, modal close button, ESC key, outside click

### `data/mental-models.json`

- Array of 5 mental model objects
- Each object contains: `id`, `title`, `shortDescription`, `detailedExplanation` (array), `relatedFeatures` (array), `docs` (array of `{label, url}` objects)
- Example mental models:

1. Cursor as a Planner
2. Cursor as a Pair Programmer
3. Cursor as a Code Reviewer
4. Cursor as a CI Fixer
5. Cursor as a Knowledge Retriever

### `README.md`

- Project description
- Purpose: demo for live Cursor presentation
- Explanation of mental models concept
- Instructions: open `index.html` in browser
- Note about intentional simplicity (no build tools)

## Data Flow

```javascript
data/mental-models.json
    ↓ (fetch)
app.js (loadData)
    ↓ (parse JSON)
models array
    ↓ (filter on search)
filtered models
    ↓ (renderCards)
DOM cards
    ↓ (user clicks card)
openModal(model)
    ↓ (render modal content)
Modal overlay (visible)
```



## Interaction Flow

1. **Page Load**: `loadData()` fetches JSON, calls `renderCards()` with all models
2. **Search**: User types → `handleSearch()` filters models → `renderCards()` updates DOM
3. **Card Click**: User clicks card → `openModal()` shows details → modal displays explanation, features, docs
4. **Close Modal**: User clicks close/X, presses ESC, or clicks outside → `closeModal()` hides modal

## Design Specifications

- **Colors**:
- Background: `#f5f5f5`
- Cards: `white`
- Primary text: `#222` or `#333`
- Secondary text: `#666`
- Accent: `#4f8cff`
- Feature tags bg: light blue (e.g., `#e3f0ff`)
- Feature tags text: darker blue (e.g., `#2563eb`)
- **Typography**: System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- **Spacing**: Generous padding/margins (e.g., 1.5rem cards, 2rem grid gap)
- **Shadows**: Soft card shadow (`0 2px 8px rgba(0,0,0,0.1)`)

## Implementation Details

### Modal Structure

- Full-screen overlay with semi-transparent backdrop (`rgba(0,0,0,0.5)`)
- Centered content box (max-width ~600px)
- Close button (X) in top-right
- Scrollable content area if needed

### Search Implementation

- Case-insensitive matching on `title` and `shortDescription`
- Real-time filtering as user types
- Show "No results" message when filter returns empty array 

### Error Handling

- Basic try/catch for JSON fetch
- Display user-friendly error message if JSON fails to load
- Graceful degradation (show message instead of blank page)

### Accessibility Considerations

- Semantic HTML (header, main, button elements)
- ARIA labels for modal (role="dialog")
- Keyboard navigation (ESC to close modal)

## TODO List

1. **Create project structure**: Create `data/` directory and all required files (`index.html`, `styles.css`, `app.js`, `data/mental-models.json`, `README.md`)
2. **Create `index.html` skeleton**: Set up basic HTML5 structure with semantic elements (header, main), search input, cards container div, and modal overlay structure
3. **Create `data/mental-models.json`**: Define JSON schema and populate with 5 mental model objects (Planner, Pair Programmer, Code Reviewer, CI Fixer, Knowledge Retriever) with all required fields
4. **Implement `loadData()` function in `app.js`**: Fetch JSON file using `fetch()`, parse response, handle errors with try/catch, store models in a variable
5. **Implement `renderCard(model)` function**: Create DOM element for a single card with title, short description, and feature tags, return card element
6. **Implement `renderCards(models)` function**: Clear cards container, iterate through models array, call `renderCard()` for each, append cards to DOM, attach click event listeners to cards
7. **Implement `handleSearch(query)` function**: Filter models array based on case-insensitive search query matching title and shortDescription, call `renderCards()` with filtered results, show "No results" message if empty
8. **Wire up search input event listener**: Add 'input' event listener to search field, call `handleSearch()` with input value on each keystroke
9. **Implement `openModal(model)` function**: Show modal overlay, populate modal content with model's detailed explanation (bullets), related features, and documentation links, set ARIA attributes
10. **Implement `closeModal()` function**: Hide modal overlay, remove content, reset ARIA attributes
11. **Wire up modal close interactions**: Add click event listener to close button, add click event listener to overlay backdrop, add 'keydown' event listener for ESC key
12. **Create base CSS styles in `styles.css`**: Add CSS reset/normalize, set up body and root typography with system fonts, define color variables/values
13. **Style header and search bar**: Layout header with title and subtitle, style search input with appropriate sizing and spacing
14. **Style cards grid**: Create responsive grid layout for cards, style individual cards (white background, rounded corners, shadow, hover effects), style feature tags with light blue background