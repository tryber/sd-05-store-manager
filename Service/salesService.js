const { ObjectId } = require('mongodb');
const model = require('../Models/salesModel');

const getAll = async () => model.getAll();

// Aqui
const productsServer = require('./productsService');

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const sale = await model.getById(id);
  if (!sale) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return sale;
};



const create = async (body) => {
  body.forEach(({ productId, quantity }) => {
    console.log('cheguei aqui')
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
    if (!ObjectId.isValid(productId)) {
      throw {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      };
    }
    
  })
 // return model.body.create(body);
  return model.create(body);
}


const update = async (id, name, quantity) => {
  if (name.length < 5) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (quantity < 0) {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (quantity === 0) {
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
  return model.update(id, name, quantity);
};

const remove = async (id) => {
  const sale = await model.exclude(id);
  if (!sale) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
