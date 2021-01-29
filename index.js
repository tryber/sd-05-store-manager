const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productController);

app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
