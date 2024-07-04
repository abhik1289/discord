const authSocket = require('./middleware/authSocket');
const disConnctedHandler = require('./socketHandler/dsiConnectHandler');
const newConnectionHandler = require('./socketHandler/newConnectionHandler');
const serverStore = require('./serverStore');
const directMessageHandler = require('./socketHandler/directMessageHandler');
const { directChatHistoryHandler } = require('./socketHandler/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandler/roomCreateHandler');

const registerSoketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });
    serverStore.setSocketServerInstance(io)

    io.use((socket, next) => {
        authSocket(socket, next);
    });
    const emitOnlineUser = () => {
        const onlineUser = serverStore.getOnlineuser()
        io.emit("online-user", { onlineUser })
    }
    io.on('connection', (socket) => {
        console.log("user connected");


        socket.on("direct-message", (data) => {
            directMessageHandler(socket, data);
        });
        socket.on("direct-chat-history", (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('room-create', () => {
            roomCreateHandler(socket)
        })

        newConnectionHandler(socket, io);

        socket.on('disconnect', () => {
            disConnctedHandler(socket);
        })

        emitOnlineUser()
        //new connection handler
    });

    setInterval(() => {
        emitOnlineUser()
    }, [8000])
};

module.exports = {
    registerSoketServer
}



