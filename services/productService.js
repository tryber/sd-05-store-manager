const { ObjectId } = require('mongodb');
const { forEachChild } = require('typescript');
const productModel = require('../models/productModel');

// https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

// throw new CodeError(myMessage, 404);

const add = async (name, quantity) => {
  if (name.length < 5) {
    throw new CodeError('"name" length must be at least 5 characters long', 'invalid_data');
  }

  if (quantity < 1) {
    throw new CodeError('"quantity" must be larger than or equal to 1', 'invalid_data');
  }

  if (!Number.isInteger(quantity)) {
    throw new CodeError('"quantity" must be a number', 'invalid_data');
  }

  const isThisProductAlreaadyDocumented = await productModel.findProductByName(name);

  if (isThisProductAlreaadyDocumented) {
    throw new CodeError('Product already exists', 'invalid_data');
  }

  return productModel.add(name, quantity);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new CodeError('Wrong id format', 'invalid_data');
  }
  const product = await productModel.findById(id);
  if (!product) {
    throw new CodeError('Wrong id format', 'invalid_data');
  }

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    throw new CodeError('Wrong id format', 'invalid_data');
  }

  if (name.length < 5) {
    throw new CodeError('"name" length must be at least 5 characters long', 'invalid_data');
  }

  if (quantity < 1) {
    throw new CodeError('"quantity" must be larger than or equal to 1', 'invalid_data');
  }

  if (!Number.isInteger(quantity)) {
    throw new CodeError('"quantity" must be a number', 'invalid_data');
  }

  await productModel.update(id, name, quantity);

  return {
    _id: ObjectId(id),
    name,
    quantity,
  };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new CodeError('Wrong id format', 'invalid_data');
  }

  const { _id, name, quantity } = await productModel.findById(id);

  if (!name) {
    throw new CodeError('Wrong id format', 'invalid_data');
  }

  await productModel.exclude(id);

  return { _id, name, quantity };
};
// -----
const updateProductsDB = async (itensSold, vendaOuDelete) => {
  await itensSold.forEach(async (item) => {
    console.log(('entrou no for each do updateProduct'));
    await productModel.incrementQuantity(item.productId, item.quantity, vendaOuDelete)
  })

  return 
}
// -----
module.exports = { add, findById, update, exclude, updateProductsDB };
