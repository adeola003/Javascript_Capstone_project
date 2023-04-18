const microverseKey = '8QMD1gWVIxFRRd8TG6qH';

//function to increment new likes
const incrementLikes = async (appId, mealId) => {
    const response = await fetch(
      `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: mealId }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to increment likes');
    }
    const result = await response.json();
    return result;
  };

  export {incrementLikes, microverseKey}
  