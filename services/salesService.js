const { ObjectId } = require('mongodb');

const salesModel = require('../models/salesModel');
const prodModel = require('../models/productsModel');

// const isValid = async (name, quantity) => {
//   if (quantity <= 0) {
//     throw {
//       code: 'invalid_data',
//       message: '"quantity" must be larger than or equal to 1',
//     };
//   }
//   if (typeof quantity !== 'number') {
//     throw {
//       code: 'invalid_data',
//       message: '"quantity" must be a number',
//     };
//   }
//   return true;
// };

const create = async (salesList) => {
  const iterarSales = salesList.map(async (sale) => {
    const validProductId = ObjectId.isValid(sale.productId);
    // melhor pratica colocar na promise do model
    // ou seja if essa valida dà false, da null, continua promise
    console.log(validProductId);
    if (!validProductId) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
    const existingProduct = await prodModel.getById(sale.productId);
    if (!existingProduct || sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  // tentativa inicial de await not valid dentro de forEach
  // resolvido com Promise.all - que espera todos resolverem
  const allPromises = await Promise.all(iterarSales);
  console.log(allPromises);
  const newlySold = await salesModel.create(salesList);
  return newlySold;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
    // seria melhor invalid mas o teste que manda
  }
  const salesById = await salesModel.getById(id);
  if (!salesById) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return salesById;
};

const updateById = async (id, productId, quantity) => {
  const saleExists = getById(id);
  if (!saleExists) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const existingProduct = await prodModel.getById(sale.productId);
  if (!existingProduct) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const validId = ObjectId.isValid(id);
  if (!validId || quantity <= 0 || typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  await salesModel.updateById(id, productId, quantity);
  return {
    _id: id,
    itensSold: [
      {
        productId,
        quantity,
      },
    ],
  };
};

// const deleteById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   const deletedProd = await prodModel.deleteById(id);
//   if (!deletedProd) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   return deletedProd;
// };

module.exports = { create, getById, updateById };
