/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { displayMeals } from './functions.js';
import { microverseKey, microUrl } from './likes.js';

window.addEventListener('load', async () => {
  await displayMeals();
  // implement likes function
  const likeButton = document.querySelectorAll('.like-btn');
  likeButton.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const mealId = button.parentElement.parentElement.querySelector('.img-div').id;
      const url = `${microUrl}${microverseKey}/likes`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: mealId }),
      });

      if (response.status === 201) {
        const mealId = e.target.closest('.meals-details').previousElementSibling.dataset.id;

        // Fetch the current likes for the meal from the API
        const likesResponse = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/likes`);
        const likesData = await likesResponse.json();

        // Find the likes for the current meal ID
        const mealLikes = likesData.find((like) => like.item_id === mealId);

        // Update the like-count element
        const likeCountElem = e.target.closest('.meals-details').querySelector('.like-count');
        if (mealLikes) {
          likeCountElem.textContent = `${mealLikes.likes} Likes`;
        } else {
          likeCountElem.textContent = '0 Likes';
        }
      } else {
        const error = await response.json();
        // eslint-disable-next-line
        console.log(error);
      }
    });
  });
});


//event listener to submit and display comments

// document.getElementById('comment-form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const commentInput = document.getElementById('comment-input');
//   const usernameInput = document.getElementById('username-input');
//   const itemId = event.target.id; // get the id of the button that triggered the form submission
//   createComment(itemId, usernameInput, commentInput);
//   commentInput.value = '';
//   usernameInput.value = '';
//   const commentsResponse = await getComment(itemId)
//   const commentsData = await commentsResponse.json();
//   const commentsListElement = document.getElementById('comments-list');
//   commentsListElement.innerHTML = '';
//   commentsData.forEach(comment => {
//     const commentItem = document.createElement('li');
//     commentItem.textContent = `${comment.username}: ${comment.comment}`;
//     commentsListElement.appendChild(commentItem);
//   });
// });

