const express = require('express');
const bodyParser = require('body-parser');
// const { Router } = require('express');
// const productRegister = require('./models/products');
const productController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

//app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('O Patrão ficou maluco!'));
