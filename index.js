const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController);

app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Knocking, knocking, knocking on ${PORT}'s door...`);
});
