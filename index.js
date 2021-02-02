// ajuda do Felipe Turma 5 na resolução de promises

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const listProductsOutput = require('./controllers/ControllerFile');
const addProductValidation = require('./middlewares/addProductValidation');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const response = await listProductsOutput('products');
  res.status(200).json(response);
});

app.post('/products', addProductValidation);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
