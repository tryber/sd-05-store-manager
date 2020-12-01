const table = 'products';

const error = {
  smallName: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
  invalidQuantity: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
  notNumber: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
  exists: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

module.exports = {
  table,
  error,
};
