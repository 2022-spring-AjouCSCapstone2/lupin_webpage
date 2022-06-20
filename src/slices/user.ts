import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
    id: number,
    name: string,
    userType: string,
    email: string,
    userId: number,
    phone: number,
    path: string | null
}

const user = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return {...state, ...action.payload};
        },
        setNullUser() {
            return {} as User;
        }
    } 
});

export const { setUser, setNullUser } = user.actions;
export default user.reducer;