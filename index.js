// Ordem de criação
// Rest pessoa um recurso - 1 controller para cada recurso
// 1 - index.js - ENDPOINT - app.use('/people')
// 2 - controllers/peopleontroller - people.get('/people') - chamar o service
// 3 - model - getCollection - getAll, getById
// 4 - services - chamar o model
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

const controllerProduct = require('./controllers/productController');
const controllerSales = require('./controllers/salesController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1.1 - O endpoint deve ser acessível através do caminho (/products);
app.use('/products', controllerProduct);

// 5 - Crie um endpoint para cadastrar vendas
app.use('/sales', controllerSales);

const PORT = 3000;
app.listen(PORT, () => console.log(`Starting over ${PORT} times`));
