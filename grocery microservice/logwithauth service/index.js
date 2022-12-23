const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();


app.use(bodyParser.json());


const JWT_SECRET = 'your-secret-key';

app.post('/login', (req, res) => {
  const { username, password } = req.body;


  if (username === 'user' && password === 'password') {
    // If the login is successful, create a JSON web token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
