const express = require('express');
const bodyparser = require('body-parser');

const productController = require('./controllers/productController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/products', productController.create);

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));
