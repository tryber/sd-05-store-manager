const express = require('express');
const bodyParser = require('body-parser');
// const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, console.log(`Bora abrir a loja? ${PORT}`));
