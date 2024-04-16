//npm install express
//npm install --save-dev mocha
const express = require('express');
const request = require('supertest');

const app = express();

app.get('/', (req, res) => {
    res.send('Ласкаво просимо до мого додатку!');
});

app.post('/fork', (req, res) => {
    try {
        res.send('Репозиторій успішно форкнутий!');
    } catch (error) {
        res.status(500).send('Помилка при форку репозиторію: ' + error.message);
    }
});

app.post('/pull-request', (req, res) => {
    try {
        res.send('Пул-реквест успішно створений!');
    } catch (error) {
        res.status(500).send('Помилка при створенні пул-реквесту: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Сервер запущено на порті 3000');
});

describe('Test the server endpoints', () => {
    it('should respond with success on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Ласкаво просимо до мого додатку!');
    });

    it('should respond with success on POST /fork', async () => {
        const response = await request(app).post('/fork');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Репозиторій успішно форкнутий!');
    });

    it('should respond with success on POST /pull-request', async () => {
        const response = await request(app).post('/pull-request');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Пул-реквест успішно створений!');
    });
});
