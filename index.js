const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./Controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ----------------------------------------------

app.use('/products', productsController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});
