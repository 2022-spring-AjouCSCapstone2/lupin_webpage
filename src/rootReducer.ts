import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loggedIn from './slices/loggedIn';
import user from './slices/user';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loggedIn", "user"]
};

const reducer = combineReducers({
    loggedIn,
    user
});

export type ReducerType = ReturnType<typeof reducer>;
export default persistReducer(persistConfig, reducer);