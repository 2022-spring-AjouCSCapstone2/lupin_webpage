import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface QuestionProps {
    id: number | null,
    roomId: string,
    type: string,
    isAnonymous: boolean,
    content: string,
    courseId: string,
    user: {
        name: string
    }
}

export interface QuestionListProps {
    questionData: QuestionProps,
    point: boolean
}

const questionList = createSlice({
    name: 'questionList',
    initialState: [] as QuestionListProps[],
    reducers: {
        setQuestions(state, action: PayloadAction<QuestionListProps>) {
            return [...state, action.payload];
        },
        emptyQuestions() {
            return [] as QuestionListProps[];
        },
        updatePoint(state, action: PayloadAction<QuestionListProps>) {
            const newState = state.map((question: QuestionListProps) => {
                if(question.questionData.id === action.payload.questionData.id) {
                    return action.payload;
                } else return question;
            });
            return newState as QuestionListProps[];
        }
    } 
});

export const { setQuestions, emptyQuestions, updatePoint } = questionList.actions;
export default questionList.reducer;