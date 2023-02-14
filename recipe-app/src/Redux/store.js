import { reducer as AuthReducer } from "./AuthReducer/reducer";
import { reducer as RecipeReducer } from "./RecipeReducer/reducer";

import {
  legacy_createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";

import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({ AuthReducer, RecipeReducer });

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
