const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
  res.send('Hello from Node.js app behind Nginx (port 8082)!');
});

app.listen(PORT, HOST, () => {
  console.log(`Node app running on ${HOST}:${PORT}`);
});
