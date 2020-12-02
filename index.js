const express = require('express');
const bodyParser = require('body-parser');
const validateProduct = require('./middlewares/validateProduct');
const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require('./controllers/productsControllers');

const app = express();
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', validateProduct, addProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getProductById);
app.delete('/products/:id', deleteProduct);
app.put('/products/:id', validateProduct, updateProduct, getProductById);

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err) {
    return res.status(422).json(err);
  }
  res.status(500).json({ message: `algo deu errado ${err.message}` });
});

const PORT = process.env.PORT || 3000;
// app.use('*', (_req, res) => res.send('nao achei'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
