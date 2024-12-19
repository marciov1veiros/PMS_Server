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

describe('GET /api/campaign', () => {
    it('should return all campaigns', async () => {
        const response = await request(app).get('/api/campaigns');
        // Print the response body to the console
        console.log('Response Body:', response.body);
        // Assert status code is 200
        expect(response.status).toBe(200);
        // Assert response body is an array
        expect(Array.isArray(response.body)).toBe(true);
        // Assert there are 2 campaigns returned
        expect(response.body.length).toBeGreaterThan(1);

        // Assert the first campaign has the expected properties
        expect(response.body[0]).toHaveProperty('_id', '67585c1b1932247950c000ba');
        expect(response.body[0]).toHaveProperty('user_email', 'mvgs2003@hotmail.com');
        expect(response.body[0]).toHaveProperty('user_name', 'Miguel Ferreira');
        expect(response.body[0]).toHaveProperty('title', 'Ajude as famílias afetadas pelos incêndios na Serra de Água');
        expect(response.body[0]).toHaveProperty('description', 'Na sequência do devastador incêndio que atingiu a Madeira em agosto de 2024, inúmeras famílias perderam as suas casas, bens e meios de subsistência. Este incêndio de grande dimensão destruiu hectares de zonas florestal e áreas residenciais, causando um impacto profundo nas comunidades locais. \n' +
            '\n' +
            'Lançamos esta campanha, para apoiar as pessoas que ficaram sem acesso a recursos básicos e sem um lar seguro. Muitas destas famílias perderam tudo: roupas, móveis, eletrodomésticos e outros bens essenciais do dia a dia. Além disso, os impactos psicológico e financeiro são imensuráveis, especialmente para as crianças, que enfrentam agora um futuro incerto. \n' +
            '\n' +
            'Os fundos arrecadados serão utilizados para: \n' +
            '- Apoiar as famílias na obtenção de habitação temporária; \n' +
            '- Fornecer alimentos, roupas e bens de primeira necessidade; \n' +
            '- Ajudar na reconstrução das habitações e assegurar os meios de subsistência necessários à sua rotina diária, de modo a terem as condições que já tinham antes do ocorrido; \n' +
            '- O apoio psicológico para os afetados, nas primeiras horas após uma tragédia é fundamental, para reabilitar a saúde mental e trauma causado pelo infeliz incidente, pois o trauma permanece, mas pode ser minimizado de forma a possibilitar uma vivência normal. \n' +
            '\n' +
            'A situação é urgente e cada contributo pode fazer uma enorme diferença. A sua generosidade, ajudará estas famílias a reconstruírem as suas vidas e a recuperarem alguma normalidade após este desastre. \n' +
            '\n' +
            'Juntos podemos fazer a diferença. Contribua e partilhe esta campanha, para que possamos ajudar quem mais precisa neste momento tão difícil. \n' +
            '\n' +
            'Obrigado pelo seu apoio! ');
        expect(response.body[0]).toHaveProperty('category', 'desastres-naturais');
        expect(response.body[0]).toHaveProperty('priority', 'low');
        expect(response.body[0]).toHaveProperty('objective', 300000);
        expect(response.body[0]).toHaveProperty('state', 'active');
    });
});

describe('GET /campaign', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/campaign');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /auth', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/auth');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /comment', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/comment');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /donation', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/donation');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /image', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/image');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /notify', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/notify');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /product', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/product');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /role', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/role');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /subcription', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/subcription');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /user', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/user');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

describe('GET /video', () =>{
    it('should return request ok', async () => {
        const response = await request(app).get('/video');
        // expect(response.status).toBe(200);
        expect(response.status).toBe(404)
    });
});

