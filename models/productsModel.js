const { ObjectId } = require('mongodb');
const products = require('../controllers/productsController');
const getCollection = require('./connection');

const getAll = async () => getCollection('products').then(products => products.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return getCollection('products').then(products => products.findOne(ObjectId(id)));
};

const getByName = async (name) => getCollection('products').then(products => products.findOne({ name }));

const create = async (name, quantity) => {
  return getCollection('products')
    .then(product => product.insertOne({ name, quantity }))
    .then(result => ({ _id: result.insertedId, name, quantity }));
}

module.exports = {
  getAll,
  getById,
  create,
  getByName,
};
