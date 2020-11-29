const { Router } = require('express');
const controllers = require('../controllers/index');

const salesRouter = Router();

salesRouter.get('/:id', controllers.sales.getOne);
salesRouter.get('/', controllers.sales.getAll);
salesRouter.post('/', controllers.sales.createSell);

module.exports = salesRouter;
