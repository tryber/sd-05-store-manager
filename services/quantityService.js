const productModel = require('../models/productModel');

const updateQuantity = async (action, productId, quantity) => {
  const Product = await productModel.getById(productId);
  if (!Product) return;
  if (action !== 'POST' && action !== 'DELETE' && action !== 'PUT') return;
  let newQuantity = 0;
  if (action === 'DELETE') {
    newQuantity = Product.quantity + quantity;
  } else if (action === 'POST') {
    newQuantity = Product.quantity - quantity;
  }
  console.log(action, 'UpdateQuantity', 'Nova quantidade: ' ,newQuantity ,' Produto ID: ',productId ,Product.name, quantity);
  await productModel.update(productId, Product.name, newQuantity);
};

const updateProductQuantity = async (action, itensSold) => {
  const { productId, quantity } = itensSold[0];

  if (itensSold === {}) return;
  console.log('updateProductQuantity------>', action, { productId, quantity });
  return updateQuantity(action, productId, quantity);
};

module.exports = {
  updateProductQuantity,
};
