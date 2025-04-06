const bcrypt = require("bcryptjs");

exports.users = [
    {
        id: "1",
        username: "admin1",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin123", 10),
        role: "admin"
    },
    {
        id: "2",
        username: "operator1",
        email: "operator@gmail.com",
        password: bcrypt.hashSync("operator123", 10),
        role: "operator"
    }
];
