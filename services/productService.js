const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

// O Service faz as regras de negócio e todas funções de apoio chamadas no Controller.
// As funções aqui chamam as funções do Model para efetivar as mudanças no BD.

/*  ********************************************************************************************* */
const isValid = async (name, quantity) => {
  // [Será validado que não é possível criar um produto com o nome menor
  // que 5 caracteres] erro status http 422:
  if (name.length < 5) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  // [Será validado que não é possível criar um produto com quantidade menor
  // que zero] erro status http 422:
  // [Será validado que não é possível criar um produto com quantidade igual
  // a zero] erro status http 422:
  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  // [Será validado que não é possível criar um produto com uma string no
  // campo quantidade] erro status http 422:
  if (typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return true;
};

/*  ********************************************************************************************* */
const idValid = (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
};

/*  ********************************************************************************************* */
// POST :3000/products
// REQ-BODY-JSON ->
// {
//   "name": "Cerveja",
//   "quantity": 125
// }
const create = async (name, quantity) => {
  const validar = await isValid(name, quantity);
  if (!validar) return false;
  // [Será validado que não é possível criar um produto com o mesmo nome de
  // outro já existente] erro status http 422:
  const productExists = await productModel.findProduct(name);
  if (productExists) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const productCreated = await productModel.create(name, quantity);
  return productCreated;
};

/*  ********************************************************************************************* */
// GET :3000/products
const getAll = async () => productModel.getAll();

/*  ********************************************************************************************* */
// GET :3000/products/:id
const getById = async (id) => {
  // [Será validado que não é possível listar um produto que não existe]
  idValid(id);

  const Product = await productModel.getById(id);
  // [Será validado que não é possível listar um produto que não existe]
  if (!Product) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return Product;
};

/*  ********************************************************************************************* */
// PUT :3000/products/:id
// REQ-BODY-JSON ->
// {
//   "name": "Cerveja",
//   "quantity": 125
// }
const update = async (id, name, quantity) => {
  const validar = await isValid(name, quantity);
  if (!validar) return false;
  idValid(id);

  await productModel.update(id, name, quantity);
  return {
    _id: ObjectId(id),
    name,
    quantity,
  };
};

/*  ********************************************************************************************* */
// DELETE :3000/products/:id
const exclude = async (id) => {
  idValid(id);

  const deletedProd = await productModel.exclude(id);
  if (!deletedProd) {
    throw {
      code: 'invalid_data',
      message: 'Wrong id format',
    };
  }
  return deletedProd;
};

module.exports = {
  create,
  getAll,
  update,
  exclude,
  getById,
};
