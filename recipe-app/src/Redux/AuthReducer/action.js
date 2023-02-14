import * as types from "./actionTypes";

const getUserRequest = () => {
  return { type: types.GET_USER_REQUEST };
};
const getUserSuccess = (payload) => {
  return { type: types.GET_USER_SUCCESS, payload };
};
const getUserFailure = () => {
  return { type: types.GET_USER_FAILURE };
};

export { getUserFailure, getUserRequest, getUserSuccess };
