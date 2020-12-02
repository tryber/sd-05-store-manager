const { ObjectId } = require('mongodb');

const saleModel = require('../models/salesModel');

const productService = require('./productsService');

const validationData = (item) => {
  if (
    item.quantity < 1 ||
    typeof item.quantity !== 'number'
    // || !ObjectId.isValid(item.productId)
  ) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
};

// const isThisIdValid = async (id, saleDoesExist) => {
//   if (!ObjectId.isValid(id) || !saleDoesExist) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong sale ID format',
//     };
//   }
// };

const create = async (items) => {
  await productService.updateDB(items);
  items.forEach((item) => validationData(item));
  itemsSold = saleModel.create(items);
  return itemsSold;
};

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }

//   const saleDoesExist = await saleModel.getById(id);

//   if (!saleDoesExist) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }

//   // await isThisIdValid(id, saleDoesExist);

//   return saleDoesExist;
// };

// const getAll = async () => saleModel.getAll();

// const updateById = async (id, quantity) => {
//   validationData(quantity);
//   await saleModel.updateById(id, quantity);
//   const updatedsale = { _id: ObjectId(id), quantity };

//   return updatedsale;
// };

// const remove = async (id) => {
//   const saleDoesExist = await saleModel.getById(id);
//   await isThisIdValid(id, saleDoesExist);
//   const deletedsale = await saleModel.remove(id);
//   return deletedsale;
// };

module.exports = {
  create,
  // create,
  // getAll,
  // getById,
  // remove,
  // updateById,
};
