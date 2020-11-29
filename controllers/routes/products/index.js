const { Router } = require('express');
const route = Router();

route.get('/', (req, res) => {
  const product = {};

  res.status(200).json(product);
});

module.exports = route;
