const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
console.log(req.body);
    const token = req.cookies.jwt || req.headers["authorization"];
    if (!token) {
        return res.status(400).json({ message: "token is required" })
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
    } catch (error) {
        return res.status(500).send("Error occured while verifying token")
    }
    return next();
}

module.exports = verifyToken;