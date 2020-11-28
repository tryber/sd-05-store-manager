const services = require('../services/index');

const addProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await services.product.createProduct(name, quantity);
    console.log(product);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(422).json({ err });
  }
  return res.status(500).json({ message: 'Algo deu ruim no product Controller' });
};

module.exports = {
  addProduct,
};
