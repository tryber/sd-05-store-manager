const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/index');
const model = require('./models/productModels');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(parser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', routes.product);

app.listen(PORT, () => {
  console.log(`O PAI TÁ ON NA PORTA ${PORT}`);
});
