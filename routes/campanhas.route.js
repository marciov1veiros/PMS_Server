const express = require("express");
const router = express.Router();
const {getCampaigns, getCampaign, addCampaign, updateCampaign, deleteCampaign} = require('../controllers/campanhas.controller.js');

// Get all products
router.get('/', getCampaigns);
// Get product by name
router.get("/:id", getCampaign);
// Add product
router.post('/', addCampaign);
// Update product
router.put('/:id', updateCampaign);
// Delete product
router.delete('/:id', deleteCampaign);

module.exports = router;