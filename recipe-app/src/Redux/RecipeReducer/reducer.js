import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  list: [],
  savedlist: [],
};

export const reducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case types.GET_RECIPE_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case types.GET_RECIPE_SUCCESS:
      return { ...state, isLoading: false, isError: false, list: payload };
    case types.GET_RECIPE_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case types.GET_SAVED_RECIPE_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.GET_SAVED_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        savedlist: payload,
      };

    case types.GET_SAVED_RECIPE_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
