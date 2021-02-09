const rescue = require('express-rescue');
const service = require('../services/salesService');

const getAllSales = rescue(async (_req, res) => {
  //  const Sales = await SalesModel.getAllSales();
  const sales = await service.getAll();
  return res.status(200).json({ sales });
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  // const sale = await SalesModel.getBysaleId(id);
  const sale = await service.getById(id);
  if (sale.code) return res.status(404).json({ err: sale });

  res.status(200).json(sale);
});

const createSale = rescue(async (req, res) => {
  const arr = req.body;
  // const sale = await SalesModel.createsale({ name, quantity });
  const sale = await service.createSales(arr);
  if (sale.code === 'stock_problem') return res.status(404).json({ err: sale });
  if (sale.code) return res.status(422).json({ err: sale });
  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const arr = req.body;
  const sale = await service.update(id, arr);
  if (sale.code) return res.status(422).json({ err: sale });
  return res.status(200).json(sale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await service.deleteId(id);
  if (sale.code) return res.status(422).json({ err: sale });

  return res.status(200).json(sale);
});

module.exports = {
  getAllSales,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
