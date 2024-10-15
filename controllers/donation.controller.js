const Donation = require('../models/donation.model');

// Get all donations
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find({});
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get donation by id
const getDonation = async (req, res) => {
    try {
        const {id} = req.params
        const donation = await Donation.findById(id);
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add donation
const addDonation = async (req, res) => {
    try {
        const donation = await Donation.create(req.body);
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update donation
const updateDonation = async (req,res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByIdAndUpdate(id, req.body);
        if (!donation){
            return res.status(404).json({message: "Donation not found"});
        }
        const updatedDonation = await Donation.findById(id);
        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete donation
const deleteDonation = async (req,res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByIdAndDelete(id);
        if (!donation){
            return res.status(404).json({message: "Donation not found"});
        }
        res.status(200).json({message: "Donation deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getDonations,
    getDonation,
    addDonation,
    updateDonation,
    deleteDonation
}