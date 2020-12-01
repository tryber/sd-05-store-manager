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
app.post('/products', productsController.addProduct);

app.use((err, _req, res, _next) => {
  // if (err) {
  //   return res.status(err).json(
  //     { err: {
  //       code: 'err.code',
  //       message: 'err.message',
  //     },
  //     },
  //   );
  // }
  res.status(500).json({ message: `algo deu errado ${err.message}` });
});

// app.use('*', (_req, res) => res.send('nao achei'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
