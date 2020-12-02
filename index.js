const express = require('express');
const bodyParser = require('body-parser');
const { registerProduct } = require('./services/product.service');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', registerProduct, (res, req) => {
  req.json(res.data);
});

const errorMiddleware = (err, _res, req, _next) => {
  const { status, ...data } = err;
  req.status(status || 500).json(data);
};

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Estou on'); });
