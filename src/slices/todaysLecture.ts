import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Courses } from './courses';

const todaysLecture = createSlice({
    name: 'todaysLecture',
    initialState: [] as Courses[],
    reducers: {
        setTodaysLecture(_, action: PayloadAction<Courses[]>) {
            return [...action.payload];
        }
    } 
});

export const { setTodaysLecture } = todaysLecture.actions;
export default todaysLecture.reducer;