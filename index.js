const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // Importando a estratégia JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // Importando para extrair o JWT
const session = require('express-session');
const User = require('./models/user.model.js'); // Importando o modelo de utilizador
const app =require('./app');
require('dotenv').config();






app.listenApp();

mongoose.connect("mongodb+srv://admin:hFGtcmcrM3ZHrc0M@pms-server.55en1.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=pms-server").then(()=>{
    console.log("Conected");
})
.catch(() => {
    console.log("Conection failed!");
});