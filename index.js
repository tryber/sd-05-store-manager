const express = require('express');
const bodyparse = require('body-parser');
const app = express();
app.use(bodyparse.json());

app.listen(3000, console.log('O funcionário ficou maluco'));

app.post('/products', products.js, async (req, res, _next) => {
  createProduct()
  res.status(200).json{}
})


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
