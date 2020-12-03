const express = require('express');
const bodyparser = require('body-parser');

const productController = require('./controllers/productController');

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

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
