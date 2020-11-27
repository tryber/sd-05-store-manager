const express = require('express');
const bodyParser = require('body-parser');
const { productController, saleController } = require('./controllers/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_, res) => { res.send(); });

app.use('/products', productController);

app.use('/sales', saleController);

app.listen(port, () => console.log(`port: ${port}`));
