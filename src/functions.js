import { updateLikes } from './likes.js';
import { createComment, getComment } from './comment.js';
import { countComments } from './counts.js';
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
      // const comLen = await countComments();
      

      const popupContainer = document.createElement('div');
      popupContainer.classList.add('popup-container');
      
      popupContainer.id = 'popup-container';
         
      const popupContent = `
        <button class="close">X</button>
        <h2>Meal Instructions</h2>
        <p id="meal-instructions">${instructions}</p>
        <h2>Comments (<span id="comment-counter"></span>)</h2>
        <ul id="comments-list"></ul>
        <h2>Add Comment</h2>
        <form id="comment-form" action="submit">
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
const commentsList = popupContainer.querySelector('#comments-list');
// Function to update the comments list
  const updateCommentsList = async (id) => {
  const comments = await getComment(id);
  const commentCount = document.querySelector('#comment-counter');
  commentCount.innerHTML = `${comments.length}`;
  console.log(comments);
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.innerText = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
    commentsList.appendChild(li);
  });
};
updateCommentsList(mealId)
//using the form btn
const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  
  let name = document.querySelector('#username').value;
  let comment = document.querySelector('#comment').value;
  const itemId = mealId;
  const date = new Date().toISOString().substr(0, 10);
  const li = document.createElement('li');
    li.innerText = `${date} ${name}: ${comment}`;
    commentsList.appendChild(li);
    const commentCounting = document.querySelector('#comment-counter');
    const newCont = countComments (comment-counter);
      commentCounting.innerHTML = `${newCont}`;
  await createComment(itemId, name, comment);
  
  commentForm.reset();
});
updateCommentsList(mealId);

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
