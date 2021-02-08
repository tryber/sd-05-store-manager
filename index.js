// bodyparser é tradução das requisições para algo que consegue ler
const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productController);

app.use('/sales', saleController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Bora abrir a loja? ${PORT}`));
