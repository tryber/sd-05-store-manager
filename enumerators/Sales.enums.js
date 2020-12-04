const table = 'sales';

const error = {
  isInvalid:
    { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
  notFound:
    { err: { code: 'not_found', message: 'Sale not found' } },
};

module.exports = {
  table,
  error,
};
