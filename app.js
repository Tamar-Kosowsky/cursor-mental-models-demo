// Global state
let allModels = [];
let filteredModels = [];

// Load data from JSON file
async function loadData() {
    try {
        const response = await fetch('data/mental-models.json');
        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.status}`);
        }
        allModels = await response.json();
        filteredModels = allModels;
        renderCards(filteredModels);
    } catch (error) {
        console.error('Error loading data:', error);
        const container = document.getElementById('cards-container');
        container.innerHTML = '<p style="color: #d32f2f; text-align: center; padding: 2rem;">Failed to load mental models. Please check that data/mental-models.json exists.</p>';
    }
}

// Render cards grid
function renderCards(models) {
    const container = document.getElementById('cards-container');
    
    if (models.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">No mental models found matching your search.</p>';
        return;
    }

    container.innerHTML = models.map(model => `
        <div class="card" data-id="${model.id}">
            <h2 class="card-title">${escapeHtml(model.title)}</h2>
            <p class="card-description">${escapeHtml(model.shortDescription)}</p>
            <div class="card-features">
                ${model.relatedFeatures.slice(0, 3).map(feature => 
                    `<span class="feature-tag">${escapeHtml(feature)}</span>`
                ).join('')}
                ${model.relatedFeatures.length > 3 ? `<span class="feature-tag">+${model.relatedFeatures.length - 3} more</span>` : ''}
            </div>
        </div>
    `).join('');

    // Attach click handlers to cards
    container.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const modelId = card.getAttribute('data-id');
            const model = allModels.find(m => m.id === modelId);
            if (model) {
                openModal(model);
            }
        });
    });
}

// Render modal content
function renderModal(model) {
    const modalBody = document.getElementById('modal-body');
    
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
            <div class="modal-features-title">Related Features:</div>
            <div class="card-features">
                ${model.relatedFeatures.map(feature => 
                    `<span class="feature-tag">${escapeHtml(feature)}</span>`
                ).join('')}
            </div>
        </div>

        ${model.docs && model.docs.length > 0 ? `
            <div class="modal-docs">
                <div class="modal-docs-title">Documentation:</div>
                <ul class="modal-docs-list">
                    ${model.docs.map(doc => 
                        `<li><a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(doc.label)}</a></li>`
                    ).join('')}
                </ul>
            </div>
        ` : ''}
    `;
}

// Open modal with model data
function openModal(model) {
    renderModal(model);
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Handle search input
function handleSearch(query) {
    const searchTerm = query.trim();
    
    if (searchTerm === '') {
        filteredModels = allModels;
    } else {
        const searchTermLower = searchTerm.toLowerCase();
        filteredModels = allModels.filter(model => 
            model.title.toLowerCase().includes(searchTermLower)
        );
    }
    
    renderCards(filteredModels);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load data
    loadData();

    // Search input handler
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Modal close handlers
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        // Close if clicking the overlay (not the modal content)
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });
});
