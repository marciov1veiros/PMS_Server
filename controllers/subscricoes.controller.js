const Subscription = require('../models/subscricoes.model');

// Get all subscriptions
const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get subscription by id
const getSubscription = async (req, res) => {
    try {
        const {id} = req.params
        const subscription = await Subscription.findById(id);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add subscription
const addSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.create(req.body);
        res.status(200).json(subscription);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update subscription
const updateSubscription = async (req,res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByIdAndUpdate(id, req.body);
        if (!subscription){
            return res.status(404).json({message: "Subscription not found"});
        }
        const updatedSubscription = await Subscription.findById(id);
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete subscription
const deleteSubscription = async (req,res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByIdAndDelete(id);
        if (!subscription){
            return res.status(404).json({message: "Subscription not found"});
        }
        res.status(200).json({message: "Subscription deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getSubscriptions,
    getSubscription,
    addSubscription,
    updateSubscription,
    deleteSubscription
}