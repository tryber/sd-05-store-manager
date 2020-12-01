const { Router } = require('express');
const controllers = require('../controllers/index');

const productRouter = Router();

productRouter.post('/', controllers.product.addProduct);

productRouter.get('/:id', controllers.product.getProduct);
productRouter.put('/:id', controllers.product.updateProduct);
productRouter.delete('/:id', controllers.product.deleteProduct);
productRouter.get('/', controllers.product.getAllProducts);

module.exports = productRouter;
