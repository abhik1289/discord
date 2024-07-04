import { setActiveRoom, setRoomDetails } from "../redux/features/roomSlice";
import { store } from "../redux/store";

export const createNewRoom = () => {
    // import { createNewRoom } from './communication';
    // Socket.
}
export const newRoomCreated = (data) => {
    const { roomDeatils } = data;
    console.log(roomDeatils);
    store.dispatch(setRoomDetails(roomDeatils))
}

export const updateActiveRoom = (data) => {
    const { activeRooms } = data;
 
    const friends = store.getState().friend.friends;
    const rooms = [];
    activeRooms.forEach((room) => {
        friends.forEach(f => {
            if (f.id === room.roomCreator.userId) {
                rooms.push({ ...room, createUsername: f.username })
            }
        })
    });
    store.dispatch(setActiveRoom(rooms))
}