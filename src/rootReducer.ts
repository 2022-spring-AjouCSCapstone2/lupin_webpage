import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loggedIn from './slices/loggedIn';
import user from './slices/user';
import todaysLecture from './slices/todaysLecture';
import courses from './slices/courses';
import today from './slices/today';
import classRoom from './slices/classRoom';
import questionList from './slices/questionList';

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "loggedIn",
    "user",
    "todaysLecture",
    "courses",
    "today",
    "classRoom",
    "questionList"
  ]
};

const reducer = combineReducers({
    loggedIn,
    user,
    todaysLecture,
    courses,
    today,
    classRoom,
    questionList
});

export type ReducerType = ReturnType<typeof reducer>;
export default persistReducer(persistConfig, reducer);