import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserInRoom: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setopenRoom: (state, action) => {
            const { isUserRoomCreator, isUserInRoom } = action.payload;
            state.isUserRoomCreator = true;
            state.isUserInRoom = true;
        },
        setRoomDetails: (state, action) => {
            state.roomDetails = action.payload;
        },
        setActiveRoom: (state, action) => {
            state.activeRooms = [...state.activeRooms, action.payload];
        },
        setLocalStream: (state, action) => { },
        setRemoteStream: (state, action) => { },
        setAudioOnly: (state, action) => { },
        setScreenSharingStream: (state, action) => { },
    }
});

export let { setopenRoom, setRoomDetails, setActiveRoom, setLocalStream, setRemoteStream, setAudioOnly, setScreenSharingStream } = roomSlice.actions;
export default roomSlice.reducer;
