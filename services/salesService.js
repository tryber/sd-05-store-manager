const { ObjectId } = require('mongodb');

const salesModel = require('../models/salesModel');
const quantityService = require('./quantityService');

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
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
    if (typeof quantity === 'string' || quantity <= 0) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }

    console.log("salesService------>", 'POST', { productId, quantity });
    quantityService.updateProductQuantity('POST', [{ productId, quantity }]);
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
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const item = await salesModel.getById(id);
  if (!item) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return item;
};

/*  ********************************************************************************************* */
// PUT :3000/sales/5ff86fd3b56949379996443f
// REQ-BODY-JSON ->
// [
//   {
//     "productId": "5f3ff849d94d4a17da707008",
//     "quantity": 3
//   }
// ]
const update = async (id, body) => {
  body.forEach(({ productId, quantity }) => {
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
    if (typeof quantity === 'string' || quantity <= 0) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
  });

  return salesModel.update(id, body);
};

/*  ********************************************************************************************* */
// DELETE :3000/sales/5ff86fd3b56949379996443f
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  const sale = await salesModel.getById(id);
  const { productId, quantity } = sale.itensSold[0];
  if (!sale) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  quantityService.updateProductQuantity('DELETE', [{ productId, quantity }]);
  return salesModel.exclude(id);
};

module.exports = { create, getAll, getById, update, exclude };
