// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });

// const connection = mysql.createConnection({
//     host: process.env.DATABASE_HOST,      // Often 127.0.0.1
//     user: process.env.DATABASE_USER,           // Your MySQL username
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });



// module.exports = connection;

const Sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql' // or 'postgres', 'sqlite', 'mssql'
});

module.exports = sequelize;