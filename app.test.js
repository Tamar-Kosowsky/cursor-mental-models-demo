const test = require('node:test');
const assert = require('node:assert/strict');

const { filterModels } = require('./app.js');
const models = require('./data/mental-models.json');

test('filterModels matches related feature text', () => {
    const results = filterModels(models, 'Task Breakdown');
    const plannerModel = results.find((model) => model.id === 'planner');

    assert.ok(plannerModel, 'Expected filter to match related features content');
});
