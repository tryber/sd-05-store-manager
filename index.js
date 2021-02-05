// bodyparser é tradução das requisições para algo que consegue ler
const express = require('express');
const bodyParser = require('body-parser');
const produtosControll = require('./controllers/produtosControll');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', produtosControll);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bora abrir a loja? ${PORT}`);
});
