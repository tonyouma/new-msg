import { useDispatch as useReduxDispatch } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// ----------------------------------------------------------------------

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useReduxDispatch<AppDispatch>();

export { dispatch, useDispatch };
