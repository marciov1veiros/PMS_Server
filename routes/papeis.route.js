const express = require("express");
const router = express.Router();
const {getRoles, getRole, addRole, updateRole, deleteRole} = require('../controllers/papeis.controller');

// Get all roles
router.get('/', getRoles);
// Get role by id
router.get("/:id", getRole);
// Add role
router.post('/', addRole);
// Update role
router.put('/:id', updateRole);
// Delete role
router.delete('/:id', deleteRole);

module.exports = router;