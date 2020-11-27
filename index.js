const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productController);

app.listen(PORT, () => {
  console.log(`Estou ouvindo a porta ${PORT}`);
});
