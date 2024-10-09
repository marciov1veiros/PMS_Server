const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productRoute = require('./routes/product.route.js');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// routes
app.use("/api/products", productRoute);


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.get('/uamae/:name', (req, res) => {
    const {name} = req.params;
    res.send(name)
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