const { productsModel } = require('../models');

module.exports = async (productId, reqQuantity) => {
  const qtyAvaliable = await productsModel.getProductById(productId)
    .then((product) => product.quantity);
  return (qtyAvaliable - reqQuantity >= 0);
};
