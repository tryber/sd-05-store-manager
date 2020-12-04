const express = require('express');
const bodyparser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 'products' collection endpoints
app.post('/products', productController.create);
app.get('/products', productController.allProducts);
app.get('/products/:id', productController.productById);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

// 'sales' collection endpoints
app.post('/sales', salesController.create);
app.get('/sales', salesController.allSales);
app.get('/sales/:id', salesController.salesById);

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
