const express = require("express");
const router = express.Router();
const {getNotifys, getNotify, addNotify, updateNotify, deleteNotify} = require('../controllers/notificacoes.controller');

// Get all notifys
router.get('/', getNotifys);
// Get notify by id
router.get("/:id", getNotify);
// Add notify
router.post('/', addNotify);
// Update notify
router.put('/:id', updateNotify);
// Delete notify
router.delete('/:id', deleteNotify);

module.exports = router;