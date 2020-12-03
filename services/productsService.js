const { ObjectId } = require('mongodb');
const model = require('../models/productsModel');

function showError(code, message) {
  return {
    err: {
      code: `${code}`,
      message: `${message}`,
    },
  };
}

const dataFormat = async (name, quantity) => {
  if (typeof name !== 'string' || name.length < 5) {
    return showError('invalid_data', '"name" length must be at least 5 characters long');
  }

  if (quantity <= 0) {
    return showError('invalid_data', '"quantity" must be larger than or equal to 1');
  }

  if (typeof quantity !== 'number') {
    return showError('invalid_data', '"quantity" must be a number');
  }

  return true;
};

const create = async (name, quantity) => {
  const formatIsOK = await dataFormat(name, quantity);
  if (formatIsOK !== true) {
    return formatIsOK;
  }

  const findExisting = await model.findProductByName(name);

  if (findExisting) {
    return showError('invalid_data', 'Product already exists');
  }

  return model.create(name, quantity);
};

const update = async (id, name, quantity) => {
  const formatIsOK = await dataFormat(name, quantity);

  if (formatIsOK !== true) {
    return formatIsOK;
  }

  await model.update(id, name, quantity);
  return ({ _id: ObjectId(id), name, quantity });
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return showError('invalid_data', 'Wrong id format');
  }

  const findProductById = await model.getById(id);

  if (!findProductById) {
    console.log('queeee');
    return showError('invalid_data', 'Wrong id format');
  }
  return findProductById;
};

module.exports = {
  dataFormat,
  create,
  getById,
  update,
};
