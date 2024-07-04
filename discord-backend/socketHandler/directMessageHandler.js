const chatUpdate= require('./update/chat');
const Message = require("../models/Message");
const Conversation = require("../models/conversation");
var mongoose = require('mongoose');

const directMessageHandler = async (socket, data) => {
    try {
        const getId = socket.user;


        const { recevierUserId, content ,id} = data;
        console.log(recevierUserId, content);
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     console.log("Type error");
        //     return false;
        // }
        // create a new message
        const message = await Message.create({
            content, autor: id, date: new Date(), type: "DIRECT"
        })

        // find if conversation exist with this two users - if not create new
        const conversation = await Conversation.findOne({
            participants: { $all: [getId.id, recevierUserId] },
        });
        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();
            chatUpdate.updateChatHistory(conversation._id.toString());
        } else {
            const newConverSation = await Conversation.create({
                messages: [message._id],
                participants: [getId.id, recevierUserId],
            });
            chatUpdate.updateChatHistory(conversation._id.toString());

            // if both r online
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = directMessageHandler;