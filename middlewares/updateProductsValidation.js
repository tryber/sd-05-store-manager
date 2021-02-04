const { ObjectId } = require('mongodb');
const validations = require('../helpers/validations');
const { addProductOutput, productByIdOutput } = require('../controllers/ControllerFile');

const updateProductsValidation = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  if (!ObjectId.isValid(id)) {
    const err = validations.productNotFoundError();
    return res.status(err.status).send({ err });
  }

  const productSelected = await productByIdOutput('products', id);

  if (!productSelected) {
    const err = validations.productNotFoundError();
    return res.status(err.status).send({ err });
  }

  if (name.length < 5) {
    const err = validations.nameLengthError();
    return res.status(err.status).json({ err });
  }

  if (quantity <= 0) {
    const err = validations.productQuantityError();
    return res.status(err.status).send({ err });
  }

  if (typeof quantity === 'string') {
    const err = validations.productQuantityTypeError();
    return res.status(err.status).send({ err });
  }

  const product = await addProductOutput('products', name, quantity);
  return res.status(200).send(product);
};

module.exports = updateProductsValidation;
