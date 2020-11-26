const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_, res) => { res.send(); });

app.use('/products', productController);

app.listen(port, () => console.log(`port: ${port}`));
