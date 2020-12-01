const Products = require('../services/Products.services');

const create = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  if (newProduct.error) {
    return res.status(422).json({ err: newProduct.error });
  }
  res.status(201).json(newProduct);
};

module.exports = { create };
