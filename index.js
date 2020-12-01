require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? './.env.testing' : './.envKyle',
});

const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controller/Products.controller');

const app = express();
app.use(bodyParser.json());

app.post('/products', Products.create);

// não remova esse endpoint, e para o avaliador funcionar
// Ok Jean, não vou remover esse endpoint...
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The Door is ${PORT}, who are you?`);
});
