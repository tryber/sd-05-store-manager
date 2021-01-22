const boom = require('boom');
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./controller/productController');
const salesRouter = require('./controller/salesController');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// ------------------------------------------------------

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use((err, req, res, _next) => {
  if (boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  console.error(err);

  res.status(500).json({
    message: 'Algo deu errado',
    details: err.message,
    endpoint: `${req.method} ${req.path}`,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Bora fechar esse projeto');
});
