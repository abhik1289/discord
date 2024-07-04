const connectedUsers = new Map();
let io = null;
let activeRoom = [];
const uuidv4 = require('uuid4');
const uniqueId = uuidv4();
const setSocketServerInstance = (ioInstance) => {
    io = ioInstance;
}

const getSocketServerInstance = () => {
    return io;
}

const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId });
    console.log('new connected user');
    console.log(connectedUsers);
}
const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId);
        console.log(connectedUsers);
    }
}

const getActiveConnected = (userId) => {
    let activeConnnection = [];
    connectedUsers.forEach((value, key) => {
        console.log("the --*", value, key);
        if (value.userId === userId) {
            activeConnnection.push(key);
        }
    })
    return activeConnnection;
}

const getOnlineuser = () => {
    const onlineUser = [];
    connectedUsers.forEach((value, key) => {
        onlineUser.push({
            socketId: key,
            userId: value.userId
        })
    });
    return onlineUser;
};
const addNewActiveRoom = (userIdM) => {
    const { userId, socketId } = userIdM;
    console.log("This is 2", socketId);

    const NewActiveRoom = {
        roomCreator: {
            userId, socketId
        },
        partcipants: [
            {
                userId, socketId
            }
        ],
        roomId: uniqueId
    };
    activeRoom = [...activeRoom, NewActiveRoom];
    return NewActiveRoom;
}
const getActiveRoom = () => {
    return [...activeRoom];
}
module.exports = { addNewConnectedUser, removeConnectedUser, getActiveConnected, getSocketServerInstance, setSocketServerInstance, getOnlineuser, addNewActiveRoom,getActiveRoom }

