const Notify = require('../models/notificacoes.model');

// Get all notifys
const getNotifys = async (req, res) => {
    try {
        const notifys = await Notify.find({});
        res.status(200).json(notifys);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get notify by id
const getNotify = async (req, res) => {
    try {
        const {id} = req.params
        const notify = await Notify.findById(id);
        res.status(200).json(notify);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add notify
const addNotify = async (req, res) => {
    try {
        const notify = await Notify.create(req.body);
        res.status(200).json(notify);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update notify
const updateNotify = async (req,res) => {
    try {
        const { id } = req.params;
        const notify = await Notify.findByIdAndUpdate(id, req.body);
        if (!notify){
            return res.status(404).json({message: "Notify not found"});
        }
        const updatedNotify = await Notify.findById(id);
        res.status(200).json(updatedNotify);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete notify
const deleteNotify = async (req,res) => {
    try {
        const { id } = req.params;
        const notify = await Notify.findByIdAndDelete(id);
        if (!notify){
            return res.status(404).json({message: "Notify not found"});
        }
        res.status(200).json({message: "Notify deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getNotifys,
    getNotify,
    addNotify,
    updateNotify,
    deleteNotify
}