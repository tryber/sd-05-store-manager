const { ObjectId } = require('mongodb');
const validations = require('../helpers/validations');
const { productByIdOutput, deleteProductControl } = require('../controllers/ControllerFile');

const deleteProductsValidation = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    const err = validations.productNotFoundError();
    return res.status(err.status).send({ err });
  }

  const product = await productByIdOutput('products', id);

  if (!product) {
    const err = validations.productNotFoundError();
    return res.status(err.status).send({ err });
  }
  deleteProductControl('products', ObjectId(id));
  return res.status(200).send(product);
};

module.exports = deleteProductsValidation;
