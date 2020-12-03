const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./controllers/products.controller');
const salesRouter = require('./controllers/sales.controller');

const app = express();

app.use(bodyParser.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const errorMiddleware = (err, _res, req, _next) => {
  const { status, ...body } = err;
  req.status(status || 500).json({ err: body });
};

app.use(errorMiddleware);

app.listen(3000, () => { console.log('Estou on'); });
