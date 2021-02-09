const express = require('express');
const bodyParser = require('body-parser');
const { productsController, salesController } = require('./controller/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
