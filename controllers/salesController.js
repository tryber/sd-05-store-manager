const sm = require('../models/salesModel');
const pm = require('../models/productsModels');

const cadastroDeVendas = async (req, res, _next) => {
  try {
    const list = req.body;
    const { quantity, productId } = req.body[0];
    await sm.cadastro(list);
    await pm.saleQuantity(productId, quantity);
    const allSales = await sm.getAllSales();
    res.status(200).json(allSales[allSales.length - 1]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const allSales = async (_req, res, _next) => {
  try {
    const sales = await sm.getAllSales();
    res.status(200).json({ sales });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const salesById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const searchSalesById = await sm.searchSaleById(id);
    if (searchSalesById === null) {
      res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
    res.status(200).json(searchSalesById);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateSale = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const list = req.body;
    await sm.updateSale(id, list);
    const saleUpdate = await sm.searchSaleById(id);
    res.status(200).json(saleUpdate);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteSale = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const saleById = await sm.searchSaleById(id);
    const saleDeleted = await sm.deleteSale(id);
    if (saleDeleted === null) {
      res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
    }
    if (saleById !== null) {
      await pm.saleQuantityDelete(saleById.itensSold[0].productId, saleById.itensSold[0].quantity);
    }
    res.status(200).json(saleDeleted);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = { cadastroDeVendas, allSales, salesById, updateSale, deleteSale };
