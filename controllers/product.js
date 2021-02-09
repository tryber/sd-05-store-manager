const service = require('../services/product');

const getAll = async (req, res) => {
  try {
    const products = await service.getAll();

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error Code - GetAll' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await service.getById(id);

    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    res.status(500).json({ message: 'Error Code - GetById' });
  }
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const createdProduct = await service.create(name, quantity);

    res.status(201).json(createdProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err.message);
    res.status(500).json({ message: 'Error Code - Create' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await service.update(id, name, quantity);
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Error Code - Update' });
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

    res.status(500).json({ message: 'Error Code - Remove' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
