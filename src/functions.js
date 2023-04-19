import { updateLikes } from './likes.js';

const mealsURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const mealsContainer = document.querySelector('.meals-container');

const getData = async () => {
  const response = await fetch(mealsURL);
  const data = await response.json();
  return data;
};

const displayMeals = async () => {
  mealsContainer.innerHTML = '';
  const mealsOb = await getData();
  mealsOb.meals.forEach((meal) => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal-div');
    // Call updateLikes() function to update the like count of the meal
    updateLikes(meal, mealDiv);

    mealDiv.innerHTML = `<div class="img-div" id=${meal.idMeal}>
    <img src=${meal.strMealThumb} alt=${meal.strMeal} class="meal-img">
  </div>
  <a href="#" class="meal-title" data-id=${meal.idMeal}>${meal.strMeal}</a>
  <div class="meals-details">
  <i class="far fa-heart like-btn"></i>
  <p class="like-count">Likes loading</p>
  </div>
  <button class="comment-btn" id="${meal.idMeal}" data-target="#popup-wrapper">Comments</button>`;

    // Append the list item element to the unordered list element
    mealsContainer.appendChild(mealDiv);
  });
};

export { displayMeals, mealsURL, getData };
