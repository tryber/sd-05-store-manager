const { Router } = require('express');

const service = require('../services/salesService');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newSale = await service.create(req.body);
    return res.status(200).json(newSale);
  } catch (err) {
    if (err.code === 'invalid_data') {
      return res.status(422).json({ err: { code: err.code, message: err.message } });
    }
    console.error(err);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});
module.exports = router;
