const model = require('../models/index');

const getSales = () => model.sales.getAll();

const showSale = async (id) => {
  const sale = await model.sales.findById(id);
  switch (true) {
    case sale === null || sale === {}:
      throw {
        code: 'not_found',
        message: 'Sale not found',
      };
    default:
      return sale;
  }
};

const sell = async (sales) => {
  sales.forEach(({ quantity }) => {
    if (+quantity < 1 || typeof quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  return model.sales.addSale(sales);
};

const updateById = async (sales, id) => {
  sales.forEach(({ quantity }) => {
    if (+quantity < 1 || typeof quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
  });
  return model.sales.update(sales, id);
};

const excludeById = async (id) => {
  const sale = await model.sales.findById(id);
  if (!sale) {
    throw {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }
  await model.sales.exclude(id);
  return sale;
};

module.exports = {
  getSales,
  showSale,
  sell,
  updateById,
  excludeById,
};
