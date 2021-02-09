const rescue = require('express-rescue');

const validation = rescue(async (request, response, next) => {
  // recebe todos os valores do parametro quantity e armazena num array
  // independente de quantos vierem na requisição
  const quantity = request.body.map((element) => element.quantity);

  // aqui ele verifica cada um deles
  // e retorna true se pelo menos algum deles passar nessas condições
  const validationQuantity = quantity.some((item) => item <= 0);
  const validationQuantityType = quantity.some((item) => !Number.isInteger(parseInt(item, 10)) || typeof item === 'string');

  if (validationQuantity || validationQuantityType) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
});

module.exports = {
  validation,
};
