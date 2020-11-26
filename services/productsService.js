const prodModel = require('../models/productsModel');
// O Service faz as regras de negócio e todas funções de apoio chamadas no Controller.
// As funções aqui chamam as funções do Model para efetivar as mudanças no BD.

const isValid = (name, quantity) => {
  // const uniqueName = await prodModel.isUnique(name);
  // if (!uniqueName) return false;
  if (!name || typeof name !== string || name.length <= 5) return false;
  if (!quantity || quantity <= 0 || Number.isInteger(quantity) !== true) return false;
  return true;
}

const create = async (name, quantity) => {
  const validProduct = isValid(name, quantity);
  if (!validProduct) return false;
  await prodModel.create(name, quantity);
  return true;
}

module.exports = {
  create,
}