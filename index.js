const express = require('express');

const bodyParse = require('body-parser');

const controllerProduct = require('./controllers/products');

const controllerSales = require('./controllers/sales');

const app = express();

app.use(bodyParse.json());

/*
app.post('/', async (req, resp) => {
  console.log(req.body);
  await modelProduct.pushProduct(req.body.name, req.body.quantity);
  resp.status(201).json({ message: 'ok' });
}); */

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllerProduct);

app.use('/sales', controllerSales);

app.listen(3000, () => console.log('Lisen on 3000 ....'));
