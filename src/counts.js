
const countItems = () => {
    const itemsList = document.querySelectorAll('.img-div');
    const length = itemsList.length;
    return length
};

const countComments = () => {
    const popup = document.querySelector('.popup-container');
    const commentsContainer = popup.querySelector('#comments-list');
    const commentsList = commentsContainer.querySelectorAll('li')
    const length = commentsList.length;
    return length
};

export {countComments, countItems}

