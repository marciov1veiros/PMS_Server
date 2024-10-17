const express = require('express');
const router = express.Router();
const {login, register, logout, currentUser, forgotPassword, resetPassword, verfPassword} = require('../controllers/auth.controller');
const passport = require('passport');

// Rotas de autenticação
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/current-user', passport.authenticate('jwt', { session: false }), currentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/verf-password', verfPassword);

module.exports = router;
