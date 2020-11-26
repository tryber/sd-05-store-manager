const prodModel = require('../models/productsModel');
// O Service faz as regras de negócio e todas funções de apoio chamadas no Controller.
// As funções aqui chamam as funções do Model para efetivar as mudanças no BD.

const isValid = async (name, quantity) => {
  const nameInDB = await prodModel.findProdByName(name);
  if (nameInDB) return false;
  if (!name || name.length <= 5) return false;
  if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) return false;
  return true;
};

const create = async (name, quantity) => {
  const validProduct = await isValid(name, quantity);
  if (!validProduct) return false;
  const newProduct = await prodModel.create(name, quantity);
  return newProduct;
};

module.exports = { create };
