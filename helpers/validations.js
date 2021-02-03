// consulta ao PR do Sidney Ramos (git: sidneyramos02) PR #42

// products validations:

const nameLengthError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = '"name" length must be at least 5 characters long';
  return err;
};

const productExitsError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = 'Product already exists';
  return err;
};

const productQuantityError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = '"quantity" must be larger than or equal to 1';
  return err;
};

const productQuantityTypeError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = '"quantity" must be a number';
  return err;
};

const productNotFoundError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = 'Wrong id format';
  return err;
};

// sales validations:

const addSalesError = () => {
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = 'Wrong product ID or invalid quantity';
  return err;
};

module.exports = {
  nameLengthError,
  productExitsError,
  productQuantityError,
  productQuantityTypeError,
  productNotFoundError,
  addSalesError,
};
