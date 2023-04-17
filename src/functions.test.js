// eslint-disable-next-line
import { sum } from './functions';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// eslint-disable-next-line
const { JSDOM } = require('jsdom');


test('sum to numbers', () => {
  // Arrange
  const a = 3;
  const b = 5;
  // Act
  let d = sum(a, b);

  setTimeout(() => {
    // Assert
    expect(d).toBe(8);
  }, 1000);
});