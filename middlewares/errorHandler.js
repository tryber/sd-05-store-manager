const errorHandler = (error, _req, res) => {
  console.error(error);
  const err = {};
  err.status = '422';
  err.code = 'invalid_data';
  err.message = '"name" length must be at least 5 characters long';
  console.log(err);
  return res.send(err);
};

module.exports = errorHandler;
