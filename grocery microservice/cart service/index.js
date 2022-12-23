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


const cart = [];


app.post('/cart', verifyToken, (req, res) => {
  const { item } = req.body;
  cart.push(item);
  res.json({ message: 'Item added to cart' });
});
carts[req.user.username].push({ item, price });
  res.json({ message: 'Item added to cart' });
});

app.get('/cart', verifyToken, (req, res) => {
  
  res.json({ items: carts[req.user.username] });
});


app.listen(3001, () => {
  console.log('Listening on port 3001');
});

