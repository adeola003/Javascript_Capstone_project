const countItems = () => {
    const mealsContainer = document.querySelector('.meals-container');
    const length = mealsContainer.childElementCount;
    return length;
  };
  
  const countComments = () => {
    const popup = document.querySelector('.popup-container');
    const commentsContainer = popup.querySelector('#comments-list');
    const commentsList = commentsContainer.querySelectorAll('li');
    const { length } = commentsList;
    return length;
  };
  
  export { countComments, countItems };
