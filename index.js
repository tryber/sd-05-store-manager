const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
