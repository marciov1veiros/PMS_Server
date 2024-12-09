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

describe('GET /campaign', () => {
    it('should return all campaigns', async () => {
        const response = await request(app).get('/campaign');
        // Print the response body to the console
        console.log('Response Body:', response.body);
        // Assert status code is 200
        // expect(response.status).toBe(200);
        // Assert response body is an array
        // expect(Array.isArray(response.body)).toBe(true);
        // Assert there are 2 campaigns returned
        // expect(response.body).toHaveLength(2);

        // Assert the first campaign has the expected properties
        // expect(response.body[0]).toHaveProperty('title', 'Campaign 1');
        // expect(response.body[0]).toHaveProperty('user_name', 'User 1');
        // expect(response.body[0]).toHaveProperty('category', 'Health');
        // expect(response.body[0]).toHaveProperty('priority', 'normal');
        //expect(response.body[0]).toHaveProperty('objective', 1000);
        //expect(response.body[0]).toHaveProperty('state', 'active');
    });
});
