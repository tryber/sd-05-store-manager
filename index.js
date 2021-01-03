const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);

app.use('/sales', salesController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
