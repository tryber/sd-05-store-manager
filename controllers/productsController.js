const db = require('../models/productsModels');

const getAllProducts = async (_req, res, _next) => {
  const products = await db.getAll();
  res.status(200).json({ products });
};
const productsById = async (req, res, _next) => {
  const { id } = req.params;
  console.log(id);
  const productById = await db.idSearch(id);
  if (productById === null) {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  } else {
    res.status(200).json(productById);
  }
};

module.exports = { getAllProducts, productsById };
