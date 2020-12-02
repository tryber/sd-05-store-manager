module.exports = (name, quantity) => {
  if (name.length < 5) {
    throw { code: "invalid_data", message: "\"name\ length must be at least 5 characters long" }
  }
  if (quantity <= 0) {
    throw { code: "invalid_data", message: "\"quantity\ must be larger the or equal to 1" }
  }
  if (typeof quantity === 'string') {
    throw { code: "invalid_data", message: "\"quantity\ must be a number" }
  }
}
