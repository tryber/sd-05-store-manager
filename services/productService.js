const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');
const add = async (name, quantity) => {
  if (name.length < 5) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantity < 1) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!Number.isInteger(quantity)) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  const isThisProductAlreaadyDocumented = await productModel.findProductByName(name);

  if (isThisProductAlreaadyDocumented) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return await productModel.add(name, quantity);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  const product = await productModel.findById(id);
  if (!product) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  if (name.length < 5) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (quantity < 1) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!Number.isInteger(quantity)) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  const updatedProduct = await productModel.update(id, name, quantity);
  // console.log(updatedProduct);
  if (!updatedProduct) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return {
    _id: ObjectId(id),
    name,
    quantity
  };
}
module.exports = { add, findById, update };
