const express = require('express');
const bodyParser = require('body-parser');
// const { Router } = require('express');
// const productRegister = require('./models/products');
const productController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.post('/products', productController.createProduct);
app.get('/products/:id', productController.getById);
app.get('/products', productController.getAllProducts);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

app.post('/sales', salesController.createSale);
app.get('/sales/:id', salesController.getById);
app.get('/sales', salesController.getAllSales);
app.put('/sales/:id', salesController.updateSale);
app.delete('/sales/:id', salesController.deleteSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('O Patrão ficou maluco!'));
