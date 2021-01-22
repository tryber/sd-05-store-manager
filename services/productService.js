const rescue = require('express-rescue');
const productModel = require('../models/productModel');
const isValid = require('./validations');

const addSale = rescue(async (name, quantity) => {
    const validSale = isValid(name, quantity);
    if(!validSale) return false;

    await productModel.addProduct(name, quantity);
    return true;
});

module.exports = {
    addSale
};