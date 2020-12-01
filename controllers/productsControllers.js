const rescue = require('express-rescue');
const services = require('../services/productsServices');

const getAll = rescue(async (_req, res) => {
  const allProducts = await services.getAllProducts();

  res.status(200).json({ allProducts });
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await services.getByIdProducts(id);
  if (product.err) {
    return res.status(422).json({ err: product.err });
  }
  res.status(200).json(product);
});

module.exports = {
  getAll,
  getById,
};
