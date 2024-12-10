// Dependências necessárias
const request = require('supertest');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/auth.controller'); // Substitua pelo caminho correto

// Mock de dados
jest.mock('passport', () => ({
    authenticate: jest.fn(),
}));

const mockUser = {
    _id: 'mvgs2003@hotmail.com',
    username: 'mvgs2003@hotmail.com',
};

// Configurando um app de teste
const app = express();
app.use(express.json());
app.post('/login', (req, res, next) => {
    req.logIn = jest.fn((user, callback) => callback(null)); // Mocking req.logIn
    login(req, res, next);
});

describe('POST /login', () => {
    it('deve retornar 401 se as credenciais estiverem incorretas', async () => {
        passport.authenticate.mockImplementation((strategy, callback) => {
            return (req, res, next) => {
                callback(null, false, { message: 'Credenciais inválidas' });
            };
        });

        const response = await request(app)
            .post('/login')
            .send({ username: 'wronguser', password: 'wrongpass' });

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Utilizador ou senha incorretos' });
    });

    it('deve retornar 200 e um token válido se as credenciais estiverem corretas', async () => {
        passport.authenticate.mockImplementation((strategy, callback) => {
            return (req, res, next) => {
                callback(null, mockUser, null);
            };
        });

        req = {
            logIn: jest.fn((user, callback) => callback(null)),
        };

        const token = jwt.sign({ id: mockUser._id }, '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5');

        const response = await request(app)
            .post('/login')
            .send({ username: 'mvgs2003@hotmail.com', password: '123' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Login bem-sucedido',
            token: expect.any(String),
        });

        // Verifica se o token gerado é válido
        const decoded = jwt.verify(
            response.body.token,
            '8N4!mZ#q3WgT$3n&hF2@kR8zL5q%f7J4sH9!kV6eR2t#eM8xC5'
        );
        expect(decoded).toMatchObject({ id: mockUser._id });
    });

});