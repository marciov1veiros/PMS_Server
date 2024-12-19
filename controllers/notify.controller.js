const Notify = require('../models/notify.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

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

//Send notify
const sendNotify = async (req, res) => {
    try {
        const { email, campaign_title, campaign_value } = req.body;

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Notificação sobre a campanha '+ campaign_title,
            text: `A campanha `+ campaign_title + 'recebeu uma nova doação. O seu valor total angariado é '+ campaign_value + ' €.'
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
            }
            res.status(200).json({ message: 'E-mail de capanha enviado com sucesso!' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar o envio da notificação da campanha' });
    }
};

module.exports = {
    getNotifys,
    getNotify,
    addNotify,
    updateNotify,
    deleteNotify,
    sendNotify
}