const serverstore = require("../../serverStore")

const updateRooms = (toSpeficTargetId = null) => {
    const io = serverstore.getSocketServerInstance();
    const activeRoom = serverstore.getActiveRoom();
    console.log(toSpeficTargetId);
    if (toSpeficTargetId) {
        console.log("The spefic id is",toSpeficTargetId);
        io.to(toSpeficTargetId).emit("active-rooms", {
            activeRoom,
        });
    } else {
        io.emit("active-rooms", {
            activeRoom,
        });

    }
}
module.exports = {updateRooms};