const mongoose = require('mongoose');


const friendSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    recevierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("FriendInviation", friendSchema)

