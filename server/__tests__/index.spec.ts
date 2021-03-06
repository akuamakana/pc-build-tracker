import { Server } from 'http';
import { createConnection, getConnection } from 'typeorm';
import app, { redisClient } from '../src/app';
const request = require('supertest');
const PORT = process.env.PORT;

describe('tracker server', () => {
  let server: Server;
  beforeAll(async () => {
    await createConnection();
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }
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

  describe('AUTH route', () => {
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

      it('should return 400 with no password', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          email: 'test2@gmail.com',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'password', message: 'Password is required' });
      });

      it('should return 400 with password less than 4 characters', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          email: 'test2@gmail.com',
          password: '123',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'password', message: 'Password must be at least 4 characters' });
      });

      it('should return 400 with no email', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          password: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Email is required' });
      });

      it('should return 400 with invalid email', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          password: 'test',
          email: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Invalid email' });
      });

      it('should return 400 with no username', async () => {
        const response = await request(server).post('/auth/register').send({
          email: 'test2@gmail.com',
          password: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username is required' });
      });

      it('should return 400 with username less than 4 characters', async () => {
        const response = await request(server).post('/auth/register').send({
          username: '123',
          email: 'test123@gmail.com',
          password: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username must be at least 4 characters long' });
      });

      it('should return 400 with "@" in username', async () => {
        const response = await request(server).post('/auth/register').send({
          username: '123@',
          email: 'test123@gmail.com',
          password: 'test',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username cannot contain @' });
      });

      it('should return 400 with duplicate email', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test2',
          password: 'test',
          email: 'test@gmail.com',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'email', message: 'Email is already in use.' });
      });

      it('should return 400 with duplicate username', async () => {
        const response = await request(server).post('/auth/register').send({
          username: 'test',
          password: 'test',
          email: 'test2@gmail.com',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ field: 'username', message: 'Username is already taken.' });
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

    describe('POST /auth/logout', () => {
      it('should return 200', async () => {
        const response = await request(server).post('/auth/logout');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
      });
    });
  });
});
