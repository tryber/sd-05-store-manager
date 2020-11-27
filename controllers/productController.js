const service = require('../services/storeServices');

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await service.isValid(name, quantity);
    const saida = await service.create(name, quantity);
    res.status(201).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const getAll = async (req, res) => {
  const saida = await service.getAll();
  res.status(200).json(saida);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await service.getById(id);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await service.isValid(name, quantity);
    const saida = await service.update(id, name, quantity);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await service.getById(id);
    await service.exclude(id);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
