import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import Reducers from "./Reducer";
const RootReducers = combineReducers({
  // reducers
  Reducers,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));