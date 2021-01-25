const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');

// REQUISITO 5 - Crie um endpoint para cadastrar vendas
const registerOfSales = async (req, res, _next) => {
  try {
    const list = req.body;
    const { quantity, productId } = req.body[0];
    await salesModels.register(list);
    await productsModels.saleQuantity(productId, quantity);
    const allSales = await salesModels.getAllSales();
    res.status(200).json(allSales[allSales.length - 1]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// REQUISITO 6 - Crie um endpoint para listar as vendas
const allSales = async (_req, res, _next) => {
  try {
    const sales = await salesModels.getAllSales();
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const salesById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const searchSalesById = await salesModels.searchSaleById(id);
    if (searchSalesById === null) {
      res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
    res.status(200).json(searchSalesById);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// REQUISITO 7 - Crie um endpoint para atualizar uma venda
const updateSale = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const list = req.body;
    await salesModels.updateSale(id, list);
    const saleUpdate = await salesModels.searchSaleById(id);
    res.status(200).json(saleUpdate);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// REQUISITO 8 - Crie um endpoint para deletar uma venda
const deleteSale = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const saleById = await salesModels.searchSaleById(id);
    const saleDeleted = await salesModels.deleteSale(id);
    if (saleDeleted === null) {
      res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
    }
    // REQUISITO 9 - Atualize a quantidade de produtos
    if (saleById !== null) {
      await productsModels
        .saleQuantityDelete(saleById
          .itensSold[0].productId,
        saleById.itensSold[0]
          .quantity);
    }
    res.status(200).json(saleDeleted);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = { registerOfSales, allSales, salesById, updateSale, deleteSale };
