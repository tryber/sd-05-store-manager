const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsController = require('./controllers/productsControllers');
const validateProduct = require('./middlewares/validateProduct');

app.use(bodyParser.json());
// const rescue = require('express-rescue');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', validateProduct, productsController.addProduct);
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.delete('/products/:id', productsController.deleteProduct);
app.put('/products/:id', validateProduct, productsController.updateProduct, productsController.getById);

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err) {
    return res.status(422).json(err);
  }
  res.status(500).json({ message: `algo deu errado ${err.message}` });
});

// app.use('*', (_req, res) => res.send('nao achei'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
