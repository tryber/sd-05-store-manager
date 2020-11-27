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
    console.log("bla");
    // await not valid dentro de forEach!
    // promiseAll - espera todos resolverem
    if (!existingProduct || sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  const allPromises = await Promise.all(iterarSales);
  console.log(allPromises);
  const newlySold = await salesModel.create(salesList);
  return newlySold;
};

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   const productById = await prodModel.getById(id);
//   if (!productById) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   return productById;
// };

// const updateById = async (id, name, quantity) => {
//   const validProduct = await isValid(name, quantity);
//   if (!validProduct) return false;
//   if (!ObjectId.isValid(id)) {
//     throw {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     };
//   }
//   await prodModel.updateById(id, name, quantity);
//   return {
//     _id: ObjectId(id),
//     name,
//     quantity,
//   };
// };

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

module.exports = { create };
