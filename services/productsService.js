const model = require('../models/productsModel');

const create = async (name, quantity) => {
  // aqui define-se as regras de negócio e faz as validações.

  return model.create(name, quantity);
}

module.exports = {
  create,
};
