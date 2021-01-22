// acesso ao banco

const { ObjectID } = require('mongodb');
const connectionDB = require('./connection');
const products = require('../models/products'); 

const salesCreate = async (productId, id, quantity) => connectionDB('sales')
.then((db) => db.insertOne({ productId, quantity }))
.then((result) => ({
    _id: result.insertedId,
    itensSold: [
        {
            productId: products.productCreate(id),
            quantity,
        }
    ]
}));

module.exports = { salesCreate };
