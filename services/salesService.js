const model = require('../models/salesModel');

const create = async (salesArray) => {
  // const errorCheck = await model.checkP(salesArray);
  // console.log(salesArray);
  if (salesArray[0].quantity < 1 || typeof salesArray[0].quantity !== 'number') {
    console.log('entrei aqui');
    console.log(salesArray[0].quantity);
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
module.exports = {
  create,
};
