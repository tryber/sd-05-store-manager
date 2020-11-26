const service = require('../services/storeServices');

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await service.isValid(name, quantity);
    const saida = await service.create(name, quantity);
    res.status(201).json(saida);
  } catch (err) {
    res.status(422).json(err);
  }
};

module.exports = {
  create,
};
