const { addProductOutput } = require('../controllers/ControllerFile');
const { getProducts } = require('../services/ServiceFile');
const validations = require('../helpers/validations');

const addProductValidation = async (req, res) => {
  const { name, quantity } = req.body;

  const productsForSale = await getProducts('products');

  if (name.length < 5) {
    const err = validations.nameLengthError();
    return res.status(err.status).json({ err });
  }

  if (productsForSale.find((product) => product.name === name)) {
    const err = validations.productExitsError();
    return res.status(err.status).send({ err });
  }

  if (quantity <= 0) {
    const err = validations.productQuantityError();
    return res.status(err.status).send({ err });
  }

  if (typeof quantity === 'string') {
    const err = validations.productQuantityTypeError();
    return res.status(err.status).send({ err });
  }

  const response = await addProductOutput('products', name, quantity);
  res.status(201).json(response);
};
module.exports = addProductValidation;
