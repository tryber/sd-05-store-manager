const { product } = require('../models');

const checkNameAndQuantity = (name, quantity) => {
  if (name.length >= 5 && quantity > 0) return true;

  return false;
};

const insertProduct = (name, quantity) => {
  if(!checkNameAndQuantity) return {}
}
