const { ObjectId } = require('mongodb');
const { salesModel, productsModel } = require('../models');

const verifyStock = async (id, quantity) => {
  const stockProduct = await productsModel.getProductById(id);

  if (!stockProduct) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  const stockQtd = stockProduct.quantity - quantity;

  if (stockQtd <= 0) {
    throw {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }
};

const updateQuantityDown = async (id, qtd) => {
  const stockProduct = await productsModel.getProductById(id);
  const newQtd = stockProduct.quantity - qtd;

  await productsModel.updateProduct(id, stockProduct.name, newQtd);
};

const updateQuantityUp = async (id, qtd) => {
  const stockProduct = await productsModel.getProductById(id);
  const newQtd = stockProduct.quantity + qtd;

  await productsModel.updateProduct(id, stockProduct.name, newQtd);
};

const register = async (itensSold) => {
  if (!itensSold) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  itensSold.forEach(async (item) => {
    const { productId, quantity } = item;
    if (!ObjectId.isValid(productId)) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (!quantity || typeof quantity === 'string') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    if (quantity <= 0) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }

    await updateQuantityDown(productId, quantity);
  });

  const sale = await salesModel.registerSale(itensSold);

  return sale;
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  const sale = await salesModel.getSaleById(id);

  if (!sale) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

const updateSale = async (id, itensSold) => {
  const { productId, quantity } = itensSold[0];

  if (!ObjectId.isValid(productId)) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (!quantity || typeof quantity === 'string') {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  if (quantity <= 0) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }

  await verifyStock(productId, quantity);

  const updatedSale = await salesModel.updateSale(id, itensSold);

  await updateQuantityDown(productId, quantity);

  return updatedSale;
};

const deleteSale = async (id) => {
  if (!id || id.length < 24) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  const findSale = await salesModel.getSaleById(id);

  if (!findSale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  await salesModel.deleteSale(id);

  findSale.itensSold.forEach(async (item) => {
    const { productId, quantity } = item;

    await updateQuantityUp(productId, quantity);
  });

  return findSale;
};

module.exports = {
  register,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  verifyStock,
};
