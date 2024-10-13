const User = require('../models/utilizadores.model');
const passport = require('passport');

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: 'Utilizador ou senha incorretos' });

        req.logIn(user, err => {
            if (err) return next(err);
            return res.json({ message: 'Login bem-sucedido', user });
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

module.exports = {
    login,
    register,
    logout,
    currentUser
}