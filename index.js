const express = require('express');
const bodyparse = require('body-parser');
const productsRouter = require('./controllers/products');
const salesRouter = require('./controllers/sales');

const app = express();
app.use(bodyparse.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, console.log('O patrão ficou maluco'));
