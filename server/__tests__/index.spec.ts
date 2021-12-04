import { app } from '../src/index';
const request = require('supertest');

// hello from the server side from index route
describe('Test example', () => {
  let server: any;

  beforeAll(async () => {
    server = await app(5678);
  });

  afterAll(() => {
    server.close();
  });

  it('GET /', async () => {
    return request(server).get('/').expect(200).expect({ message: 'Hello from the server side' });
  });
});
