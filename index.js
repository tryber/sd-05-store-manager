const express = require('express');

const bodyParser = require('body-parser');
const { productList } = require('./services/verifyProduct');
const { saleList } = require('./services/verifySales');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// --------------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// --------------------------------------------------------------------------------------

// REQUISITO 1 - Crie um endpoint para o cadastro de produtos
app.post('/products', productList, productsController.register);
// REQUISITO 2 - Crie um endpoint para listar os produtos
app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.productsById);
// REQUISITO 3 - Crie um endpoint para atualizar um produto
app.put('/products/:id', productList, productsController.updateProduct);
// REQUISTO 4 -  Crie um endpoint para deletar um produto
app.delete('/products/:id', productsController.deleteProductById);
// REQUISITO 5 - Crie um endpoint para cadastrar vendas
app.post('/sales', saleList, salesController.registerOfSales);
// REQUISITO 6 - Crie um endpoint para listar as vendas
app.get('/sales', salesController.allSales);
app.get('/sales/:id', salesController.salesById);
// REQUISITO 7 - Crie um endpoint para atualizar uma venda
app.put('/sales/:id', saleList, salesController.updateSale);
// REQUISITO 8 - Crie um endpoint para deletar uma venda
app.delete('/sales/:id', salesController.deleteSale);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Funfando na porta ${PORT}, XABLAU!!!`);
});
