const rescue = require('express-rescue');
const service = require('../services/productService');

const getAllProducts = rescue(async (_req, res) => {
//  const products = await productsModel.getAllProducts();
  const products = await service.getAll();
  return res.status(200).json({ products });
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  // const product = await productsModel.getByProductId(id);
  const product = await service.getById(id);
  if (product.code) return res.status(422).json({ err: product });

  res.status(200).json(product);
});

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  // const product = await productsModel.createProduct({ name, quantity });
  const product = await service.createProduct({ name, quantity });
  if (product.code) return res.status(422).json({ err: product });
  return res.status(201).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await service.update({ id, name, quantity });
  if (product.code) return res.status(422).json({ err: product });
  return res.status(200).json({ id, name, quantity });
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await service.deleteId(id);
  if (product.code) return res.status(422).json({ err: product });

  return res.status(200).json(product);
});

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
