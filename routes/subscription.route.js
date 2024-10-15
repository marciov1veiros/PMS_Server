const express = require("express");
const router = express.Router();
const {getSubscriptions, getSubscription, addSubscription, updateSubscription, deleteSubscription} = require('../controllers/subscription.controller');

// Get all subscriptions
router.get('/', getSubscriptions);
// Get subscription by id
router.get("/:id", getSubscription);
// Add subscription
router.post('/', addSubscription);
// Update subscription
router.put('/:id', updateSubscription);
// Delete subscription
router.delete('/:id', deleteSubscription);

module.exports = router;