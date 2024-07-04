const serverStore = require("../serverStore");
const roomUpdate = require("../socketHandler/update/rooms");
const roomCreateHandler = (socket) => {
    console.log("socket is", socket.user.id);
    const { id } = socket;
    // const roomDeatils = serverStore.addNewActiveRoom(userId, socketId);
    const roomDeatils = serverStore.addNewActiveRoom({ userId: socket.user.id, socketId: id })
        ; socket.emit('room-create', {
            roomDeatils
        });
    roomUpdate.updateRooms();
}

module.exports = roomCreateHandler;