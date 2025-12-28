// Global state
let allModels = [];
let filteredModels = [];

// DOM elements
const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const errorMessage = document.getElementById('errorMessage');

/**
 * Load mental models data from JSON file
 */
async function loadData() {
    try {
        const response = await fetch('data/mental-models.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format: expected an array');
        }
        
        // Validate each model has required fields
        data.forEach((model, index) => {
            if (!model.id || !model.title) {
                throw new Error(`Model at index ${index} is missing required fields (id or title)`);
            }
        });
        
        allModels = data;
        filteredModels = [...allModels];
        renderCards(filteredModels);
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError(`Unable to load mental models data. ${error.message}`);
    }
}

/**
 * Render cards from models array
 */
function renderCards(models) {
    if (!cardsContainer) {
        console.error('Cards container not found');
        return;
    }
    
    if (models.length === 0) {
        cardsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No mental models found matching your search.</p>';
        return;
    }
    
    cardsContainer.innerHTML = models.map(model => {
        const features = (model.relatedFeatures || []).map(feature => 
            `<span class="feature-tag">${escapeHtml(feature)}</span>`
        ).join('');
        
        return `
            <div class="card" data-model-id="${escapeHtml(model.id)}">
                <h2 class="card-title">${escapeHtml(model.title)}</h2>
                <p class="card-description">${escapeHtml(model.shortDescription || '')}</p>
                <div class="card-features">
                    ${features}
                </div>
            </div>
        `;
    }).join('');
    
    // Attach click handlers to cards
    const cardElements = cardsContainer.querySelectorAll('.card');
    cardElements.forEach(card => {
        card.addEventListener('click', () => {
            const modelId = card.getAttribute('data-model-id');
            const model = allModels.find(m => m.id === modelId);
            if (model) {
                openModal(model);
            }
        });
    });
}

/**
 * Handle search input
 */
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        filteredModels = [...allModels];
    } else {
        const searchTermLower = searchTerm.toLowerCase();
        filteredModels = allModels.filter(model => {
            const title = (model.title || '');
            return title.toLowerCase().includes(searchTermLower);
        });
    }
    
    renderCards(filteredModels);
}

/**
 * Render modal content from model data
 */
function renderModal(model) {
    if (!model) {
        return '';
    }
    
    const title = escapeHtml(model.title || '');
    const detailedExplanation = model.detailedExplanation || [];
    const relatedFeatures = model.relatedFeatures || [];
    const docs = model.docs || [];
    
    // Build explanation list
    const explanationItems = detailedExplanation.map(item => 
        `<li>${escapeHtml(item)}</li>`
    ).join('');
    
    // Build features tags
    const featureTags = relatedFeatures.map(feature => 
        `<span class="feature-tag">${escapeHtml(feature)}</span>`
    ).join('');
    
    // Build documentation links
    const docLinks = docs.map(doc => 
        `<li><a href="${escapeHtml(doc.url || '#')}" target="_blank" rel="noopener noreferrer">${escapeHtml(doc.label || 'Documentation')}</a></li>`
    ).join('');
    
    return `
        <h2 class="modal-title">${title}</h2>
        <div class="modal-explanation">
            <ul>
                ${explanationItems}
            </ul>
        </div>
        <div class="modal-features">
            <h3>Related Features</h3>
            <div class="card-features">
                ${featureTags}
            </div>
        </div>
        ${docLinks ? `
        <div class="modal-docs">
            <h3>Documentation</h3>
            <ul>
                ${docLinks}
            </ul>
        </div>
        ` : ''}
    `;
}

/**
 * Open modal with model details
 */
function openModal(model) {
    if (!modalOverlay || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    modalBody.innerHTML = renderModal(model);
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close modal
 */
function closeModal() {
    if (!modalOverlay) {
        return;
    }
    
    modalOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Show error message
 */
function showError(message) {
    if (!errorMessage) {
        console.error('Error message element not found');
        return;
    }
    
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Hide error message
 */
function hideError() {
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (text == null) {
        return '';
    }
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load data
    loadData();
    
    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            // Close if clicking the backdrop (not the modal content)
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });
});

