const express = require('express');

const router = express.Router();

const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');

router.get("/", getAllUsers);

router
    .route("/:id")
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);




// router.get("/users", async (req, res) => {
//     const allValidUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allValidUsers
//             .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
//             .join("")}
// </ul>
// `;
//     res.send(html);
// });

module.exports = router;