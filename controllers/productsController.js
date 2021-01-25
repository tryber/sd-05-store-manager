const productsModels = require('../models/productsModels');

// REQUISITO 1 - Crie um endpoint para o cadastro de produtos
const register = async (req, res, _next) => {
  try {
    const { name, quantity } = req.body;
    await productsModels.register(name, quantity);
    const product = await productsModels.nameSearch(name);
    res.status(201).json(product[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// REQUISITO 2 - Crie um endpoint para listar os produtos
const getAllProducts = async (_req, res, _next) => {
  const products = await productsModels.getAll();
  res.status(200).json({ products });
};
const productsById = async (req, res, _next) => {
  const { id } = req.params;
  const productById = await productsModels.idSearch(id);
  if (productById === null) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  } else {
    res.status(200).json(productById);
  }
};

// REQUISITO 3 - Crie um endpoint para atualizar um produto
const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsModels.updateProduct(name, quantity, id);
  const product = await productsModels.idSearch(id);
  res.status(200).json(product);
};

// REQUISTO 4 -  Crie um endpoint para deletar um produto
const deleteProductById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await productsModels.deleteProducts(id);
  if (product === null) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

module.exports = {
  register,
  getAllProducts,
  productsById,
  updateProduct,
  deleteProductById,
};
