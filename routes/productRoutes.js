const { Router } = require('express');
const controllers = require('../controllers/index');

const productRouter = Router();

productRouter.post('/', controllers.product.addProduct);

productRouter.get('/:id', controllers.product.getProduct);
productRouter.get('/', controllers.product.getAllProducts);

module.exports = productRouter;
