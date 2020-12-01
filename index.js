const express = require('express');
const bodyParser = require('body-parser');
const products = require('./controllers/productsController');
const sales = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/products', products);
app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
