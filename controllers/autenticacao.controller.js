const User = require('../models/utilizadores.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Configuração do Nodemailer para envio de e-mails
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Utilizador ou senha incorretos' });

        req.logIn(user, err => {
            if (err) return next(err);
            const token = jwt.sign({ id: user._id }, '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5');
            return res.json({ message: 'Login bem-sucedido', token });
        });
    })(req, res, next);
};

const register = (req, res) => {
    const { _id, password, name, surname, anonymous, role } = req.body;
    const newUser = new User({ _id, name, surname, anonymous, role });

    User.register(newUser, password, (err, user) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        return res.json({ message: 'Registrado com sucesso', user });
    });
};

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'Logout bem-sucedido' });
    });
};

const currentUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.status(401).json({ message: 'Não autenticado' });
};

// Solicitar redefinição de senha (enviar e-mail com token JWT)
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findById(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Gerar token JWT para redefinição de senha
        const token = jwt.sign({ id: user._id }, '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5');

        // Enviar e-mail com o token JWT
        const mailOptions = {
            to: user._id,
            from: process.env.EMAIL_USER,
            subject: 'Redefinição de Senha',
            text: `Você solicitou uma redefinição de senha. Clique no link abaixo ou cole no navegador para redefinir sua senha:\n\n
                   http://${req.headers.host}/reset-password/${token}\n\n
                   Se você não solicitou isso, ignore este e-mail.`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
            }
            res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso.' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar solicitação de redefinição de senha.' });
    }
};

module.exports = {
    login,
    register,
    logout,
    currentUser,
    forgotPassword
}