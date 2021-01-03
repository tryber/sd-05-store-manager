const db = require('../models/productsModels');

const getAllProducts = async (_req, res, _next) => {
  const products = await db.getAll();
  res.status(200).json({ products });
};
const productsById = async (req, res, _next) => {
  const { id } = req.params;
  const productById = await db.idSearch(id);
  if (productById === null) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  } else {
    res.status(200).json(productById);
  }
};

const deleteProductById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await db.deleteProducts(id);
  if (product === null) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const editProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await db.editProduct(name, quantity, id);
  const product = await db.idSearch(id);
  res.status(200).json(product);
};

module.exports = { getAllProducts, productsById, editProduct, deleteProductById };
