const SalesServices = require('../services/Sales.services');

const getSales = async (req, res, _net) => {
  const { id } = req.params;
  const sales = await SalesServices.getSales(id);
  let resCode = 200;
  if (sales.err) {
    resCode = 422;
  }
  res.status(resCode).send(sales);
};

const createSale = async (req, res, _next) => {
  const newSale = await SalesServices.createSale(req.body);
  let resCode;
  if (newSale.err) {
    resCode = 422;
    return res.status(422).send(newSale);
  }
  res.status(resCode || 200).json(newSale);
};

module.exports = {
  getSales,
  createSale,
};
