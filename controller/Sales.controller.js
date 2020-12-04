const SalesServices = require('../services/Sales.services');
const { error } = require('../enumerators/Sales.enums');

const getSales = async (req, res, _next) => {
  const { id } = req.params;
  const sales = await SalesServices.getSales(id);
  let resCode = 200;
  if (sales.err && sales.err.code === error.isInvalid.err.code) {
    resCode = 422;
  }
  if (sales.err && sales.err.code === error.notFound.err.code) {
    resCode = 404;
  }
  res.status(resCode).send(sales);
};

const createSale = async (req, res, _next) => {
  const newSale = await SalesServices.createSale(req.body);
  let resCode = 200;
  if (newSale.err) {
    resCode = 422;
  }
  res.status(resCode).json(newSale);
};

const updateSale = async (req, res, _next) => {
  const { id } = req.params;
  const itensSold = req.body;
  const updatedSale = await SalesServices.updateSale(id, itensSold);
  if (updatedSale.err) {
    res.status(422).send(updatedSale);
  }
  res.status(200).send(updatedSale);
};

module.exports = {
  getSales,
  createSale,
  updateSale,
};
