const express = require("express");
const User = require('./models/user');
const userRouter = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const loginUserRouter = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const { verifyRefreshToken } = require('./middlewares/authentication');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


User.sync().then(() => console.log("table created successfully"))
    .catch(err => console.log(err));


app.use('/api/user', verifyRefreshToken, userRouter);
app.use('/api', loginUserRouter);
app.use('/api', registerRoute);
//app.use('/api', loginUserRouter);

app.listen(5000, () => {
    console.log(`Server is run at port ${process.env.PORT}`);
})