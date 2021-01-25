const saleList = async (req, res, next) => {
  const listOfSale = await req.body;
  listOfSale.forEach((item) => {
    // Será validado que não é possível cadastrar vendas com uma string no campo quantidade
    if (!Number.isInteger(item.quantity)) {
      res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
    // Será validado que não é possível cadastrar vendas com quantidade menor que/igual a zero
    if (Number(item.quantity) <= 0) {
      console.log(item);
      res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
  });
  next();
};

module.exports = { saleList };
