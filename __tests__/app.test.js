describe('escapeHtml', () => {
    beforeEach(() => {
        jest.resetModules();
        document.body.innerHTML = `
            <div id="cards-container"></div>
            <input id="search-input" />
            <button id="search-button"></button>
            <div id="modal-overlay">
                <div class="modal-content"></div>
            </div>
            <div id="modal-body"></div>
            <button id="modal-close"></button>
        `;
    });

    test('escapes special characters in text nodes', () => {
        const { escapeHtml } = require('../app');
        const maliciousString = '<script>alert("xss")</script>';

        expect(escapeHtml(maliciousString)).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    });
});
