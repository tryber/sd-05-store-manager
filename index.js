const express = require('express');

const registerProduct = require('./src/controllers/productController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', registerProduct);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`O pai tá na porta ${PORT}`);
});
