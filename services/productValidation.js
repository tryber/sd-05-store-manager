const db = require('../models/productsModels');

function isNumber(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

// a função acima verifica se uma string possuí apenas números
// fonte: https://pt.stackoverflow.com/questions/11275/verificar-se-string-possui-apenas-n%C3%BAmeros

const pL = async (req, res, next) => {
  const { name, quantity } = req.body;
  const listaPorNome = await db.nameSearch(name);
  if (name.length < 5) {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    });
  }

  if (Number(quantity) <= 0) {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  }

  if (!isNumber(quantity)) {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    });
  }

  if (listaPorNome.length !== 0) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }

  next();
};

module.exports = { pL };
