import { describe, it, expect } from 'vitest';
import filterModule from '../filterMentalModels.js';

const { filterMentalModels } = filterModule;

const sampleModels = [
    { id: 'planner', title: 'Cursor as a Planner', shortDescription: 'Breaks down complex tasks' },
    { id: 'pair', title: 'Pair Programmer', shortDescription: 'Real-time code suggestions' },
    { id: 'reviewer', title: 'Code Reviewer', shortDescription: 'Finds issues in code' }
];

describe('filterMentalModels', () => {
    it('returns a copy of all models when query is empty', () => {
        const result = filterMentalModels(sampleModels, '');
        expect(result).toHaveLength(sampleModels.length);
        expect(result).not.toBe(sampleModels);
    });

    it('matches queries against titles irrespective of casing', () => {
        const result = filterMentalModels(sampleModels, 'planner');
        expect(result).toEqual([
            { id: 'planner', title: 'Cursor as a Planner', shortDescription: 'Breaks down complex tasks' }
        ]);
    });

    it('matches queries against short descriptions', () => {
        const result = filterMentalModels(sampleModels, 'real-time');
        expect(result).toEqual([
            { id: 'pair', title: 'Pair Programmer', shortDescription: 'Real-time code suggestions' }
        ]);
    });
});
