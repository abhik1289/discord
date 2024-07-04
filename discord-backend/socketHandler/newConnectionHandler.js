const socketServer = require("../serverStore")
const friendsUpdate = require("./friends");
const newConnectionHandler = async (socket, io) => {
    // console.log("--->",socket);
    const userDetails = socket.user;
    console.log(userDetails);
    socketServer.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.id //*** */
    })
    console.log("unknown factor is",userDetails);
friendsUpdate.updateFriendPendingInvitation(userDetails.id);
friendsUpdate.updateFriends(userDetails.id)

}

//update pending invitations list


module.exports = newConnectionHandler;
