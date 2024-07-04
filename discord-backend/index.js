const express = require('express')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const cors = require('cors');
const authRoutes = require('./routes/authRouth');
require('./db');
app.use(express.json());
app.use(cors());
const socketServer = require("./socketRegisterServer");
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//routes 

app.use('/api/auth',authRoutes);

const server = http.createServer(app);
socketServer.registerSoketServer(server);
server.listen(port,()=>{
    console.log("Server running on port " + port);
})




