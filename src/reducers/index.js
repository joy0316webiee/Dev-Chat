import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null,
  loading: true
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        loading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...initialUserState,
        loading: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer
});

export default rootReducer;
