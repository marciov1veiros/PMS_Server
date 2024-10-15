const express = require("express");
const router = express.Router();
const {getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign} = require('../controllers/campaign.controller.js');

// Get all campaigns
router.get('/', getCampaigns);
// Get campaign by id
router.get("/:id", getCampaign);
// Add campaign
router.post('/', addCampaign);
// Update campaign
router.put('/:id', updateCampaign);
// Delete campaign
router.delete('/:id', deleteCampaign);

module.exports = router;