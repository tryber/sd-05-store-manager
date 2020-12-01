const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsController = require('./controllers/productsControllers');

app.use(bodyParser.json());
// const rescue = require('express-rescue');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'algo deu errado' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
