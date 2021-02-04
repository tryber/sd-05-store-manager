const { ObjectId } = require('mongodb');
const validations = require('../helpers/validations');
const { saleByIdOutput, deleteSaleControl } = require('../controllers/ControllerFile');

const deleteSaleValidation = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    const err = validations.wrongSaleFormatError();
    return res.status(422).send({ err });
  }

  const sale = await saleByIdOutput('products', id);

  deleteSaleControl('sales', ObjectId(id));
  return res.status(200).send(sale);
};

module.exports = deleteSaleValidation;
