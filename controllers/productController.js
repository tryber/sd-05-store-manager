const productService = require('../services/productServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const newProduct = await productService.createProduct(name, quantity);
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Something went badly...' });
  }
};

const allProducts = async (_req, res) => {
  const productList = await productService.getAllProducts();

  try {
    res.status(200).json({ products: productList });
  } catch (err) {
    res.status(500).json({ message: 'Something went badly...' });
  }
};

const productById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const editProduct = await productService.updateProduct(id, name, quantity);

  try {
    if (!name) {
      throw {
        code: 'invalid_data',
        message: '"name" should exist',
      };
    }
    if (name.length <= 5) {
      throw {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      };
    }
    if (quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      };
    }
    if (!quantity || typeof quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      };
    }
    res.status(200).json(editProduct);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    await productService.deleteProduct(id);
    return res.status(200).json(product);
  } catch (err) {
    res.status(422).json({ err: { code: err.code, message: err.message } });
  }
};

module.exports = { create, allProducts, productById, update, remove };
