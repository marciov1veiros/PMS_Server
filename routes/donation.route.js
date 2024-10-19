const express = require("express");
const router = express.Router();
const {getDonations, getDonation, addDonation, updateDonation, deleteDonation, getDonationsUser, getDonationsCampaign} = require('../controllers/donation.controller.js');

// Get all donatios
router.get('/', getDonations);
// Get donation by id
router.get("/:id", getDonation);
// Get donation by id
router.get("/user/:id", getDonationsUser);
// Get donation by id
router.get("/campaign/:id", getDonationsCampaign);
// Add donation
router.post('/', addDonation);
// Update donation
router.put('/:id', updateDonation);
// Delete donation
router.delete('/:id', deleteDonation);

module.exports = router;