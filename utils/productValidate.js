module.exports = (name = '12345', quantity, sale = 0) => {
  const err = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  if (String(name).length < 5) {
    err.message = sale
      ? 'Wrong product ID or invalid quantity'
      : '"name" length must be at least 5 characters long';
    throw err;
  }
  if (typeof quantity !== 'number') {
    err.message = sale ? 'Wrong product ID or invalid quantity' : '"quantity" must be a number';
    throw err;
  }
  if (quantity < 1) {
    err.message = sale
      ? 'Wrong product ID or invalid quantity'
      : '"quantity" must be larger than or equal to 1';
    throw err;
  }
};
