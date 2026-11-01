const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/about', (req, res) => {
  res.send('Hello, About!');
});

app.get('/contact', (req, res) => {
  res.send('Hello, Contact!');
});

app.get('/forum', (req, res) => {
  res.send('Hello, Forum!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});