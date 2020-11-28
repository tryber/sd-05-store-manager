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

module.exports = {
  addProduct,
};
