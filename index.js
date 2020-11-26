const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/storeController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', controller.create);

app.listen(PORT, () => {
  console.log(`Estou ouvindo a porta ${PORT}`);
});
