const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);

const PORT = 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
