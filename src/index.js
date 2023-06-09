import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { displayMeals } from './functions.js';
import { microverseKey, microUrl } from './likes.js';
import { countItems } from './counts.js';

window.addEventListener('load', async () => {
  await displayMeals();
  const countContainer = document.getElementById('item-counter');
  const itemsLen = countItems();
  countContainer.innerHTML = `${itemsLen}`;
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
