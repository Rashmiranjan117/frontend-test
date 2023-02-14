import * as types from "./action";

const initState = {
  isLoading: false,
  isError: false,
  token: null,
  userData: null,
};

export const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.getUserRequest:
      return { ...state, isLoading: true, isError: false };
    case types.getUserSuccess:
      return { ...state, isLoading: false, isError: false, userData: payload };
    case types.getUserFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
