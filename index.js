require('dotenv').config({ path: process.env.NODE_ENV === 'tst' ? '.envTst' : '.envLuca' });
const express = require('express');
const bodyParser = require('body-parser');
const { controllerProducts, controllerSales } = require('./controllers');

const app = express();

app.use(bodyParser.json());
app.use('/products', controllerProducts);
app.use('/sales', controllerSales);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Tô na escuta, porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
