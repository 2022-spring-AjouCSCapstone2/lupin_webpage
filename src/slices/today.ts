import { createSlice } from '@reduxjs/toolkit'
import { getToday } from '../variables';

const today = createSlice({
    name: 'today',
    initialState: getToday(),
    reducers: {
        setToday() {
            return getToday();
        }
    } 
});

export const { setToday } = today.actions;
export default today.reducer;