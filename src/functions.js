import { updateLikes } from './likes.js';
import { createComment, getComment } from './comment.js';
const mealsURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const mealsContainer = document.querySelector('.meals-container');

const getMealInstr = async (id) => {

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const inst = data.meals[0].strInstructions;
  return inst
};

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
  <button class="comment-btn" id="${meal.idMeal}">Comments</button>`;

    // Append the list item element to the unordered list element
    mealsContainer.appendChild(mealDiv);
    //create the popup for comments

    const commentButton = mealDiv.querySelector('.comment-btn');
    commentButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const mealId = event.target.id;
      console.log(mealId);
      //get meal instructions
      const instructions = await getMealInstr(mealId);
      console.log(typeof(instructions));
      

      const popupContainer = document.createElement('div');
      popupContainer.classList.add('popup-container')
      popupContainer.id = 'popup-container';
         
      const popupContent = `
        <button class="close">X</button>
        <h2>Meal Instructions</h2>
        <p id="meal-instructions">${instructions}</p>
        <h2>Comments</h2>
        <ul id="comments-list"></ul>
        <h2>Add Comment</h2>
        <form id="comment-form">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username">
          <label for="comment">Comment:</label>
          <textarea id="comment" name="comment"></textarea>
          <button id="submit-btn" type="submit">Submit</button>
        </form>`;

      popupContainer.innerHTML = popupContent;
      document.body.appendChild(popupContainer);
      //send comment to api
      
const commentForm = popupContainer.querySelector('#comment-form');
// Function to update the comments list
const updateCommentsList = async () => {
  const itemId = mealId;
  const comments = await getComment(itemId);
  console.log(comments);
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.innerText = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    commentsList.appendChild(li);
  });
};

// Add an event listener to the form's submit button
commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const usernameInput = popupContainer.querySelector('#username');
  const commentInput = popupContainer.querySelector('#comment');
  const itemId = mealId;
  const userName = usernameInput.value;
  const comment = commentInput.value;
  const result = await createComment(itemId, userName, comment);
  console.log(result); 
  usernameInput.value = '';
  commentInput.value = '';
  await updateCommentsList();
});
//get comment from api
// Get the ul element
const commentsList = popupContainer.querySelector('#comments-list');

// Call the function to update the comments list when the popup is opened
updateCommentsList();
    

      const closeButton = popupContainer.querySelector('.close');
      closeButton.addEventListener('click', () => {
        popupContainer.remove();
      });
    });

  });
  
};

export { displayMeals, mealsURL, getData,};
