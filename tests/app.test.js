import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';

const testUser = {
  first_name: 'Test',
  last_name: 'User',
  email: 'testuser@example.com',
  age: 25,
  password: '123456'
};

let jwtToken;

beforeAll(async () => {
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth and User API tests', () => {
  it('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/sessions/register')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.payload).toHaveProperty('_id');
  });

  it('Should login and return JWT token', async () => {
    const res = await request(app)
      .post('/api/sessions/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body).toHaveProperty('token');

    jwtToken = res.body.token;
  });

  it('Should access protected route /current with valid JWT', async () => {
    const res = await request(app)
      .get('/api/sessions/current')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.payload.email).toBe(testUser.email);
  });

  it('Should deny access to /current without JWT', async () => {
    const res = await request(app).get('/api/sessions/current');
    expect(res.statusCode).toBe(401);
  });
});
