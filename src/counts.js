
const countItems = () => {
    const mealsContainer = document.querySelector('.meals-container');
    const length = mealsContainer.childElementCount
    return length
};

const countComments = () => {
    let commentsList = document.getElementById('comments-list')
    const commentCounting = document.querySelector('#comment-counter');
    const commentsCount = commentsList.childElementCount;
      commentCounting.innerHTML = `${commentsCount}`;
};

export {countComments, countItems}

