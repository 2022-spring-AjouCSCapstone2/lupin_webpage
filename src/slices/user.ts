import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
    id: number | null,
    name: string | null,
    userType: string | null,
    email: string | null,
    userId: number | null,
    phone: number | null
}

const user = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        userType: null,
        email: null,
        userId: null,
        phone: null,
    } as User,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            return {...state, ...action.payload};
        },
        setNullUser() {
            return {
                id: null,
                name: null,
                userType: null,
                email: null,
                userId: null,
                phone: null,
            };
        }
    } 
});

export const { setUser, setNullUser } = user.actions;
export default user.reducer;