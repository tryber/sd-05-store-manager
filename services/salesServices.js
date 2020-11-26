const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

// https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// throw new CodeError(myMessage, 404);

const addSale = async (itensSold) => {
  itensSold.forEach((e) => {
    const isProductIdValid = ObjectId.isValid(e.productId);

    if (e.quantity < 1 || typeof e.quantity !== 'number' || !isProductIdValid) {
      throw new CodeError('Wrong product ID or invalid quantity', 'invalid_data');
    }
  });

  return salesModel.addSale(itensSold);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    // console.log('entrou isvalid');

    throw new CodeError('Wrong product ID or invalid quantity', 'invalid_data');
  }
  // console.log('entrou no service find id');

  const sale = await salesModel.findById(id);

  // console.log(sale);

  if (!sale) {
    throw new CodeError('Sale not found', 'not_found');
  }

  return sale;
};

module.exports = { addSale, findById };
