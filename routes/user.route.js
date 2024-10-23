const express = require("express");
const router = express.Router();
const {getUsers, getUser, updateUser, deleteUser} = require('../controllers/user.controller');

// Get all users
router.get('/', getUsers);
// Get user by id
router.get("/:id", getUser);
// Add user
//router.post('/', addUser);
// Update user
router.put('/:id', updateUser);
// Delete user
router.delete('/:id', deleteUser);

module.exports = router;