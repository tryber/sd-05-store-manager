module.exports = (req, res) => {
  const { name, quantity } = req.body;
  const err = {
    code: 'invalid_data',

  };
  if (String(name).length < 5) {
    err.message = '"name" length must be at least 5 characters long';
    res.status(422).json(err);
  }
  if (quantity <= 0) {
    err.message = '"quantity" must be larger than or equal to 1';
    throw err;
  }
  if (parseInt(quantity, 10) !== quantity) {
    err.message = '"quantity" must be a number';
    throw err;
  }
  return err;
};
