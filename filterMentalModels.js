function filterMentalModels(models, query) {
    const safeModels = Array.isArray(models) ? models : [];
    const normalizedQuery = (query || '').trim().toLowerCase();

    if (normalizedQuery === '') {
        return [...safeModels];
    }

    return safeModels.filter(model => {
        const title = (model?.title || '').toLowerCase();
        const shortDescription = (model?.shortDescription || '').toLowerCase();
        return title.includes(normalizedQuery) || shortDescription.includes(normalizedQuery);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterMentalModels };
} else if (typeof window !== 'undefined') {
    window.filterMentalModels = filterMentalModels;
}
