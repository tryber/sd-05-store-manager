const getConnection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSale = async (itenSold) => 
  getConnection()
    .then((db) => db.collection('sales').insertOne({ itenSold }))
    .catch((err) => console.log(err));  

const findAllSales = async () =>
  getConnection()
    .then((db) => db.collection('sales').find({}).toArray())
    .catch((err) => console.log(err));
    
const findById = async (id) =>
  getConnection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .catch((err) => console.log(err));
		
const updateSale = async (id, name, quantity) => {
	getConnection()
		.then((db) =>
			db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
		.catch((err) => console.log(err));

const deleteSale = async (id) =>
  getConnection()
    .then((db) => db.collection('sales').deleteOne({ _id: Object(id) }))
    .catch((err) => console.log(err));

module.exports = {
  insertSale,
  findAllSales,
  findById,
  findByName,
  updateSale,
  deleteSale,
};
