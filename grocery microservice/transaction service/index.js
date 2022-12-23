const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();


app.use(bodyParser.json());


const JWT_SECRET = 'your-secret-key';

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
};


const transactionLog = [];


app.post('/purchase', verifyToken, (req, res) => {
  const { items, totalPrice } = req.body;

  transactionLog.push({
    username: req.user.username,
    items,
    totalPrice,
    timestamp: new Date().toISOString(),
  });
  res.json({ message: 'Purchase successful', receipt: { items, totalPrice } });
});


app.listen(3001, () => {
  console.log('Listening on port 3001');
});
