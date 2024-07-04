const express = require('express');
const router = express.Router();
const { registation, login, logout } = require("../controllers/auth");
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');
const friendInvitation = require('../models/friendInvitation');
const { friendInvitationC, rejectInvitations, acceptinvitations } = require('../controllers/friendInvitation');


const logShema = Joi.object({
    password: Joi.string().min(5).max(15),
    email: Joi.string().email()
});

router.post('/registation',  registation);
router.post('/login', validator.body(logShema), login);
router.get('/logout', auth, logout);
router.post('/friendInvitation', auth, friendInvitationC);
router.post('/reject', auth, rejectInvitations);
router.post('/accept', auth, acceptinvitations);




router.post("/test",auth,(req,res)=>{
res.send("Abhik")
} )




// router.post('/login',);


module.exports = router;