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

    res.status(200).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

module.exports = {
  create,
};

//  https://itnext.io/why-async-await-in-a-foreach-is-not-working-5f13118f90d
