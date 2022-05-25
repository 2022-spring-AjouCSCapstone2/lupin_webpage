import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Timetable {    
    id: number,
    day: string,
    startTime: string,
    endTime: string,
    place: string
}

export interface Courses {
    id: number,
    courseId: string,
    name: string,
    timetables: Timetable[],
    professor: {
        name: string
    }
}

const courses = createSlice({
    name: 'courses',
    initialState: [] as Courses[],
    reducers: {
        setCourses(_, action: PayloadAction<Courses[]>) {
            return [...action.payload];
        }
    } 
});

export const { setCourses } = courses.actions;
export default courses.reducer;