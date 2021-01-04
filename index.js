const express = require('express');
const bodyparser = require('body-parser');
const { pL } = require('./services/productValidation');
const { sl } = require('./services/salesValidation');
const pc = require('./controllers/productsController');
const sc = require('./controllers/salesController');

const app = express();
const port = 3000;

app.use(bodyparser.json());

app.post('/products', pL, pc.cadastro);
app.get('/products', pc.getAllProducts);
app.get('/products/:id', pc.productsById);
app.put('/products/:id', pL, pc.editProduct);
app.delete('/products/:id', pc.deleteProductById);

app.post('/sales', sl, sc.cadastroDeVendas);
app.get('/sales', sc.allSales);
app.get('/sales/:id', sc.salesById);
app.put('/sales/:id', sl, sc.updateSale);

app.listen(port, () => {
  console.log('estamos online rapaziada!');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
