import * as types from "./actionTypes";

const getRecipeSuccess = (payload) => {
  return { type: types.GET_RECIPE_SUCCESS, payload };
};
const getRecipeRequest = () => {
  return { type: types.GET_RECIPE_REQUEST };
};
const getRecipeFailure = () => {
  return { type: types.GET_RECIPE_FAILURE };
};

const getSavedRecipeRequest = () => {
  return { type: types.GET_SAVED_RECIPE_REQUEST };
};

const getSavedRecipeSuccess = (payload) => {
  return { type: types.GET_SAVED_RECIPE_REQUEST, payload };
};

const getSavedRecipeFailure = () => {
  return { type: types.GET_SAVED_RECIPE_REQUEST };
};

export {
  getRecipeFailure,
  getRecipeRequest,
  getRecipeSuccess,
  getSavedRecipeFailure,
  getSavedRecipeRequest,
  getSavedRecipeSuccess,
};
