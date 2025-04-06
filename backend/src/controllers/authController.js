const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userData = require("../models/userModel");

const SECRET_KEY = "T#8vjR9&D7uZp*4Lt9g@r9d9d8v5Bz!6KzRscq39h5t5rf6";


const login = (req, res) => {
    const { username, password } = req.body;

    const user = userData.users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
};

module.exports = { login };
