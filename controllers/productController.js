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

module.exports = { create };
