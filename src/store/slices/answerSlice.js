import {createSlice} from "@reduxjs/toolkit";

const initialState = {correctAnswers: 0, badAnswers: 0}

export const answerSlice = createSlice({
        name: "answers",
        initialState,
        reducers: {

            correctAnswerInc: (state, action) => {
                return {...state, correctAnswers: state.correctAnswers + 1}
            },
            badAnswersInc: (state, action) => {
                return {...state, badAnswers: state.badAnswers + 1}
            },
            clearAnswers: (state, actrion) => {
                return {correctAnswers: 0, badAnswers: 0}
            }
        }
    }
)
export const {correctAnswerInc, badAnswersInc, clearAnswers} = answerSlice.actions
export default answerSlice.reducer