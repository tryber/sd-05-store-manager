const sc = require('../models/salesModel');

const cadastroDeVendas = async (req, res, _next) => {
  try {
    const list = req.body;
    await sc.cadastro(list);
    const allSales = await sc.getAllSales();
    res.status(200).json(allSales[allSales.length - 1]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { cadastroDeVendas };
