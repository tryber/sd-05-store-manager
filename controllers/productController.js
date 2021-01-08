const { Router } = require('express');

// Router é agrupador de middlewares
const prodRouter = Router();

const productService = require('../services/productService');

/*  ********************************************************************************************* */
// 1 - Crie um endpoint para o cadastro de produtos
// POST /product/ -> Comportamento de create
prodRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const produtoCriado = await productService.create(name, quantity);
    if (!produtoCriado) return res.status(400).json({ message: 'Produto não foi criado' });
    return res.status(201).json(produtoCriado);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

/*  ********************************************************************************************* */
// 2 - Crie um endpoint para listar os produtos
// GET /product/ -> Comportamento de getAll
// O endpoint deve ser acessível através do caminho (/products) ou (/products/:id);
prodRouter.get('/', async (req, res) => {
  try {
    const products = await productService.getAll();
    // com status http 200
    res.status(200).json({ products });
  } catch (err) {
    // sem cenário de invalid_data neste caso
    res.status(500).json({ message: 'Internal error' });
  }
});

// Rotas que tem parametros devem vir depois de rotas que nao
// tem parametreos.
// GET /product/:id -> Comportamento de getById
prodRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    // com status http 200
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }

    console.error(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

/*  ********************************************************************************************* */
// 3 - Crie um endpoint para atualizar um produto
// PUT /products/:id/ -> Comportamento de update
// O endpoint deve ser acessível através do caminho (/products/:id);
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProd = await productService.updateById(id, name, quantity);
    res.status(200).json(updatedProd);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal error' });
  }
});

/*  ********************************************************************************************* */
// 4 - Crie um endpoint para deletar um produto
// DELETE /products/:id/ -> Comportamento de delete
// O endpoint deve ser acessível através do caminho (/products/:id);
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productService.deleteById(id);
    return res.status(200).json(deletedProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    console.error(err);
    res.status(500).json({ message: 'Internal error' });
  }
});

module.exports = prodRouter;
