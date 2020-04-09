const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
}))

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle PWA manifest
  app.get('/manifest.json', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'manifest.json'));
  });

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));