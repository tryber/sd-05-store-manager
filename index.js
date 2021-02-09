const express = require('express');
const bodyParser = require('body-parser');

const quantityValidator = require('./middleware/quantityValidator');
const product = require('./controllers/product');
const sales = require('./controllers/sale');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', product.create);
app.get('/products', product.getAll);
app.get('/products/:id', product.getById);
app.put('/products/:id', product.update);
app.delete('/products/:id', product.remove);

app.post('/sales', quantityValidator, sales.create);
app.get('/sales', sales.getAll);
app.get('/sales/:id', sales.getById);
app.put('/sales/:id', sales.update);
app.delete('/sales/:id', sales.remove);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
