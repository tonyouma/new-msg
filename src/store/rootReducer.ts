import { combineReducers } from "redux";
import chatReducer from "./slices/chat";
// import chat from "./reducers/chat";


const rootReducer = combineReducers({
  chat: chatReducer
  // chat
});

export default rootReducer
