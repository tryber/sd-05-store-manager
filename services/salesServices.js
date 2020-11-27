const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel')

// https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// throw new CodeError(myMessage, 404);

const addSale = async (itensSold) => {
  const isQuantityWrong = false;

  itensSold.forEach((e) => {
    const isProductIdValid = ObjectId.isValid(e.productId);


    // const mongoItem = await productModel.findById(e.productId);

    // if (mongoItem.quantity < e.quantity) {
    //   isQuantityWrong = true;
    //   return
    //   // throw new CodeError('Such amount is not permitted to sell', 'stock_problem');
    // }

    if (e.quantity < 1 || typeof e.quantity !== 'number' || !isProductIdValid) {
      throw new CodeError('Wrong product ID or invalid quantity', 'invalid_data');
    }
  });

  // if(isQuantityWrong) {
  //     throw new CodeError('Such amount is not permitted to sell', 'stock_problem');
  // }

  return salesModel.addSale(itensSold);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
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

const update = async (id, productId, quantity) => {
  // console.log(id, productId, quantity);
  if (!ObjectId.isValid(id)) {
    console.log('object is valid?');
    throw new CodeError('Wrong product ID or invalid quantity', 'invalid_data');
  }

  if (quantity < 1 || typeof quantity !== 'number') {
    console.log('quantity');
    throw new CodeError('Wrong product ID or invalid quantity', 'invalid_data');
  }

  console.log(id, productId, quantity);

  await salesModel.update(id, productId, quantity);

  return {
    _id: id,
    itensSold: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    console.log('object is valid?');
    throw new CodeError('Wrong sale ID format', 'invalid_data');
  }

  const saleBeforeBeingDeleted = await salesModel.findById(id);

  await salesModel.deleteSale(id);

  return saleBeforeBeingDeleted;
};

module.exports = { addSale, findById, update, exclude };
