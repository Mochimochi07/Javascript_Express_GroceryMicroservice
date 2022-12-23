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


app.get('/transactions', verifyToken, (req, res) => {
 
  const transactions = transactionLog.filter(
    (transaction) => transaction.username === req.user.username
  );
  res.json({ transactions });
});


app.listen(3002, () => {
  console.log('Listening on port 3002');
});
