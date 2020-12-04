const express = require('express');

const bodyParse = require('body-parser');

const modelProduct = require('./models/products');

const controllerProduct = require('./controllers/products');

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

app.listen(3000, () => console.log('Lisen on 3000 ....'));
