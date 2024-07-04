import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        signup: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, signup } = authSlice.actions

export default authSlice.reducer