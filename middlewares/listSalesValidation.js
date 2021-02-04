const { ObjectId } = require('mongodb');
const validations = require('../helpers/validations');
const { saleByIdOutput } = require('../controllers/ControllerFile');

const listSalesValidation = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    const err = validations.saleNotFoundError();
    return res.status(err.status).send({ err });
  }
  const sale = await saleByIdOutput('sales', id);
  if (!sale) {
    const err = validations.saleNotFoundError();
    return res.status(err.status).send({ err });
  }

  return res.status(200).send(sale);
};

module.exports = listSalesValidation;
