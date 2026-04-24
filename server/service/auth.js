const jwt = require('jsonwebtoken');
const secrateKey = "Mehboob@123&321#";

function setUser(user) {
    return jwt.sign({ id: user.id, email: user.email, }, secrateKey);
};

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secrateKey);
    } catch (error) {
        return null;
    }

};

module.exports = { setUser, getUser };