const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

//https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error

class CodeError extends Error {
  constructor(message, code) {
   super(message);
   this.code = code;
  }
}

// throw new CodeError(myMessage, 404);

const add = async (name, quantity) => {
  if (name.length < 5) {
    throw new CodeError('"name" length must be at least 5 characters long', 'invalid_data')
    // throw {
    //   err: {
    //     code: 'invalid_data',
    //     message: '"name" length must be at least 5 characters long',
    //   },
    // };
  }

  if (quantity < 1) {
    throw new CodeError('"quantity" must be larger than or equal to 1', 'invalid_data')
    // throw {
    //   err: {
    //     code: 'invalid_data',
    //     message: '"quantity" must be larger than or equal to 1',
    //   },
    // };
  }

  if (!Number.isInteger(quantity)) {
    throw new CodeError('"quantity" must be a number', 'invalid_data')

    // throw {
    //   err: {
    //     code: 'invalid_data',
    //     message: '"quantity" must be a number',
    //   },
    // };
  }

  const isThisProductAlreaadyDocumented = await productModel.findProductByName(name);

  if (isThisProductAlreaadyDocumented) {
    throw new CodeError('Product already exists', 'invalid_data')

    // throw {
    //   err: {
    //     code: 'invalid_data',
    //     message: 'Product already exists',
    //   },
    // };
  }

  return productModel.add(name, quantity);
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
    quantity,
  };
};
module.exports = { add, findById, update };
