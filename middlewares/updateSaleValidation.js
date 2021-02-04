const { updateSaleById, saleByIdOutput } = require('../controllers/ControllerFile');
const validations = require('../helpers/validations');

const updateSaleValidation = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const err = validations.addSalesError();

  const isZero = (qty) => qty <= 0;

  const isString = (qty) => typeof qty === 'string';

  const quantitys = body.map((element) => element.quantity);

  console.log(quantitys);

  quantitys.forEach((element) => {
    if (isZero(element)) return res.status(err.status).send({ err });
  });
  quantitys.forEach((element) => {
    if (isString(element)) return res.status(err.status).send({ err });
  });

  try {
    await updateSaleById('sales', id, body);
    const result = await saleByIdOutput('sales', id);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
};
module.exports = updateSaleValidation;
