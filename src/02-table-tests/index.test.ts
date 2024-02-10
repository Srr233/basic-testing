import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
];

describe('simpleCalculator', () => {
  for (const obj of testCases) {
    test(`Should return ${obj.expected} for action ${obj.action}`, () => {
      expect(simpleCalculator(obj)).toBe(obj.expected);
    });
  }
});
