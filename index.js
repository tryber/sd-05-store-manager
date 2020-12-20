const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./controllers/index');

const app = express();

app.use(bodyParser.json());
app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ouvindo
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Tá rolando na porta ${PORT}`);
});
