const request = require('supertest');
const app = require('../app'); // Import the app from app.js
const mongoose = require('mongoose');
const cheerio = require('cheerio'); //treat responses
require('dotenv').config();

const Campaigns = require('../models/campaign.model');
const Comments = require('../models/comment.model');
const Donations = require('../models/donation.model');
const Images = require('../models/image.model');
const Notifications = require('../models/notify.model');
const Products = require('../models/product.model');
const Roles = require('../models/role.model');
const Subscriptions = require('../models/subscription.model');
const Users = require('../models/user.model');
const Videos = require('../models/video.model');
const mongoUri = process.env.MONGODB_URI;
beforeEach(async ()=>{
    try {
        await mongoose.connect(mongoUri);
    } catch (error){
        console.log("Error connecting to MongoDB: ", error)
    }
},10000);

afterEach(async ()=>{
    try {
        await mongoose.connection.close();
    } catch (error){
        console.log("Error closing MongoDB connection: ", error)
    }
},10000);

describe('GET /', () => {
    it('should return a welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello from our server!');
    });
});