---
name: Cursor Mental Models Demo Site
overview: Create a static, single-page demo website that displays mental models for understanding Cursor. The site will load data from JSON, render cards in a grid, support title-based search, and show detailed modals on card click.
todos:
  - id: create-directory-structure
    content: Create data/ directory for mental-models.json file
    status: completed
  - id: create-json-data
    content: Create data/mental-models.json with sample data for 5 mental models (Planner, Pair Programmer, Code Reviewer, CI Fixer, Knowledge Retriever), including all required fields and real Cursor documentation URLs
    status: completed
  - id: create-html-skeleton
    content: Create index.html with semantic HTML5 structure, header with title/subtitle, search input, cards container div, and modal overlay structure
    status: completed
  - id: link-css-js
    content: Link styles.css and app.js files in index.html head and body sections
    status: completed
  - id: create-css-variables
    content: Define CSS color variables in styles.css (background, text colors, accent blue)
    status: completed
  - id: style-header-search
    content: Style header section and search input in styles.css with appropriate typography and spacing
    status: completed
  - id: create-card-grid
    content: Implement CSS Grid layout for cards container with responsive auto-fill columns
    status: completed
  - id: style-cards
    content: Style individual cards with white background, rounded corners, shadow, padding, and hover effects
    status: completed
  - id: style-feature-tags
    content: Style feature tags with light blue background and darker blue text
    status: completed
  - id: style-modal-overlay
    content: Create modal overlay styles with fixed positioning, backdrop darkening, and centered content container
    status: completed
  - id: style-modal-content
    content: Style modal content with close button, title, bullet points for detailed explanation, and documentation links
    status: completed
  - id: implement-load-data
    content: Implement loadData() function in app.js to fetch and parse mental-models.json using fetch API
    status: completed
  - id: implement-render-cards
    content: Implement renderCards() function to generate card HTML from models array and insert into DOM
    status: completed
  - id: implement-search
    content: Implement handleSearch() function with case-insensitive title filtering and re-render cards on input
    status: completed
  - id: implement-modal-functions
    content: Implement openModal() and renderModal() functions to display detailed model information
    status: completed
  - id: implement-close-modal
    content: Implement closeModal() function and attach event listeners for backdrop click, close button, and ESC key
    status: completed
  - id: attach-event-listeners
    content: Attach all event listeners on page load (search input, card clicks, modal interactions)
    status: completed
  - id: add-error-handling
    content: Add error handling for JSON fetch failures and missing data fields with user-friendly messages
    status: completed
  - id: create-readme
    content: Create README.md explaining the project purpose, demo nature, how to run locally, and what mental models represent conceptually
    status: completed
---

# Cursor Mental Models Demo Site - Implementation Plan

## Architecture Overview

A minimal static website with three core files plus a data file. All content is loaded dynamically from JSON, ensuring no hardcoded content in HTML.

### File Responsibilities

- **`index.html`**: Skeleton structure with header, search input, cards container, and modal overlay
- **`styles.css`**: Complete styling system following the design requirements (light gray background, white cards, soft blue accents)
- **`app.js`**: Handles data loading, card rendering, search filtering, and modal interactions
- **`data/mental-models.json`**: Single source of truth for all mental model content

### Data Flow

```javascript
mental-models.json → app.js (loadData) → renderCards() → DOM
```



1. On page load, `app.js` fetches `data/mental-models.json`
2. Data is parsed and stored in a JavaScript array
3. `renderCards()` generates HTML for each mental model card
4. Search filters the array by title (case-insensitive) and re-renders
5. Click handlers attach to cards to open modals with detailed content

### Interaction Flow

1. **Page Load**: Fetch JSON → Render all cards
2. **Search**: User types → Filter array by title → Re-render filtered cards
3. **Card Click**: Open modal → Populate with model details → Show overlay
4. **Modal Close**: Click backdrop or close button → Hide modal

### Implementation Details

#### HTML Structure (`index.html`)

- Semantic HTML5 structure
- Header with title "Cursor Mental Models" and subtitle
- Search input with placeholder
- Grid container for cards (CSS Grid)
- Modal overlay (initially hidden)
- Modal content container with close button

#### CSS Design System (`styles.css`)

- CSS variables for colors (background, text, accent)
- Grid layout for cards (responsive, auto-fill)
- Card styling: white background, rounded corners, shadow, padding
- Modal overlay: fixed position, backdrop blur/darkening
- Feature tags: light blue background with darker blue text
- System fonts stack (San Francisco, system-ui, sans-serif)
- Smooth transitions for interactions

#### JavaScript Logic (`app.js`)

- `loadData()`: Fetch and parse JSON using `fetch()` API
- `renderCards(models)`: Generate card HTML from data array
- `renderModal(model)`: Generate modal content from selected model
- `handleSearch()`: Filter models array by title (case-insensitive)
- `openModal(model)`: Show modal with model details
- `closeModal()`: Hide modal overlay
- Event listeners: search input, card clicks, modal close

#### JSON Structure (`data/mental-models.json`)

- Array of mental model objects
- Each object contains: `id`, `title`, `shortDescription`, `detailedExplanation` (array), `relatedFeatures` (array), `docs` (array of `{label, url}` objects)
- Sample data for 5 mental models: Planner, Pair Programmer, Code Reviewer, CI Fixer, Knowledge Retriever
- Real Cursor documentation URLs where available

### Key Design Decisions

1. **No frameworks**: Pure vanilla JavaScript for maximum simplicity
2. **Dynamic rendering**: All content from JSON, no hardcoded HTML
3. **Case-insensitive search**: User-friendly filtering
4. **Modal pattern**: Clean overlay for detailed information
5. **CSS Grid**: Simple, responsive card layout
6. **System fonts**: No external font loading required

### Error Handling

- JSON fetch errors: Display user-friendly message