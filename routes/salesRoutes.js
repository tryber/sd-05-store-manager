const { Router } = require('express');
const controllers = require('../controllers/index');

const salesRouter = Router();

salesRouter.get('/:id', controllers.sales.getOne);
salesRouter.get('/', controllers.sales.getAll);
salesRouter.post('/', controllers.sales.createSell);
salesRouter.put('/:id', controllers.sales.updateSell);
salesRouter.delete('/:id', controllers.sales.excludeSell);

module.exports = salesRouter;
