import { Server } from 'http';
import { createConnection } from 'typeorm';
import app, { redisClient } from '../src/app';
const request = require('supertest');
const PORT = process.env.PORT;

describe('tracker server', () => {
  let server: Server;
  beforeAll(async () => {
    await createConnection();
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await redisClient.flushall();
    await redisClient.disconnect();
    await redisClient.quit();
    server.close();
  });

  describe('GET /', () => {
    it('should return 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toEqual('Hello from the server side');
    });
  });

  describe('POST /auth/register', () => {
    it('should return 201', async () => {
      const response = await request(server).post('/auth/register').send({
        username: 'test',
        password: 'test',
        email: 'test@gmail.com',
      });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(true);
    });

    it('should return 500', async () => {
      const response = await request(server).post('/auth/register').send({
        username: 'test',
        password: 'test',
      });
      expect(response.status).toBe(500);
    });
  });
  describe('POST /auth/login', () => {
    it('should return 200 with username login', async () => {
      const response = await request(server).post('/auth/login').send({
        usernameOrEmail: 'test',
        password: 'test',
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(true);
    });

    it('should return 200 with email login', async () => {
      const response = await request(server).post('/auth/login').send({
        usernameOrEmail: 'test@gmail.com',
        password: 'test',
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(true);
    });

    it('should return 404', async () => {
      const response = await request(server).post('/auth/login').send({
        usernameOrEmail: 'ouijhaskdjhasdkjf',
        password: 'test1',
      });
      expect(response.status).toBe(404);
    });

    it('should return 401', async () => {
      const response = await request(server).post('/auth/login').send({
        usernameOrEmail: 'test',
        password: 'aasfasdfzxgbvsdfg',
      });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ field: 'password', message: 'Invalid password' });
    });
    it('should return 500', async () => {
      const response = await request(server).post('/auth/login').send({
        usernameOrEmail: 'test',
      });
      expect(response.status).toBe(500);
    });
  });
});
