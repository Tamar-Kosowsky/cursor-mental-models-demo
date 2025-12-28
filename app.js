// Global state
let allModels = [];
let currentFilteredModels = [];
const hasDocument = typeof document !== 'undefined';

// DOM elements (guarded for non-browser environments, e.g., tests)
const searchInput = hasDocument ? document.getElementById('search-input') : null;
const cardsContainer = hasDocument ? document.getElementById('cards-container') : null;
const noResults = hasDocument ? document.getElementById('no-results') : null;
const errorMessage = hasDocument ? document.getElementById('error-message') : null;
const modalOverlay = hasDocument ? document.getElementById('modal-overlay') : null;
const modalBody = hasDocument ? document.getElementById('modal-body') : null;
const modalClose = hasDocument ? document.getElementById('modal-close') : null;

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/mental-models.json');
        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
        }
        allModels = await response.json();
        currentFilteredModels = allModels;
        renderCards(allModels);
    } catch (error) {
        console.error('Error loading data:', error);
        if (errorMessage) {
            errorMessage.textContent = `Error: Unable to load mental models data. ${error.message}`;
            errorMessage.style.display = 'block';
        }
        if (cardsContainer) {
            cardsContainer.style.display = 'none';
        }
    }
}

// Create a single card element
function renderCard(model) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', model.id);
    
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = model.title;
    
    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = model.shortDescription;
    
    const featuresContainer = document.createElement('div');
    featuresContainer.className = 'card-features';
    
    model.relatedFeatures.forEach(feature => {
        const tag = document.createElement('span');
        tag.className = 'feature-tag';
        tag.textContent = feature;
        featuresContainer.appendChild(tag);
    });
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(featuresContainer);
    
    // Add click handler
    card.addEventListener('click', () => {
        openModal(model);
    });
    
    return card;
}

// Render all cards
function renderCards(models) {
    if (!cardsContainer || !noResults) {
        return;
    }
    cardsContainer.innerHTML = '';
    noResults.style.display = 'none';
    
    if (models.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    models.forEach(model => {
        const card = renderCard(model);
        cardsContainer.appendChild(card);
    });
}

// Handle search input
function handleSearch(query) {
    currentFilteredModels = filterModels(allModels, query);
    renderCards(currentFilteredModels);
}

// Open modal with model details
function openModal(model) {
    if (!hasDocument || !modalOverlay || !modalBody || !modalClose) {
        return;
    }
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const title = document.createElement('h2');
    title.id = 'modal-title';
    title.className = 'modal-title';
    title.textContent = model.title;
    
    const explanation = document.createElement('div');
    explanation.className = 'modal-explanation';
    const explanationList = document.createElement('ul');
    model.detailedExplanation.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        explanationList.appendChild(li);
    });
    explanation.appendChild(explanationList);
    
    const features = document.createElement('div');
    features.className = 'modal-features';
    const featuresTitle = document.createElement('h3');
    featuresTitle.textContent = 'Related Features:';
    features.appendChild(featuresTitle);
    const featuresContainer = document.createElement('div');
    featuresContainer.className = 'modal-features-tags';
    model.relatedFeatures.forEach(feature => {
        const tag = document.createElement('span');
        tag.className = 'feature-tag';
        tag.textContent = feature;
        featuresContainer.appendChild(tag);
    });
    features.appendChild(featuresContainer);
    
    const docs = document.createElement('div');
    docs.className = 'modal-docs';
    const docsTitle = document.createElement('h3');
    docsTitle.textContent = 'Documentation:';
    docs.appendChild(docsTitle);
    const docsList = document.createElement('ul');
    docsList.className = 'modal-docs-list';
    model.docs.forEach(doc => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = doc.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = doc.label;
        li.appendChild(link);
        docsList.appendChild(li);
    });
    docs.appendChild(docsList);
    
    modalBody.innerHTML = '';
    modalBody.appendChild(title);
    modalBody.appendChild(explanation);
    modalBody.appendChild(features);
    modalBody.appendChild(docs);
    
    // Focus management for accessibility
    modalClose.focus();
}

// Close modal
function closeModal() {
    if (!hasDocument || !modalOverlay || !modalBody) {
        return;
    }
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
}

// Search utility (exported for testing)
function filterModels(models, query) {
    const safeModels = Array.isArray(models) ? models : [];
    const searchTerm = (query || '').trim().toLowerCase();

    if (searchTerm === '') {
        return safeModels;
    }

    return safeModels.filter(model => {
        const searchableFields = [
            model?.title,
            model?.shortDescription,
            ...(Array.isArray(model?.relatedFeatures) ? model.relatedFeatures : []),
            ...(Array.isArray(model?.detailedExplanation) ? model.detailedExplanation : []),
            ...(Array.isArray(model?.docs) ? model.docs.map(doc => doc.label) : [])
        ];

        return searchableFields.some(field => 
            typeof field === 'string' && field.toLowerCase().includes(searchTerm)
        );
    });
}

// Event listeners
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        closeModal();
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

if (hasDocument) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });
}

// Initialize on page load
if (hasDocument) {
    loadData();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterModels };
}

