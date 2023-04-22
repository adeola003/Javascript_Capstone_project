
const countItems = () => {
    const mealsContainer = document.querySelector('.meals-container');
    const length = mealsContainer.childElementCount
    return length
};

const countComments = (id) => {
    const commentCounting = document.querySelector(`#${id}`);
    const commentsCount = commentCounting.childElementCount;
    return commentsCount
};

export {countComments, countItems}

