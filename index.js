const express = require('express');
// const rescue = require('express-rescue');
const bodyParser = require('body-parser');

// const songModel = require('./models/songModel');
const productController = require('./controllers/productController');

// const pingController = require('./controllers/pingController');

// const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// app.get('/ping', pingController.ping);

app.get('/products', productController.getAll);

app.post('/products', productController.create);

// app.put('/songs/:id', songController.update);

app.get('/products/:id', productController.getById);

// app.delete('/songs/:id', songController.remove);

// app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`o pai tá ON na: ${PORT}`);
});
