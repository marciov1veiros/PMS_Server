const express = require("express");
const router = express.Router();
const {getDonations, getDonation, addDonation, updateDonation, deleteDonation} = require('../controllers/donation.controller.js');

// Get all donatios
router.get('/', getDonations);
// Get donation by name
router.get("/:id", getDonation);
// Add donation
router.post('/', addDonation);
// Update donation
router.put('/:id', updateDonation);
// Delete donation
router.delete('/:id', deleteDonation);

module.exports = router;