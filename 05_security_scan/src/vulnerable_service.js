const express = require('express');
const _ = require('lodash');

const app = express();
app.use(express.json());

// In-memory storage for comments
let comments = [];

// Vulnerable: No input sanitization - XSS vulnerability
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  
  // Vulnerable: Direct insertion without validation or sanitization
  const newComment = {
    id: comments.length + 1,
    username: username,
    comment: comment,
    timestamp: new Date().toISOString()
  };
  
  comments.push(newComment);
  res.status(201).json({ message: 'Comment added successfully', id: newComment.id });
});

// Vulnerable: XSS in HTML response
app.get('/comments', (req, res) => {
  let html = `
    <html>
    <head><title>Comments</title></head>
    <body>
      <h1>User Comments</h1>
      <div id="comments">
  `;
  
  comments.forEach(comment => {
    // VULNERABLE: Direct HTML injection without escaping
    html += `
      <div class="comment">
        <strong>${comment.username}</strong> - ${comment.timestamp}
        <p>${comment.comment}</p>
      </div>
    `;
  });
  
  html += `
      </div>
      <form action="/comments" method="post">
        <input type="text" name="username" placeholder="Username" required>
        <textarea name="comment" placeholder="Your comment" required></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </body>
    </html>
  `;
  
  res.send(html);
});

// Vulnerable: Using lodash merge that's susceptible to prototype pollution
app.post('/user-preferences', (req, res) => {
  const defaultPrefs = {
    theme: 'light',
    notifications: true
  };
  
  // Vulnerable: Prototype pollution via merge
  const userPrefs = _.merge(defaultPrefs, req.body);
  
  res.json({ 
    message: 'Preferences updated',
    preferences: userPrefs 
  });
});

// Vulnerable: No proper error handling exposes stack traces
app.get('/admin/:action', (req, res) => {
  const action = req.params.action;
  
  if (action === 'clear-comments') {
    comments = [];
    res.json({ message: 'Comments cleared' });
  } else {
    // Vulnerable: Error exposes internal structure
    throw new Error(`Unknown admin action: ${action}`);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vulnerable service running on port ${PORT}`);
  console.log('⚠️  WARNING: This service contains intentional security vulnerabilities for educational purposes');
});

module.exports = app;