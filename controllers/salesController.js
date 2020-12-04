const salesService = require('../services/salesServices');

const create = async (req, res) => {
  const itensSold = req.body;

  try {
    const newItemSold = await salesService.createSales(itensSold);
    res.status(200).json(newItemSold);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Something went badly...' });
  }
};

const allSales = async (_req, res) => {
  try {
    const salesList = await salesService.getAllSales();
    res.status(200).json({ sales: salesList });
  } catch (err) {
    res.status(500).json({ message: 'Something went badly...' });
  }
};

const salesById = async (req, res) => {
  const { id } = req.params;

  try {
    const itemSold = await salesService.getSalesById(id);
    res.status(200).json(itemSold);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
    res.status(500).json({ message: 'Something went badly...' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const { productId, quantity } = itensSold[0];

    await salesService.validateSales(quantity);
    await salesService.validateProduct(productId);
    await salesService.getSalesById(id);

    const editSale = await salesService.updateSales(id, itensSold);
    res.status(200).json(editSale);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteItem = await salesService.deleteSales(id);
    res.status(200).json(deleteItem);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

module.exports = { create, allSales, salesById, update, remove };
