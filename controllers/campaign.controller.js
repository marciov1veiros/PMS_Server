const Campaign = require('../models/campaign.model');

// Get all campaigns
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({});
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get campaign by id
const getCampaign = async (req, res) => {
    try {
        const {id} = req.params
        const campaign = await Campaign.findById(id);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add campaign
const addCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update campaign
const updateCampaign = async (req,res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByIdAndUpdate(id, req.body);
        if (!campaign){
            return res.status(404).json({message: "Campaign not found"});
        }
        const updatedCampaign = await Campaign.findById(id);
        res.status(200).json(updatedCampaign);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete campaign
const deleteCampaign = async (req,res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByIdAndDelete(id);
        if (!campaign){
            return res.status(404).json({message: "Campaign not found"});
        }
        res.status(200).json({message: "Campaign deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCampaigns,
    getCampaign,
    addCampaign,
    updateCampaign,
    deleteCampaign
}