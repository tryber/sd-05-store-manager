const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productController);

app.use('/sales', salesController);

const PORT = 3000;

// app.use('/', (err, req, res, next) => {
//   if(err.code = 'stock_problem') {
//     return res.status(404).json({ err: { code: err.code, message: err.message } });
//   }
// })

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
