// bodyparser é tradução das requisições para algo que consegue ler
const express = require('express');
const bodyParser = require('body-parser');
// const middlewares = require('./middlewares');
const produtosControll = require('./controllers/produtosControll');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', produtosControll);

const PORT = 3000;
app.listen(PORT, console.log(`Bora abrir a loja? ${PORT}`));
