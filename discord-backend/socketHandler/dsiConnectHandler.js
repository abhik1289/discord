const socketServer = require("../serverStore")

const disConnctedHandler = (socket) => {
    socketServer.removeConnectedUser(socket.id)
}
module.exports = disConnctedHandler;