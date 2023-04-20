
import { microverseKey } from "./likes.js";
class Comment {
    constructor(itemId, userName, comment) {
      this.item_id = itemId;
      this.username = userName;
      this.comment = comment;
    }
  };

  const createComment = async (itemId, userName, comment) => {
    const newComment = new Comment(itemId, userName, comment);
    const completeURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/comments`;
    const response = await fetch(completeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
  const data = await response.json();
  return data.result;
  };

  //function to get comments
    const getComment = async (id) => {
    const completeURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${microverseKey}/comments?item_id=${id}`;
    const response = await fetch(completeURL);
    const data = await response.json();
    return data;
  };


export {createComment, getComment}
  