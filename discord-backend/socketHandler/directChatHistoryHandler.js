const Conversation = require("../models/conversation");
const chatUpdate = require("./update/chat");
exports.directChatHistoryHandler = async (socket, data) => {
    try {
        const getId = socket.user.id;
        const { recevierUserId } = data;
        console.log(getId,recevierUserId);

        const conversation = await Conversation.findOne({
            participants: {
                $all: [getId, recevierUserId]
            },
            //type: "DIRECT"
        });
        console.log("con is",conversation);
        if (conversation) {
            chatUpdate.updateChatHistory(conversation._id.toString(), socket.id)
        }
    } catch (error) {
        console.log(error);
    }
}