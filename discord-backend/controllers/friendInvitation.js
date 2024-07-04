const user = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const friendInvitation = require("../models/friendInvitation");
const friendUpdate = require("../socketHandler/friends");
exports.friendInvitationC = async (req, res) => {
    try {
        const { email } = req.body;

        const { id } = req.user;

        const findUser = await user.findById(id);
        if (findUser.email === email) {
            return res.status(401).json({ message: "you are not ypur friend youself" })
        }
        const validEmail = await user.findOne({ email });
        console.log("-------->", validEmail);
        if (!validEmail) {
            res.status(401).json({ message: `Invalid Email, ${email} is not found` })
        }
        const invitationReceived = await friendInvitation.findOne({
            senderId: id,
            recevierId: validEmail._id
        });
        console.log(invitationReceived);
        if (invitationReceived) {
            return res.status(400).json({ message: "Invitation already send" })
        }
        const alreadyExits = validEmail.friends.find((fid) =>
            fid.toString() === id.toString()
        );
        if (alreadyExits) {
            res.status(401).json({ message: "Already exits, see friend list" });
        }


        // const data = new friendInvitation({

        // });
        // data.save((info) => {
        //     console.log(info);
        //     res.status(200).json({ message: "Saved" });
        // }).catch((error) => {
        //     console.log(error);
        //     res.status(401).json({ message: error.message });
        // })
        const newInvitation = await friendInvitation.create({
            senderId: id, recevierId: validEmail._id
        });
        console.log("new invitation info", newInvitation);
        friendUpdate.updateFriendPendingInvitation(validEmail._id.toString());
        if (newInvitation) {
            return res.status(200).json({ message: "Data saved" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

exports.rejectInvitations = async (req, res) => {
    try {
        const { id } = req.body;
        const { userId } = req.user;
        const invitationsExist = await friendInvitation.exists({ _id: id });
        if (invitationsExist) {
            await friendInvitation.findByIdAndDelete(id);
        }
        friendUpdate.updateFriendPendingInvitation(userId);
    } catch (error) {
        console.log(error);
    }
}
exports.acceptinvitations = async (req, res) => {
    try {
        const { id } = req.body;
        const invitation = await friendInvitation.findById(id);
        if (!invitation) {
            res.status(401).json({ message: "Error while" });
        }
        // add users
        const { senderId, recevierId } = invitation;
        const senderUser = await user.findById(senderId);
        senderUser.friends = [...senderUser.friends, recevierId];
        const recevierUser = await user.findById(recevierId);
        recevierUser.friends = [...recevierUser.friends, senderId];
        await senderUser.save();
        await recevierUser.save();
        //delete uers 
        await friendInvitation.findByIdAndDelete(id);
        //if user are online upadte list
        friendUpdate.updateFriends(senderId.toString());
        friendUpdate.updateFriends(recevierId.toString());


        //update friend invitation
        friendUpdate.updateFriendPendingInvitation(recevierId.toString());
        return res.status(200).json({ message: "Update succesfully" })
    } catch (error) {
        console.log(error);
    }
}


