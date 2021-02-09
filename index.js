const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./controllers/products.controller');
const salesRouter = require('./controllers/sales.controller');

const app = express();

app.use(bodyParser.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

const errorMiddleware = (err, _res, req, _next) => {
  // error body format required: { err: { message: 'Error message', code: 'error_code' } }
  const { status, ...body } = err;
  req.status(status || 500).json({ err: body });
};

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Online on ${PORT}`));
