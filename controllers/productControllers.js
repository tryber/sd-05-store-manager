const services = require('../services/index');

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await services.product.createProduct(name, quantity);
    return res.status(201).json(product);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu ruim no product Controller' });
  }
};

const getAllProducts = async (_req, res) => {
  const products = await services.product.showProducts();
  return res.status(200).json(products);
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await services.product.showProduct(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(422).json({ err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await services.product.updateById(name, quantity, id);
    return res.status(200).json({ _id: id, name, quantity });
  } catch (err) {
    return res.status(422).json({ err });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
};
