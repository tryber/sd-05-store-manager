const express = require('express');
const bodyparser = require('body-parser');
const { pL } = require('./services/productValidation');
const db = require('./models/productsModels');

const app = express();
const port = 3000;

app.use(bodyparser.json());

app.post('/products', pL, async (req, res, _next) => {
  const { name, quantity } = req.body;
  await db.cadastro(name, quantity);
  res.status(201).json({ name, quantity });
});

app.listen(port, () => {
  console.log('estamos online rapaziada!');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
