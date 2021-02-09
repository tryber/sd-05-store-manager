const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const create = async (allSale) => {
  console.log(allSale);
  const verificaVenda = allSale.map(async (sale) => {
    const productOk = ObjectId.isValid(sale.productId);
    if (!productOk) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    const productExist = await productModel.showById(sale.productId);

    console.log(productExist);

    if (!productExist || sale.quantity <= 0 || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (sale.quantity > productExist.quantity) {
      throw {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
    }

    return allSale;
  });

  await Promise.all(verificaVenda);

  return saleModel.venda(allSale);
};

const showById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const saleById = await saleModel.showById(id);

  if (!saleById) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return saleById;
};

const atualizar = async (id, productId, quantity) => {
  const saleExist = await saleModel.showById(id);
  if (!saleExist) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const productOk = ObjectId.isValid(productId);
  if (!productOk) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const productExist = await productModel.showById(productId);
  console.log(productExist);
  if (!productExist || quantity <= 0 || typeof quantity !== 'number') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (quantity > productExist.quantity) {
    throw {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }

  await saleModel.atualizar(id, productId, quantity);
  return { _id: id, itensSold: [{ productId, quantity }] };
};

const excluir = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  const buscaVenda = await saleModel.showById(id);

  if (!buscaVenda) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  await saleModel.excluir(id);

  return buscaVenda;
};

module.exports = {
  create,
  showById,
  atualizar,
  excluir,
};
