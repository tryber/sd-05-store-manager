const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/error');
const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
