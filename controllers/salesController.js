const sm = require('../models/salesModel');

const cadastroDeVendas = async (req, res, _next) => {
  try {
    const list = req.body;
    await sm.cadastro(list);
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

module.exports = { cadastroDeVendas, allSales, salesById, updateSale };
