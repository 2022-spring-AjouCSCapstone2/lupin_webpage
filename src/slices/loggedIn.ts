import { createSlice } from '@reduxjs/toolkit'

const loggedIn = createSlice({
    name: 'loggedIn',
    initialState: false,
    reducers: {
        setLoggedInTrue() {
            return true;
        },
        setLoggedInFalse() {
            return false;
        }
    } 
});

export const { setLoggedInTrue, setLoggedInFalse } = loggedIn.actions;
export default loggedIn.reducer;