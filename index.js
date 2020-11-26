const express = require('express');

const product = require('./controllers/productController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', product);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
