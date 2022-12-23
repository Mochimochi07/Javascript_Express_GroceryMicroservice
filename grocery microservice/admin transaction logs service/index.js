const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


app.get('/transactions', (req, res) => {
  res.json({ transactionLog });
});


app.listen(3005, () => {
  console.log('Listening on port 3005');
});
