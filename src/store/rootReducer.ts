import { combineReducers } from "redux";
import chat from "./reducers/chat";

const rootReducer = combineReducers({
  chat,
});

export default rootReducer;
