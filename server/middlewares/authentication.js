const jwt = require('jsonwebtoken');

const verifyRefreshToken = async (req, res, next) => {
    // // 1. Extract the refresh token (commonly from an HTTP-only cookie or request body)

    // const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    // console.log(refreshToken);
    // if (!refreshToken) {
    //     return res.status(401).json({ message: "Refresh Token required" });
    // } 
    // // 2. Verify the token against your REFRESH_SECRET
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //         // Handle specific expiration errors or invalid signatures
    //         const message = err.name === 'TokenExpiredError' ? 'Refresh token expired' : 'Invalid refresh token';
    //         return res.status(403).json({ message });
    //     }

    //     // 3. (Optional) Additional database check to ensure token hasn't been revoked/rotated
    //     // const user = await User.findById(decoded.id);
    //     // if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403);

    //     req.user = decoded; // Attach user info for the next handler
    //     next();
    // });
    try {
        const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
        if (!refreshToken) throw new Error("Token undefined");

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Handle specific expiration errors or invalid signatures
                const message = err.name === 'TokenExpiredError' ? 'Refresh token expired' : 'Invalid refresh token';
                return res.status(403).json({ message });
            }

            // 3. (Optional) Additional database check to ensure token hasn't been revoked/rotated
            // const user = await User.findById(decoded.id);
            // if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403);

            req.user = decoded; // Attach user info for the next handler
            next();
        });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ msg: "Invalid or missing token" });
    }
};

module.exports = { verifyRefreshToken }