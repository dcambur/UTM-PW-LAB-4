import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state = action.payload
            return state
        },

        userLogout: (state, action) => {
            state = {...state, isLogged: false}
            return state
        },

    },
})

export const {userLogin, userLogout} = userSlice.actions
export default userSlice.reducer