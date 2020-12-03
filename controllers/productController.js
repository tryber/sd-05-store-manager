const productService = require('../services/productServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.createProductAuth(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Something went badly...' });
  }
};

const allProducts = async (_req, res) => {
  const productList = await productService.getAllProductsAuth();

  try {
    res.status(200).json(productList);
  } catch (err) {
    res.status(500).json({ message: 'Something went badly...' });
  }
};

const productById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const editProduct = await productService.updateProductAuth(id, name, quantity);

  try {
    await productService.getAllProductsAuth(name, quantity);
    res.status(200).json(editProduct);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductByIdAuth(id);

  try {
    await productService.deleteProductAuth(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

module.exports = { create, allProducts, productById, update, remove };
