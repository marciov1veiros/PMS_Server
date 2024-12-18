const User = require('../models/user.model');
const passport = require('passport');
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


const verfPassword = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Senha atual está incorreta.' });

        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({ message: 'Password Correta' });
        });
    })(req, res, next);
};

const register = (req, res) => {
    const { _id, password, name, surname, anonymous, role_id } = req.body;
    const newUser = new User({ _id, name, surname, anonymous, role_id });

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

const forgotPassword = async (req, res) => {
    try {
        const { email, page } = req.body;
        const user = await User.findById(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const token = jwt.sign({ id: user._id }, '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5', { expiresIn: '15m' });

        const mailOptions = {
            to: user._id,
            from: process.env.EMAIL_USER,
            subject: 'Redefinição de Senha',
            text: `Você solicitou uma redefinição de senha. Clique no link abaixo ou cole no navegador para redefinir sua senha:\n\n
                   http://${page}/changepassword/${token}\n\n
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


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        jwt.verify(token, '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5', async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Token inválido ou expirado.' });
            }

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'Utilizador não encontrado.' });
            }

            user.setPassword(newPassword, async (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao redefinir a senha.' });
                }

                await user.save();

                res.status(200).json({ message: 'Senha redefinida com sucesso.' });
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao redefinir a senha.' });
    }
};

module.exports = {
    login,
    register,
    logout,
    currentUser,
    forgotPassword,
    resetPassword,
    verfPassword
}