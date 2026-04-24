const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const sequelize = require('../databaseConfig');


// Define the User model
const User = sequelize.define('User', {
    // Attributes defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobileNumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true // Ensures the string is a valid email
        }
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    otp: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    // Additional model options
    timestamps: true, // Adds createdAt and updatedAt columns automatically
    tableName: 'user' // Explicitly set the table name
});



module.exports = User;