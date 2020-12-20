const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controllers/index');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ouvindo
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`tá rolando na porta ${PORT}`);
});
