const model = require('../models/salesModel');

const create = async (salesArray) => {
  // const errorCheck = await model.checkP(salesArray);
  // console.log(salesArray);
  if (salesArray[0].quantity < 1 || typeof salesArray[0].quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  // if (!errorCheck) {
  //   console.log('entrei aqui2');

  //   throw {
  //     code: 'invalid_data',
  //     message: 'Wrong product ID or invalid quantity',
  //   };
  // }
  return model.create(salesArray);
};
const getAll = async () => {
  const sales = await model.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await model.getById(id);
  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return sale;
};
const update = async (id, salesArray) => {
  if (salesArray[0].quantity < 1 || typeof salesArray[0].quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const checkSale = await model.getById(id);
  if (checkSale) {
    await model.update(id, salesArray);
    const updatedSale = await model.getById(id);
    return updatedSale;
  }
};
module.exports = {
  create,
  getAll,
  getById,
  update,
};
