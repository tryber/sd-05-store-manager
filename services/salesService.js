const { ObjectId } = require('mongodb');

const salesModel = require('../models/salesModel');

/*  ********************************************************************************************* */
// POST :3000/sales
// REQ-BODY-JSON ->
// [
//   {
//   "productId": "5ff86fd3b56949379996443f",
//   "quantity": 5
//   }
// ]
const create = async (body) => {
  body.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        },
      };
    }
    if (typeof quantity === 'string' || quantity <= 0) {
      throw { err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
  });
  return salesModel.create(body);
};

/*  ********************************************************************************************* */
// GET :3000/sales
const getAll = async () => salesModel.getAll();

/*  ********************************************************************************************* */
// GET :3000/sales/5ff86fd3b56949379996443f
const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw { err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const item = await salesModel.getById(id);
  if (!item) {
    throw { err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return item;
};

module.exports = { create, getAll, getById };
