const express = require('express');
const controllers = require('./controllers');

const PORT = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllers.products);
app.use('/sales', controllers.sales);

app.listen(PORT, () => console.log('Servidor operando'));
