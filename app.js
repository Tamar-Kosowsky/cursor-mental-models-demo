// Global state
let allMentalModels = [];
let filteredMentalModels = [];

// DOM elements
const cardsContainer = document.getElementById('cards-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/mental-models.json');
        if (!response.ok) {
            throw new Error('Failed to load mental models data');
        }
        allMentalModels = await response.json();
        filteredMentalModels = [...allMentalModels];
        renderCards(filteredMentalModels);
    } catch (error) {
        console.error('Error loading data:', error);
        cardsContainer.innerHTML = '<p style="text-align: center; color: #666;">Error loading mental models. Please refresh the page.</p>';
    }
}

// Render cards from mental models array
function renderCards(models) {
    if (models.length === 0) {
        cardsContainer.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No mental models found matching your search.</p>';
        return;
    }

    cardsContainer.innerHTML = models.map(model => `
        <div class="card" data-id="${model.id}">
            <h2 class="card-title">${escapeHtml(model.title)}</h2>
            <p class="card-description">${escapeHtml(model.shortDescription)}</p>
            <div class="card-features">
                ${model.relatedFeatures.map(feature => 
                    `<span class="feature-tag">${escapeHtml(feature)}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');

    // Add click listeners to cards
    const cards = cardsContainer.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modelId = card.getAttribute('data-id');
            openModal(modelId);
        });
    });
}

// Render modal content
function renderModal(model) {
    modalBody.innerHTML = `
        <h2 class="modal-title">${escapeHtml(model.title)}</h2>
        <div class="modal-explanation">
            <ul>
                ${model.detailedExplanation.map(point => 
                    `<li>${escapeHtml(point)}</li>`
                ).join('')}
            </ul>
        </div>
        <div class="modal-features">
            <h3>Related Features</h3>
            <div class="card-features">
                ${model.relatedFeatures.map(feature => 
                    `<span class="feature-tag">${escapeHtml(feature)}</span>`
                ).join('')}
            </div>
        </div>
        <div class="modal-docs">
            <h3>Documentation</h3>
            ${model.docs.map(doc => 
                `<a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(doc.label)}</a>`
            ).join('')}
        </div>
    `;
    
    // Note: Link click handling is done via event delegation on modalBody (set up once below)
    // This prevents duplicate listeners from accumulating when modal is reopened
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value;
    filteredMentalModels = filterMentalModels(allMentalModels, query);
    renderCards(filteredMentalModels);
}

// Open modal with selected model
function openModal(modelId) {
    const model = allMentalModels.find(m => m.id === modelId);
    if (model) {
        renderModal(model);
        modalOverlay.classList.add('active');
    }
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event listeners
searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

modalClose.addEventListener('click', closeModal);

// Event delegation for modal links - set up once, works for all dynamically created links
// This prevents duplicate listeners from accumulating when modal is reopened
modalBody.addEventListener('click', (e) => {
    const clickedLink = e.target.closest('a');
    if (clickedLink) {
        // Links work normally - no need to prevent default or stop propagation
        // The overlay handler below ensures clicks on links don't close the modal
    }
});

// Close modal when clicking outside (on overlay, not on content)
modalOverlay.addEventListener('click', (e) => {
    const modalContent = e.target.closest('.modal-content');
    
    // Only close if clicking directly on the overlay (not on modal-content or its children, including links)
    // Check if click is inside modal-content - if so, don't close
    if (e.target === modalOverlay && !modalContent) {
        closeModal();
    }
    // If clicking on modal-content or its children (including links), don't close - allow normal behavior
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);
