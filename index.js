const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const salesController = require('./controllers/sales.Controllers');

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// =======================================================

app.use('/products', productsController);

app.use('/sales', salesController);

app.listen(PORT, () => {
  console.log(`Todo mundo odeia o Chris na porta ${PORT}`);
});
