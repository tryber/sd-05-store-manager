// DEPENDENCIAS
const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');
require('dotenv').config();

// IMPORTACOES
const app = express();

app.use(bodyParser.json());

const prodController = require('./controllers/productsController');

// ENDPOINTS
// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', prodController);
// Todos paths dos endpoints escritos no productsController vão começar com /products
// app.use('/sales', require('./controllers/salesController'));

// PORT LISTENER
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => console.log(`Sweet dreams are made of ${PORT} port (and baguettes!)`));
