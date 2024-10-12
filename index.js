const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const campanhasRoute = require('./routes/campanhas.route.js');
const comentariosRoute = require('./routes/comentarios.route.js');
const doacoesRoute = require('./routes/doacoes.route.js');
const imagensRoute = require('./routes/imagens.route.js');
const notificacoesRoute = require('./routes/notificacoes.route.js');
const papeisRoute = require('./routes/papeis.route.js');
const subscricoesRoute = require('./routes/subscricoes.route.js');
const utilizadoresRoute = require('./routes/utilizadores.route.js');
const videosRoute = require('./routes/videos.route.js');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// routes
app.use("/api/products", productRoute);
app.use("/api/campanhas", campanhasRoute);
app.use("/api/comentarios", comentariosRoute);
app.use("/api/doacoes", doacoesRoute);
app.use("/api/imagens", imagensRoute);
app.use("/api/notificacoes", notificacoesRoute);
app.use("/api/papeis", papeisRoute);
app.use("/api/subscricoes", subscricoesRoute);
app.use("/api/utilizadores", utilizadoresRoute);
app.use("/api/videos", videosRoute);

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