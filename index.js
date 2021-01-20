const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());

app.use('/products', controllers.products);
app.use('/sales', controllers.sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
const listeningMsg = ['FINGS', 'TINGS'];
app.listen(PORT, console.log(`${listeningMsg[Math.round(Math.random())]}' listening on :${PORT}`));
