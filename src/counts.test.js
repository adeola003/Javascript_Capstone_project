// eslint-disable-next-line
import {countComments, countItems} from './counts';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// eslint-disable-next-line
const { JSDOM } = require('jsdom');


describe('counting elements', () => {

    test('countItems should return the number of child elements in the meals container', () => {
      // Arrange
      const mealsContainer = document.createElement('div');
      mealsContainer.classList.add('meals-container')
      mealsContainer.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
      `;

      // Act
      const count = countItems();

      // Assert
      expect(count).toBe(3);
    });
    test('test nature', () => {
        expect(typeof counter).toBe('function');
      });
  });

describe('counting comments', () => {
  test('countComments should return the number of child elements in the comments container', () => {
    // Arrange
    document.body.innerHTML = `
      <div id="comments">
        <div>Comment 1</div>
        <div>Comment 2</div>
        <div>Comment 3</div>
      </div>
    `;
    const id = 'comments';
    
    // Act
    const commentCount = countComments(comments);

    // Assert
    expect(commentCount).toBe(3);
  });
  test('test nature', () => {
    expect(typeof counter).toBe('function');
  });

});

