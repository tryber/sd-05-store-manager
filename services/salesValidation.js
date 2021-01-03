// const sm = require('../models/salesModel');

function isNumber(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

// a função acima verifica se uma string possuí apenas números
// fonte: https://pt.stackoverflow.com/questions/11275/verificar-se-string-possui-apenas-n%C3%BAmeros

const sl = async (req, res, next) => {
  const list = await req.body;
  list.forEach((element) => {
    if (!isNumber(Number(element.quantity))) {
      res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }

    if (Number(element.quantity) < 1) {
      console.log(element);
      res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
  });
  next();
};

module.exports = { sl };
