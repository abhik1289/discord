const friendInvitation = require("../models/friendInvitation");
const user = require("../models/user");
const serverStore = require("../serverStore");

const updateFriendPendingInvitation = async (userId) => {
    try {
        console.log("vv", userId);
        const pendingInvitation = await friendInvitation.find({
            recevierId: userId
        }).populate("senderId", "_id username email");
        console.log("penfing req is::--->", pendingInvitation);
        console.log("user id", userId);

        const recevierList = serverStore.getActiveConnected(userId);
        const io = serverStore.getSocketServerInstance();
        console.log("is it", recevierList);
        recevierList.forEach((recevierSocketID) => {
            io.to(recevierSocketID).emit('friend-invitation', {
                pendingInvitation: pendingInvitation ? pendingInvitation : []
            });
        });
    } catch (error) {
        console.log(error);
    }
}
const updateFriends = async (userId) => {
    try {
        //find active connections of sefic id
        const receverList = serverStore.getActiveConnected(userId);
        if (receverList.length > 0) {
            const User = await user.findById(userId, {
                _id: 1, friends: 1
            }).populate('friends', '_id username email');
            if (User) {
                const friendList = User.friends.map((f) => {
                    return {
                        id: f._id,
                        mail: f.email,
                        username: f.username
                    }
                });

                const io = serverStore.getSocketServerInstance();

                receverList.forEach((receiver) => {
                    io.to(receiver).emit("friend-list", {
                        friends: friendList ? friendList : []
                    })
                });
            }
        }
    } catch (error) {
        console.log(error);

    }
}
module.exports = { updateFriendPendingInvitation,updateFriends }