const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const service = require('../services/productService');

const getAllProducts = rescue(async (_req, res) => {
//  const products = await productsModel.getAllProducts();
  const products = await service.getAll();
  res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  // const product = await productsModel.getByProductId(id);
  const product = await service.getById(id);

  if (!product) throw boom.notFound(`Product with id ${id} was not found`);

  res.status(200).json(product);
});

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  // const createdProduct = await productsModel.createProduct({ name, quantity });
  const createdProduct = await service.createProduct({ name, quantity });
  if (createProduct.code) return res.status(422).json({ err: createProduct });
  return res.status(201).json(createdProduct);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await service.update({ id, name, quantity });

  res.status(204).end();
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;

  //  await productsModel.deleteProduct(id);
  await service.deleteId(id);

  res.status(204).end();
});

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
