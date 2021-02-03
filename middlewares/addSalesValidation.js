// https://www.w3schools.com/jsref/jsref_some.asp
// referencia do method some

const { addSalesOutput } = require('../controllers/ControllerFile');
const validations = require('../helpers/validations');

const addSalesValidation = async (req, res) => {
  const itensSold = req.body.map((product) => product);
  console.log('sold', itensSold);

  const quantityValue = itensSold.map((obj) => obj.quantity);

  const isZero = (qty) => qty <= 0;

  const isString = (qty) => typeof qty === 'string';

  if (quantityValue.some(isString)) {
    const err = validations.addSalesError();
    return res.status(err.status).send({ err });
  }

  if (quantityValue.some(isZero)) {
    const err = validations.addSalesError();
    return res.status(err.status).send({ err });
  }
  const response = await addSalesOutput('sales', itensSold);
  res.status(200).json(response);
};
module.exports = addSalesValidation;
