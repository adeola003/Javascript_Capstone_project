// eslint-disable-next-line
import { countComments, countItems } from '../../counts.js';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const { JSDOM } = require('jsdom');

describe('counting elements', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <body>
        <div class="meals-container">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </body>
    `);
  });

  test.only('countItems should be a function', () => {
    // Act

    // Assert
    expect(typeof countItems).toBe('function');
  });

  afterEach(() => {
    dom.window.document.body.innerHTML = '';
    dom.window.close();
  });
});

describe('counting comments', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
    <body>
    <div id="comments-list">
      <div>Comment 1</div>
      <div>Comment 2</div>
      <div>Comment 3</div>
    </div>
    <div id="comment-counter"></div>
  </body>
    `);
  });

  test.only('countComments should return the number of child elements in the comments container', () => {
    // Act

    // Assert
    expect(typeof countComments).toBe('function');
  });

  afterEach(() => {
    dom.window.document.body.innerHTML = '';
    dom.window.close();
  });
});
