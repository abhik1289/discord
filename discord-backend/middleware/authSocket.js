const jwt = require('jsonwebtoken');
const verifySocketToken = (socket, next) => {
    const token = socket.handshake.auth?.token;

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
    
        socket.user = decode;
    } catch (error) {
        const errorMsg = new Error("NOT_AUTHORIZED");
        return next(errorMsg);
    }
    next();
}
module.exports = verifySocketToken;