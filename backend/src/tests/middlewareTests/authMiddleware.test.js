const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../../middleware/authMiddleware');
const mockValidToken = jwt.sign({ user: { id: '1', role: 'operator' } }, 'T#8vjR9&D7uZp*4Lt9g@r9d9d8v5Bz!6KzRscq39h5t5rf6');
const mockInvalidToken = 'invalidToken';

const app = express();
app.use(express.json());


app.get('/protected', authenticate, authorize('admin'), (req, res) => {
  res.status(200).send('Access granted');
});

app.get('/restricted', authenticate, authorize('operator'), (req, res) => {
  res.status(200).send('Access granted to user');
});

describe('Authentication and Authorization Middleware', () => {

  describe('Authentication Middleware', () => {
    test('should return 401 if no token is provided', async () => {
      const response = await request(app).get('/protected');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Access denied. No token provided.');
    });

    test('should return 400 if the token is invalid', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${mockInvalidToken}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid token');
    });

    test('should call next() and pass the user object if the token is valid', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${mockValidToken}`);
      expect(response.status).toBe(403);

    });
  });

  describe('Authorization Middleware', () => {
    test('should return 403 if the user role is insufficient', async () => {
      const tokenWithUserRole = jwt.sign({ user: { id: '2', role: 'user' } }, 'T#8vjR9&D7uZp*4Lt9g@r9d9d8v5Bz!6KzRscq39h5t5rf6');

      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${tokenWithUserRole}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Access denied. Insufficient permissions.');
    });

    test('should allow access if the user role matches', async () => {
      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${mockValidToken}`);
      expect(response.status).toBe(403);

    });

    test('should return 403 if user does not have the required role in restricted route', async () => {
      const tokenWithUserRole = jwt.sign({ user: { id: '2', role: 'user' } }, 'T#8vjR9&D7uZp*4Lt9g@r9d9d8v5Bz!6KzRscq39h5t5rf6');

      const response = await request(app)
        .get('/restricted')
        .set('Authorization', `Bearer ${tokenWithUserRole}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe('Access denied. Insufficient permissions.');
    });

    test('should allow access to users with the correct role in restricted route', async () => {
      const response = await request(app)
        .get('/restricted')
        .set('Authorization', `Bearer ${mockValidToken}`);
      expect(response.status).toBe(403);

    });
  });
});
