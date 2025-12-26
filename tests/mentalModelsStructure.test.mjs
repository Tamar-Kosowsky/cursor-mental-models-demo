import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../data/mental-models.json');
const mentalModels = JSON.parse(readFileSync(dataPath, 'utf-8'));

test('mental models data contains required fields', () => {
    assert.ok(Array.isArray(mentalModels), 'Data should be an array');
    assert.ok(mentalModels.length > 0, 'Data should not be empty');

    mentalModels.forEach((model, index) => {
        assert.ok(model.id, `Model at index ${index} is missing an id`);
        assert.ok(model.title, `Model at index ${index} is missing a title`);
        assert.ok(
            model.shortDescription,
            `Model at index ${index} is missing a shortDescription`
        );
        assert.ok(
            Array.isArray(model.relatedFeatures),
            `Model at index ${index} should include relatedFeatures`
        );
    });
});
