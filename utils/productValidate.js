module.exports = (name, quantity) => {
  const err = { code: 'invalid_data' };
  if (String(name).length < 5) {
    err.message = '"name" length must be at least 5 characters long';
    throw err;
  }
  if (typeof quantity !== 'number') {
    err.message = '"quantity" must be a number';
    throw err;
  }
  if (quantity < 1) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw err;
  }
};
