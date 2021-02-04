function verifyName(name) {
  const err = { isErr: false };
  if (name.length < 5) {
    err.isErr = true;
    err.message = '"name" length must be at least 5 characters long';
    err.status = 422;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyQuantity(quantity) {
  const err = { isErr: false };
  if (typeof quantity === 'string') {
    err.isErr = true;
    err.message = '"quantity" must be a number';
    err.status = 422;
    err.code = 'invalid_data';
    throw err;
  }
  if (quantity <= 0) {
    err.isErr = true;
    err.message = '"quantity" must be larger than or equal to 1';
    err.status = 422;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyQuantitySales(quantity) {
  const err = { isErr: false };
  if (typeof quantity === 'string' || quantity <= 0) {
    err.isErr = true;
    err.message = 'Wrong product ID or invalid quantity';
    err.status = 422;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

module.exports = { verifyName, verifyQuantity, verifyQuantitySales };
