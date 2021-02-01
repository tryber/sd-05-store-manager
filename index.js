// ajuda do Felipe Turma 5 na resolução de promises

const express = require('express');
const bodyParser = require('body-parser');
const { output, addProductOutput } = require('./controllers/ControllerFile');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', async (req, res) => {
  console.log(req.body);
  const { name, quantity } = req.body;
  const response = await addProductOutput(name, quantity);
  res.status(200).json(response);
});

app.get('/products', async (_req, res) => {
  const response = await output();
  res.status(200).json(response);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
