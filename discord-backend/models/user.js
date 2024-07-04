const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {
        unique: true,
        require: true,
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    friends: [{ type: mongoose.Schema.Types.Object, ref: "user" }]
});

module.exports = mongoose.model('user', userSchema);