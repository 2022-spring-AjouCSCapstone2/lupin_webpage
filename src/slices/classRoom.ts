import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ClassRoom {
    name: string,
    courseId: string,
    roomId: string
}

const classRoom = createSlice({
    name: 'classRoom',
    initialState: {} as ClassRoom,
    reducers: {
        enterClassRoom(_, action: PayloadAction<ClassRoom>) {
            return action.payload;
        },
        exitClassRoom() {
            return {} as ClassRoom;
        }
    } 
});

export const { enterClassRoom, exitClassRoom } = classRoom.actions;
export default classRoom.reducer;