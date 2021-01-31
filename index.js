// ajuda do Felipe Turma 5 na resolução de promises

const express = require('express');
const bodyParser = require('body-parser');
const result = require('./controllers/ControllerFile');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const r = await result();
  res.status(200).json(r);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
