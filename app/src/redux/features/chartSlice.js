import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chosenChatDetails: null,
    message: [],
    chartType: null
};

export const chartSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setchosenChatDetails: (state, action) => {
            state.chosenChatDetails = action.payload.info;
            state.chartType = "DIRECT"
        },
        setMessage: (state, action) => {
            state.message = [...state.message, action.payload];
        },
    }
});

export let { setchosenChatDetails,setMessage } = chartSlice.actions;
export default chartSlice.reducer;
