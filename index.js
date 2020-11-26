const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// 0 - Não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ENDPOINTS - nos controllers
app.use('/products', require('./controllers/productsController'));
// Todos paths dos endpoints escritos no productsController vão começar automaticamente com /products
app.use('/sales', require('./controllers/salesController'));

// PORT LISTENER
const PORT = 3000;
app.listen(PORT, () => console.log(`Sweet dreams are made of ${PORT} port (and baguettes!)`));
