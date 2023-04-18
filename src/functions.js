const mealsURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const mealsContainer = document.querySelector('.meals-container');
import { microverseKey, incrementLikes } from "./likes.js";

const getData = async () => {
  const response = await fetch(mealsURL);
  const data = await response.json();
  return data;
};

const displayMeals = async () => {
  mealsContainer.innerHTML = '';
  const mealsOb = await getData();
  console.log(mealsOb);
  mealsOb.meals.forEach((meal) => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal-div');
    mealDiv.innerHTML = `<div class="img-div" id=${meal.idMeal}>
    <img src=${meal.strMealThumb} alt=${meal.strMeal} class="meal-img">
  </div>
  <a href="#" class="meal-title" data-id=${meal.idMeal}>${meal.strMeal}</a>
  <div class="meals-details">
  <i class="far fa-heart like-btn"></i>
  <p class="like-count">Likes</p>
  </div>
  <button class="comment-btn" id="${meal.idMeal}" data-target="#popup-wrapper">Comments</button>`;

  //implement likes function
  const likeButton = document.querySelectorAll('.like-btn');
  likeButton.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const mealId = button.parentElement.parentElement.querySelector('.img-div').id;
      const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/likes`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: mealId })
      });
  
      if (response.status === 201) {
        const mealId = e.target.closest('.meals-details').previousElementSibling.dataset.id;

        // Fetch the current likes for the meal from the API
        const likesResponse = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/likes`);
        const likesData = await likesResponse.json();
        
        // Find the likes for the current meal ID
        const mealLikes = likesData.find(like => like.item_id === mealId);
        
        // Update the like-count element
        const likeCountElem = e.target.closest('.meals-details').querySelector('.like-count');
        if (mealLikes) {
          likeCountElem.textContent = `${mealLikes.likes} Likes`;
        } else {
          likeCountElem.textContent = '0 Likes';
        }
        
      } else {
        const error = await response.json();
        console.log(error);
      }
  
    });
  });
  

    // Append the list item element to the unordered list element
    mealsContainer.appendChild(mealDiv);
  });
};

export { displayMeals, mealsURL, getData};
