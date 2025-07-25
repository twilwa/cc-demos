const request = require('supertest');
const app = require('../src/vulnerable_service');

describe('Security Tests', () => {
  
  describe('XSS Vulnerability Tests', () => {
    test('should prevent script injection in comments', async () => {
      // Attempt XSS injection
      const maliciousComment = '<script>alert("XSS")</script>';
      
      await request(app)
        .post('/comments')
        .send({
          username: 'hacker',
          comment: maliciousComment
        })
        .expect(201);
      
      const response = await request(app)
        .get('/comments')
        .expect(200);
      
      // This test will FAIL initially because the service is vulnerable
      // After fixing, the script tags should be escaped
      expect(response.text).not.toContain('<script>alert("XSS")</script>');
      expect(response.text).toContain('&lt;script&gt;'); // Should be escaped
    });
    
    test('should prevent HTML injection in usernames', async () => {
      const maliciousUsername = '<img src=x onerror="alert(1)">';
      
      await request(app)
        .post('/comments')
        .send({
          username: maliciousUsername,
          comment: 'innocent comment'
        })
        .expect(201);
      
      const response = await request(app)
        .get('/comments')
        .expect(200);
      
      // Should not contain raw HTML tags
      expect(response.text).not.toContain('<img src=x');
      expect(response.text).toContain('&lt;img'); // Should be escaped
    });
  });
  
  describe('Prototype Pollution Tests', () => {
    test('should prevent prototype pollution via merge', async () => {
      const pollutionPayload = {
        "__proto__": {
          "isAdmin": true
        }
      };
      
      await request(app)
        .post('/user-preferences')
        .send(pollutionPayload)
        .expect(200);
      
      // Check if prototype was polluted
      const testObj = {};
      expect(testObj.isAdmin).toBeUndefined();
    });
  });
  
  describe('Error Handling Tests', () => {
    test('should not expose stack traces in production', async () => {
      const response = await request(app)
        .get('/admin/invalid-action')
        .expect(500);
      
      // Should not expose internal paths or stack traces
      expect(response.text).not.toContain('Error:');
      expect(response.text).not.toContain('at ');
      expect(response.text).not.toContain(__dirname);
    });
  });
  
  describe('Input Validation Tests', () => {
    test('should validate comment length', async () => {
      const veryLongComment = 'x'.repeat(10000);
      
      const response = await request(app)
        .post('/comments')
        .send({
          username: 'user',
          comment: veryLongComment
        });
      
      // Should reject overly long comments
      expect(response.status).toBe(400);
    });
    
    test('should require username and comment', async () => {
      const response = await request(app)
        .post('/comments')
        .send({
          comment: 'missing username'
        });
      
      expect(response.status).toBe(400);
    });
  });
  
  describe('Security Headers Tests', () => {
    test('should include security headers', async () => {
      const response = await request(app)
        .get('/comments')
        .expect(200);
      
      // Should include security headers
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['content-security-policy']).toBeDefined();
    });
  });
  
});