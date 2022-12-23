const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();


app.use(bodyParser.json());


const JWT_SECRET = 'your-admin-secret-key';


const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.user = decoded;
  next();
});


const groceries = [];


app.post('/groceries', verifyToken, (req, res) => {
  const { name, price } = req.body;

  groceries.push({ name, price });
  res.json({ message: 'Grocery item added' });
});

app.get('/groceries', verifyToken, (req, res) => {
  res.json({ groceries });
});

app.put('/groceries/:name', verifyToken, (req, res) => {
  const { name } = req.params;
  const { price } = req.body;

  const index = groceries.findIndex((item) => item.name === name);

  if (index >= 0) {
    groceries[index].price = price;
    res.json({ message: 'Grocery item updated' });
  } else {
    res.status(404).json({ message: 'Grocery item not found' });
  }
});

app.delete('/groceries/:name', verifyToken, (req, res) => {
  const { name } = req.params;

  const index = groceries.findIndex((item) => item.name === name);

  if (index >= 0) {
    groceries.splice(index, 1);
    res.json({ message: 'Grocery item deleted' });
  } else {
    res.status(404).json({ message: 'Grocery item not found' });
  }
});


app.listen(3004, () => {
  console.log('Listening on port 3004');
});
