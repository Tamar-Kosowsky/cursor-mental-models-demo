// Global state
let allModels = [];
let currentFilteredModels = [];

// DOM elements
const searchInput = document.getElementById('search-input');
const cardsContainer = document.getElementById('cards-container');
const noResults = document.getElementById('no-results');
const errorMessage = document.getElementById('error-message');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

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
        errorMessage.textContent = `Error: Unable to load mental models data. ${error.message}`;
        errorMessage.style.display = 'block';
        cardsContainer.style.display = 'none';
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
    const searchTerm = query.trim().toLowerCase();
    
    if (searchTerm === '') {
        currentFilteredModels = allModels;
        renderCards(allModels);
        return;
    }
    
    currentFilteredModels = allModels.filter(model => {
        const titleMatch = model.title.toLowerCase().includes(searchTerm);
        const descMatch = model.shortDescription.toLowerCase().includes(searchTerm);
        return titleMatch || descMatch;
    });
    
    renderCards(currentFilteredModels);
}

// Open modal with model details
function openModal(model) {
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
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
});

modalClose.addEventListener('click', () => {
    closeModal();
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        closeModal();
    }
});

// Initialize on page load
loadData();

