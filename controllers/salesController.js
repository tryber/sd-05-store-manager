const salesService = require('../services/salesServices');

const create = async (req, res) => {
  const itensSold = req.body;

  try {
    const newItemSold = await salesService.createSales(itensSold);
    res.status(200).json(newItemSold);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }

    res.status(500).json({ message: 'Algo deu ruim no create sale' });
  }
};

module.exports = { create };
