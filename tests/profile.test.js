const request = require('supertest');
const app = require('../src/config/app');

describe('Profile API', () => {
  it('should return profile data with cat fact', async () => {
    const response = await request(app)
      .get('/api/me')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).toHaveProperty('name');
    expect(response.body.user).toHaveProperty('stack');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('fact');
  });
});