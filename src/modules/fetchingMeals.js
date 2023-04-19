const URL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const getUsFoodList = async (URL_API) => {
  const responses = await fetch(URL_API);
  const json = await responses.json();
  const mealList = json.meals.slice(0, 18);

  return mealList;
};

export { URL_API, getUsFoodList };
