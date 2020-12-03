const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', productController);

app.use('/products/:id', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
