const express = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt');

// const sequelize = require('../databaseConfig');
// const { setUser } = require('../service/auth');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { isStrongPassword } = require('../service/validation');

//const bcrypt = require('bcrypt');
const saltRounds = 12; // Recommended cost factor

const app = express();

app.use(cookieParser());

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mithuzaman2020@gmail.com",
        pass: "smlx bsxs hksp ognj",
    },
});

generateAccessToken = function (user) {
    return jwt.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

generateRefreshToken = function (user) {
    return jwt.sign({
        id: user.id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ where: { email: email } });
    if (loginUser) {
        // 2. Use bcrypt.compare to check the plain password against the hashed database password
        const isMatch = await bcrypt.compare(password, loginUser.password);

        if (isMatch) {
            const accessToken = generateAccessToken(loginUser);
            const refreshToken = generateRefreshToken(loginUser);
            loginUser.refreshToken = refreshToken;
            loginUser.save();
            res.cookie('refreshToken', refreshToken);
            return res.status(200)
                .json({
                    msg: "Successfully logged in",
                    id: loginUser?.dataValues?.id, name: loginUser?.dataValues?.firstName, email: email,
                    accessToken,
                    refreshToken
                });
        } else {
            return res.status(401).json({ msg: "Unauthorized access, password donot match, please verify your password" });
        }
    } else {
        return res.status(404).json({ msg: "User not found" });
    }
};

const logout = async (req, res) => {
    res.clearCookie('refreshToken', { path: '/' });
    res.status(200).json({ msg: "logout successful" });
}

const requestOTP = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res
            .status(200)
            .json({ status: false, message: "Email required", otp: "" });

    //const contactFilter = mobile ? { mobile } : { email };
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(200).json({
            status: false,
            message:
                "Can not send OTP as the provided email id is not registered with us",
            otp: "",
        });
    }
    else {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        await User.update({ otp, otpExpiry }, { where: { email: email } });
        console.log(`OTP sent to ${email}: ${otp}`);

        // Email Template
        const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; background-color:#f5f6ff; padding:30px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td align="center">
                  <table width="480" cellpadding="0" cellspacing="0" border="0" style="background:#fff; border-radius:8px; overflow:hidden;">
                    <tr><td align="center" style="padding:30px 20px 10px;">
                      <h2 style="color:#5b3fd4; margin:0;">eMIC GMC</h2>
                    </td></tr>
                    <tr><td align="center" style="padding:10px 30px;">
                      <h3 style="color:#5b3fd4; font-size:22px;">2FA code</h3>
                      <p style="color:#333;">Here is your login verification code:</p>
                      <div style="background-color:#e6e1fb; border-radius:6px; padding:10px 20px; display:inline-block;">
                        <p style="font-size:24px; font-weight:bold; color:#5b3fd4; letter-spacing:2px; margin:0;">${otp}</p>
                      </div>
                      <p style="color:#555; font-size:14px; margin-top:20px;">Please make sure you never share this code with anyone.</p>
                      <p style="color:#333; font-size:13px;"><strong>Note:</strong> The code will expire in 5 minutes.</p>
                    </td></tr>
                    <tr><td align="center" style="padding:25px; background-color:#f5f6ff;">
                      <p style="font-size:13px; color:#777;">© 2025 eMIC GMC. All rights reserved.</p>
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </body>
            </html>
            `;
        // Email options
        const mailOptions = {
            from: '"eMIC GMC" <mithuzaman2020@gmail.com>',
            to: email,
            subject: "eMIC GMC - Your login verification code",
            text: "2FA code",
            html: htmlTemplate,
        };
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("❌ Error:", error);
                res.json({
                    status: false,
                    message: "Something went wrong ! Please try again",
                    otp: otp,
                });
            } else {
                console.log("✅ Email sent: " + info.response);
                res.json({
                    status: true,
                    message: "OTP sent to your registerd email id",
                    otp: otp,
                });
            }
        });
    }
}


const resetPassword = async (req, res) => {

    const { newPassword, otp } = req.body;
    const user = await User.findOne({ where: { otp: otp } })

    if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
        return res.json({
            status: 400,
            message: "Invalid or expired OTP"
        });
    }
    if (!isStrongPassword(newPassword)) {
        return res.status(400).json({ msg: "Ensures at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character." });
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    return res.json({
        status: 200,
        message: "Password updated successfully"
    });
}

// const verifyOTP = async (req, res) => {
//     const { email, otp } = req.body;
//     // const filter = mobile ? { mobile } : { email };

//     const user = await User.findOne({ where: email });
//     if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
//         return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     user.otp = null;
//     user.otpExpiry = null;
//     user.refreshToken = refreshToken;
//     await user.save();
//     res.json({ accessToken, refreshToken });
// }


module.exports = { login, logout, requestOTP, resetPassword }


