const User = require('../models/user.model');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get user by id
const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add User Nota: Esta a ser realizado pelo register
/*const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};*/

// Update User
const updateUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete User
const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}