const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // Importando a estratégia JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // Importando para extrair o JWT
const session = require('express-session');
const User = require('./models/user.model.js'); // Importando o modelo de usuário
require('dotenv').config();


// Const Routes
const productRoute = require('./routes/product.route.js');
const campaignRoute = require('./routes/campaign.route.js');
const commentRoute = require('./routes/comment.route.js');
const donationRoute = require('./routes/donation.route.js');
const imageRoute = require('./routes/image.route.js');
const notifyRoute = require('./routes/notify.route.js');
const roleRoute = require('./routes/role.route.js');
const subscriptionRoute = require('./routes/subscription.route.js');
const userRoute = require('./routes/user.route.js');
const videoRoute = require('./routes/video.route.js');
const authRoute = require('./routes/auth.route.js');


const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(session({
    secret: 'aI3@P8&nS!2#ZkJ9^FqD8LwtmX?yRV', // Chave secreta para as sessões
    resave: false,
    saveUninitialized: false,
}));

// Inicializando o Passport
app.use(passport.initialize());
app.use(passport.session());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

passport.use(new LocalStrategy(User.authenticate())); // Autenticação local com o Passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configuração da estratégia JWT
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5', // Substitua pelo seu segredo
};

// Definindo a estratégia JWT
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id) // Buscando o usuário pelo ID no payload
        .then(user => {
            if (user) {
                return done(null, user); // Usuário encontrado
            } else {
                return done(null, false); // Usuário não encontrado
            }
        })
        .catch(err => done(err, false));
}));

// routes
app.use("/api/products", productRoute);
app.use("/api/campaigns", campaignRoute);
app.use("/api/comments", commentRoute);
app.use("/api/donations", donationRoute);
app.use("/api/images", imageRoute);
app.use("/api/notifys", notifyRoute);
app.use("/api/roles", roleRoute);
app.use("/api/subscriptions", subscriptionRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api", authRoute);

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
});

mongoose.connect("mongodb+srv://admin:hFGtcmcrM3ZHrc0M@pms-server.55en1.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=pms-server").then(()=>{
    console.log("Conected");
})
.catch(() => {
    console.log("Conection failed!");
});