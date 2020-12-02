const express = require('express');
const bodyParser = require('body-parser');
const {
  registerProduct,
  listProduct,
} = require('./services/product.service');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', listProduct, (req, res) => {
  res.status(200).json(req.data);
});

app.get('/products/:id', listProduct, (req, res) => {
  res.status(200).json(req.data);
});

app.post('/products', registerProduct, (req, res) => {
  res.status(201).json(req.data);
});

const errorMiddleware = (err, _res, req, _next) => {
  const { status, ...body } = err;
  req.status(status || 500).json({ err: body });
};

app.use(errorMiddleware);

app.listen(3000, () => { console.log('Estou on'); });
