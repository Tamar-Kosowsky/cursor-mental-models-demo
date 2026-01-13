const test = require('node:test');
const assert = require('node:assert/strict');
const mentalModels = require('./data/mental-models.json');

test('mental models data exposes valid entries', () => {
    assert.ok(Array.isArray(mentalModels), 'Data should be an array');
    assert.ok(mentalModels.length > 0, 'Data array should not be empty');

    mentalModels.forEach((model, index) => {
        assert.ok(model && typeof model === 'object', `Model at index ${index} should be an object`);
        assert.ok(typeof model.id === 'string' && model.id.trim() !== '', `Model at index ${index} needs a non-empty id`);
        assert.ok(typeof model.title === 'string' && model.title.trim() !== '', `Model at index ${index} needs a non-empty title`);
    });
});
