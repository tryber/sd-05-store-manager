const table = 'sales';

const error = {
  isInvalid:
    { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
};

module.exports = {
  table,
  error,
};
