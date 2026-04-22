const User = require('../models/user');

const getAllUsers = async (req, res) => {
    const allDbUsers = await User.findAll({});
    return res.json(allDbUsers);
};

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    return res.json(user);
};

const updateUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found for updation" });
    await User.update({ lastName: 'New last name' }, { where: { id: req.params.id } });
    return res.json({ status: "Update successfully done" });
};

const deleteUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: "User not found for deletion" });
    await User.destroy({ where: { id: req.params.id } });
    return res.json({ status: "Deletion of particular id is done" });
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById }