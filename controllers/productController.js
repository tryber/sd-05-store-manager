const productService = require('../services/productServices');

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await productService.isValid(name, quantity);
    const saida = await productService.create(name, quantity);
    res.status(201).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const getAll = async (req, res) => {
  const saida = await productService.getAll();
  res.status(200).json(saida);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await productService.getById(id);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await productService.isValid(name, quantity);
    const saida = await productService.update(id, name, quantity);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await productService.getById(id);
    await productService.exclude(id);
    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

module.exports = {
  create,
  exclude,
  getAll,
  getById,
  update,
};
