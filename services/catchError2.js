module.exports = (quantity) => {
  if (+quantity <= 0 || typeof quantity === 'string') {
    throw {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
};
