const user = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const friendInvitation = require("../models/friendInvitation");

exports.registation = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const isValid = await user.findOne({ email });
        if (isValid) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const encryptPassword = await bcrypt.hash(password, 10);
            const data = new user({ email, password: encryptPassword, username }).save();
            data.then((info) => {
                const token = jwt.sign({ id: info._id }, process.env.SECRET_KEY);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 7 * 24 * 3600 * 1000)
                });
                user.findByIdAndUpdate(info._id, {
                    token
                }).then(() => {
                    return res.status(200).json({ email: info.email, id: info._id, username: info.username, token: info.token });
                }).catch((error) => {
                    return res.status(400).json({ message: error.message })
                })
            }).catch((error) => {
                return res.status(400).json({ message: error.message })
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const getInfo = await user.findOne({ email });
        const validPWd = await bcrypt.hash(password, getInfo.password);
        const token = jwt.sign({
            id: getInfo._id,
        }, process.env.SECRET_KEY)
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 3600 * 1000)
        });
        if (validPWd) {
            res.status(200).json({

                username: getInfo.username,
                id: getInfo._id,
                email: email,
                token: getInfo.token
            })
        } else {
            res.status(400).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.logout = (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({ message: "updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
