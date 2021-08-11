import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices

import chatReducer from "./slices/chat";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: []
};



const rootReducer = combineReducers({
  chat: chatReducer
});

export { rootPersistConfig, rootReducer };
