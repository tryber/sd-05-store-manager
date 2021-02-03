// ajuda do Felipe Turma 5 na resolução de promises

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { getProducts } = require('./services/ServiceFile');
const addProductValidation = require('./middlewares/addProductValidation');
const listProductsValidation = require('./middlewares/listProductsValidation');
const updateProductsValidation = require('./middlewares/updateProductsValidation');
const deleteProductsValidation = require('./middlewares/deleteProductsValidation');
const addSalesProducts = require('./middlewares/addSalesValidation');
const addSalesValidation = require('./middlewares/addSalesValidation');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const products = await getProducts('products');
  res.status(200).send({ products });
});

app.get('/products/:id', listProductsValidation);

app.post('/products', addProductValidation);

app.put('/products/:id', updateProductsValidation);

app.delete('/products/:id', deleteProductsValidation);

app.post('/sales', addSalesValidation);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
