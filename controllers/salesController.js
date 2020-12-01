const salesServices = require('../services/salesServices');

const create = async (req, res) => {
  try {
    const arrayFromBody = req.body;
    const promises = [];
    arrayFromBody.forEach(({ productId, quantity }) => {
      promises.push(salesServices.quantIsValid(quantity));
      promises.push(salesServices.productIdIsValid(productId));
    });

    await Promise.all(promises);

    const saida = await salesServices.create(arrayFromBody);

    const productsFinalStock = await salesServices.checkStock(arrayFromBody);
    await salesServices.fixProductsQuantitiyAfterSale(null, arrayFromBody, productsFinalStock);
    // referente ao desafio 9, 10

    res.status(200).json(saida);
  } catch (err) {
    if (err.err.code === 'stock_problem') {
      return res.status(404).json(err);
    }
    res.status(422).json(err);
  }
};

const getAll = async (req, res) => {
  const saida = await salesServices.getAll();
  res.status(200).json(saida);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await salesServices.getById(id);
    res.status(200).json(saida);
  } catch (err) {
    res.status(404).json(err);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const arrayFromBody = req.body;
    const { productId, quantity } = arrayFromBody[0];
    await salesServices.quantIsValid(quantity);
    await salesServices.productIdIsValid(productId);
    await salesServices.getById(id);
    const saida = await salesServices.update(id, arrayFromBody);

    const productsFinalStock = await salesServices.checkStock(arrayFromBody);
    await salesServices.fixProductsQuantitiyAfterSale(id, arrayFromBody, productsFinalStock);
    // referente ao desafio 9, 10:

    res.status(200).json(saida);
  } catch (err) {
    if (err.err.code === 'stock_problem') {
      return res.status(404).json(err);
    }
    res.status(422).json(err);
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    const saida = await salesServices.exclude(id);

    await salesServices.fixProductsQuantitiyAfterSale(id, null, saida);
    //  referente ao desafio 9, 10:

    res.status(200).json(saida);
  } catch (err) {
    if (err.err.code === 'stock_problem') {
      return res.status(404).json(err);
    }
    res.status(422).json(err);
  }
};

module.exports = {
  create,
  exclude,
  getAll,
  getById,
  update,
};

//  https://itnext.io/why-async-await-in-a-foreach-is-not-working-5f13118f90d
