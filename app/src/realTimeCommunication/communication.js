import io from 'socket.io-client';
import { setpendingFriendInvites, setFriend, setOnlineFriend } from '../redux/features/friendsSlice';
import { store } from './../redux/store';
import updateDirectChatHistoryIfActive from './updateDirectChatHistoryIfActive';
import { newRoomCreated, updateActiveRoom } from './socketConnecttion';


let socket = null;
export const connectWithSocketServer = (userDetails) => {

    socket = io("http://localhost:5000", {
        auth: {
            token: userDetails.token
        }
    });

    socket.on("connect", (info) => {
        console.log("successfully connected");
        console.log(socket.id);
    });
    socket.on("friend-invitation", (data) => {
        const { pendingInvitation } = data;
        console.log(pendingInvitation);
        pendingInvitation.map((item) => {
            return store.dispatch(setpendingFriendInvites(item));
        })
        console.log("friendInvitationCame");
    });
    socket.on("friend-list", (data) => {
        const { friends } = data;
        friends.map((item) => {
            // store.dispatch(setFriend(friends))
            return store.dispatch(setFriend(item));

        })
    })
    socket.on("online-user", (data) => {
        const { onlineUser } = data;
        onlineUser.map((item) => {
            return store.dispatch(setOnlineFriend(item));
        })
    });
    socket.on("direct-chat-history", (data) => {
        updateDirectChatHistoryIfActive(data);
    });
    socket.on('room-create',(data)=>{
        newRoomCreated(data);
    })
    socket.on('active-rooms',(data)=>{
       updateActiveRoom(data);
    })
};

export const sendDirectMesage = (data) => {
    socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
    socket.emit("direct-chat-history", data);
}
export const createRoom = (data) => {
    socket.emit("room-create", data);
}
export const createNewRoom = (data) => {
    socket.emit("room-create");
}