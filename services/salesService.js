const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

let err = {};
const createSales = async (arr) => {
  let isError = arr.some(({ quantity }) => {
    if (quantity <= 0) {
      err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      return true;
    }

    if (typeof quantity === 'string') {
      err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      return true;
    }
    return false;
  });
  if (isError) return err;

  // const SalesExists = await salesModel.getSalesByName(name);
  // if (SalesExists) {
  //   return {
  //     code: 'invalid_data',
  //     message: 'Sales already exists',
  //   };
  // }
  const prometidas = arr.map(({ productId }) => productModel.getByProductId(productId));
  const prometidasResolvidas = await Promise.all(prometidas);
  isError = prometidasResolvidas.some((prod, index) => prod.quantity < arr[index].quantity);
  console.log(prometidasResolvidas, arr);
  if (isError) {
    return {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }
  const newSales = await salesModel.createSale(arr);
  return newSales;
};

const getById = async (id) => {
  try {
    ObjectId(id);
  } catch (error) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  const SalesListId = await salesModel.getBySalesId(id);
  if (!SalesListId) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return SalesListId;
};

const getAll = async () => salesModel.getAllSales();

const update = async (id, arr) => {
  if (!ObjectId(id)) {
    return {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }

  const isError = arr.some(({ quantity }) => {
    if (quantity <= 0) {
      err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      return true;
    }

    if (typeof quantity === 'string') {
      err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
      return true;
    }
    return false;
  });

  if (isError) return err;

  const updateId = await salesModel.updateSale(id, arr);

  // const SalesExists = await salesModel.getSalesByName(name);
  // if (!SalesExists) {
  //   return {
  //     code: 'invalid_data',
  //     message: 'Sales already exists',
  //   };
  // }

  return updateId;
};

const deleteId = async (id) => {
  try {
    ObjectId(id);
  } catch (error) {
    return {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  const deleteIt = await salesModel.deleteSale(id);
  return deleteIt;
};

module.exports = {
  createSales,
  getById,
  getAll,
  update,
  deleteId,
};
