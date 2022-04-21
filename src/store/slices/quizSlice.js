import {createSlice} from "@reduxjs/toolkit";

const initialState = {questions: [], title: ""}

export const questionSlice = createSlice({
        name: "question",
        initialState,
        reducers: {

            titleAdd: (state, action) => {
                return {...state, title: action.payload}
            },
            questionAdd: (state, action) => {
                return {...state, questions: [...state.questions, action.payload]}
            },
            questionClear: (state, action) => {
                state = {questions: [], title: ""}
                return state
            }
        }
    }
)
export const {questionAdd, questionClear, titleAdd} = questionSlice.actions
export default questionSlice.reducer