const model = require('../models/index')

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await model.add(name, quantity);
  return res.status(201).send(product);
}

module.exports = {
  addProduct,
}