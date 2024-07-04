import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'
import friendsSlice from './features/friendsSlice'
import chartSlice from './features/chartSlice'
import roomSlice from './features/roomSlice'


export const store = configureStore({
    reducer: {
        auth: authSlice,
        friend: friendsSlice,
        chart: chartSlice,
        room:roomSlice
    },
})