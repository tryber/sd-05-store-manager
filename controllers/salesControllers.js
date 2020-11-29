const services = require('../services/index');

const getAll = async (_req, res) => {
  const sales = await services.sales.getSales();
  return res.status(200).json(sales);
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await services.sales.showSale(id);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).json({ err });
  }
};

const createSell = async (req, res) => {
  try {
    const sales = req.body;
    const finalSale = await services.sales.sell(sales);
    return res.status(200).json(finalSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err });
    }
    res.status(500).json({ message: 'Algo deu ruim no sales Controller' });
  }
};

module.exports = {
  getAll,
  getOne,
  createSell,
};
