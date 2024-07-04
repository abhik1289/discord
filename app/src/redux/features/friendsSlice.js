import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    friends: [],
    pendingFriendInvites: [],
    onlineFriend: [],
}


let friendSlice = createSlice({
    name: 'friend',
    initialState: initialState,
    reducers: {
        setFriend: (state, action) => {
            let id = action.payload.id;
            let existingUsers = state.friends.find((item) => item.id === id);
            if (!existingUsers) {
                state.friends = [...state.friends, action.payload];
            }
        },
        setpendingFriendInvites: (state, action) => {
            console.log("----------->", action);
            state.pendingFriendInvites = [...state.pendingFriendInvites, action.payload];
        },
        removePendingFriend: (state, action) => {

        },
        setOnlineFriend: (state, action) => {
            state.onlineFriend = [...state.onlineFriend, action.payload];
        }
    }
});
export let { setpendingFriendInvites, setFriend, setOnlineFriend } = friendSlice.actions;
export default friendSlice.reducer;

