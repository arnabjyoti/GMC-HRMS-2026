const express = require('express');
//const User = require('../models/user');

const router = express.Router();

const { createNewUser } = require('../controllers/registerUserController');


router.post("/createUser", createNewUser);

module.exports = router;