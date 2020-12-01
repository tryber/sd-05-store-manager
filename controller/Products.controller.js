const Products = require('../services/Products.services');

const create = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  if (newProduct.error) {
    return res.status(422).json({ err: newProduct.error });
  }
  res.status(201).json(newProduct);
};

const getProductsById = async (req, res, _next) => {
  const { id } = req.params;
  const products = await Products.getAllProducts(id);
  if (products.error) {
    return res.status(422).send({ err: products.error });
  }
  res.status(200).send(products);
};

const updateProduct = async (req, res, _next) => {
  console.log('to aqui');

  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await Products.updateProduct(id, name, quantity);
  if (updatedProduct.error) {
    return res.status(422).send({ err: updatedProduct.error });
  }
  res.status(200).send(updatedProduct);
};

module.exports = { create, getProductsById, updateProduct };
