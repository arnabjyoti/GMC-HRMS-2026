const express = require('express');

const router = express.Router();

const { login, logout, requestOTP, resetPassword } = require('../controllers/loginUserController');


router.post("/login", login);

router.get('/logout', logout);

router.post('/requestOtp', requestOTP);

//router.post('/verifyOtp', verifyOTP);

router.post('/resetPassword', resetPassword);

module.exports = router;