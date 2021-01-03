const express = require('express');
const bodyparser = require('body-parser');
const { pL } = require('./services/productValidation');
const db = require('./models/productsModels');
const pc = require('./controllers/productsController');

const app = express();
const port = 3000;

app.use(bodyparser.json());

app.post('/products', pL, async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    await db.cadastro(name, quantity);
    const product = await db.nameSearch(name);
    res.status(201).json(product[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/products', pc.getAllProducts);
app.get('/products/:id', pc.productsById);
app.put('/products/:id', pL, pc.editProduct);
app.delete('/products/:id', pc.deleteProductById);

app.listen(port, () => {
  console.log('estamos online rapaziada!');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
