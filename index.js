const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./Controllers/productsController');

// const salesController = require('./Controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ----------------------------------------------

app.use('/products', productsController);

// app.use('/sales', salesController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});
