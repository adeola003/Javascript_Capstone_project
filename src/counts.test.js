// eslint-disable-next-line
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;


import {countComments, countItems} from './counts.js';

const { JSDOM } = require('jsdom');

describe('counting elements', () => {
  let dom;
  let mealsContainer;

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
    mealsContainer = dom.window.document.querySelector('.meals-container');
  });

  test.only('countItems should be a function', () => {
    // Act

    // Assert
    expect(typeof countComments).toBe('function');
  });

  afterEach(() => {
    dom.window.document.body.innerHTML = '';
    dom.window.close();
  });
});

describe('counting comments', () => {
  let dom;
  let commentsContainer;

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
    commentsContainer = dom.window.document.querySelector('#comments');
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

