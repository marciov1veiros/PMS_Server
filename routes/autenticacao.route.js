const express = require('express');
const router = express.Router();
const {login, register, logout, currentUser} = require('../controllers/autenticacao.controller');
const passport = require('passport');

// Rotas de autenticação
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/current-user', passport.authenticate('jwt', { session: false }), currentUser, currentUser);

module.exports = router;
