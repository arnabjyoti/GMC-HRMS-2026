const User = require('../models/user');
const sequelize = require('../databaseConfig');
const { isEmail, isPhoneNumber, isCharacter, isStrongPassword } = require('../service/validation');

// Store hashedPassword in your database
const bcrypt = require('bcrypt');
const saltRounds = 12; // Recommended cost factor

const createNewUser = async (req, res) => {
    const body = req.body;
    const email = req.body.email;
    const phoneNumber = req.body.mobileNumber;
    const firstName = req.body.firstName;

    if (!isEmail(email)) {
        return res.status(400).json({ msg: "Not a valid email" });
    }
    if (!isPhoneNumber(phoneNumber)) {
        return res.status(400).json({ msg: "Mobile number is a required filed and it should be a 10 digit number" });
    }
    if (!isCharacter(firstName)) {
        return res.status(400).json({ msg: "First name is required and is should contained only characters" });
    }
    if (!isStrongPassword(req.body.password)) {
        return res.status(400).json({ msg: "Ensures at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character." });
    }

    const checkEmail = await User.findOne({
        where: sequelize.literal('email = :email'),
        replacements: { email: email }
    });
    if (checkEmail) {
        return res.status(400).json({ msg: "Email already exists" });
    }

    if (!body || !body.firstName || !body.lastName || !body.email || !body.password) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const result = await User.create({
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
        mobileNumber: body.mobileNumber,
        email: body.email,
        password: hashedPassword
    });
    return res.status(201).json({ msg: "Successfully created a new user", id: result.id });
};

module.exports = { createNewUser };