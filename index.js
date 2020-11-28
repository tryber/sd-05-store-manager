const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', productController.create);

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.put('/products/:id', productController.update);

app.delete('/products/:id', productController.exclude);

app.post('/sales', salesController.create);

// app.get('/sales', salesController.getAll)

// app.get('/sales/:id', salesController.getById);

app.listen(PORT, () => {
  console.log(`Estou ouvindo a porta ${PORT}`);
});
