import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loggedIn from './slices/loggedIn';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loggedIn"]
};

const reducer = combineReducers({
    loggedIn
});

export type ReducerType = ReturnType<typeof reducer>;
export default persistReducer(persistConfig, reducer);