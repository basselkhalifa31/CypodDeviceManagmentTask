const jwt = require("jsonwebtoken");
const SECRET_KEY = "T#8vjR9&D7uZp*4Lt9g@r9d9d8v5Bz!6KzRscq39h5t5rf6";

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
};

module.exports = { authenticate, authorize };
