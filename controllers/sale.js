const service = require('../services/sale');
const model = require('../models/sales');

const getAll = async (req, res) => {
  try {
    const sales = await model.getAllSales();
    res.status(200).json({ sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error Code - sales getAll' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await service.getById(id);
    res.status(200).json(sale);
  } catch (err) {
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Error Code - sales getById' });
  }
};

const create = async (req, res) => {
  const itensSold = req.body;
  try {
    const createdSale = await service.create(itensSold);

    res.status(200).json(createdSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Error Code - sales Create' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  try {
    const updatedSale = await service.update(id, productId, quantity);
    res.status(200).json(updatedSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Error Code - sales Update' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await service.exclude(id);
    res.status(200).json(removed);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Error Code - sales delete' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
