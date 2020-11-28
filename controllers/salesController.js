// const boom = require('boom');
// const rescue = require('express-rescue');
const service = require('../services/saleServices');
// const model = require('../models/productsModel');

const getAll = async (req, res) => { // rescue(
  try {
    const sales = await service.getAll();

    res.status(200).json({ sales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Algo deu ruim no getAll sales' });
  }
}; // )

const getById = async (req, res) => { // rescue(
  const { id } = req.params;
  try {
    const sale = await service.getById(id);

    res.status(200).json(sale);
  } catch (err) {
    // console.log(err);
    if (err.code === 'not_found') {
      return res.status(404).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err);
    res.status(500).json({ message: 'Algo deu errado no sales getId' });
  }
}; // )

const create = async (req, res) => { // rescue(
  const { itensSold } = req.body; // ?
  try {
    const createdSale = await service.create(itensSold);
    // console.log(createdProduct);
    res.status(200).json(createdSale);
  } catch (err) {
    // console.log(err);
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no create sale' });
  }
}; // )

const update = async (req, res) => { // rescue(
  const { id } = req.params;
  const { productId, quantity } = req.body; // ?[0]
  try {
    const updatedSale = await service.update(id, productId, quantity);
    res.status(200).json(updatedSale); // não seria 204?
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no update' });
  }
}; // )

const remove = async (req, res) => { // rescue(
  const { id } = req.params;
  try {
    const removed = await service.exclude(id);
    res.status(200).json(removed);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    // console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no REMOVE' });
  }
}; // )

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
