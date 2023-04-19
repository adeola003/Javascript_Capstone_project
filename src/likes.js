const microverseKey = '8QMD1gWVIxFRRd8TG6qH';
const microUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const updateLikes = async (meal, mealDiv) => {
    // Fetch the current likes for the meal from the API
    const likesResponse = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/likes`);
    const likesData = await likesResponse.json();
  
    // Find the likes for the current meal ID
    const mealLikes = likesData.find((like) => like.item_id === meal.idMeal);
  
    // Update the like-count element
    const likeCountElem = mealDiv.querySelector('.like-count');
    if (mealLikes) {
      likeCountElem.textContent = `${mealLikes.likes} Likes`;
      meal.likes = mealLikes.likes;
    } else {
      likeCountElem.textContent = '0 Likes';
      meal.likes = 0;
    }
  };
  

  export {microverseKey, microUrl, updateLikes}
  