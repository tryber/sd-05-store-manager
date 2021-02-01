const getItem = (itemData) => {
  let x = { _id: '', name: '', quantity: '' };
  x = itemData;
  return x;
};

const list = async (p, collection) =>
  p
    .then((db) => db.collection(collection).find().toArray())
    .then((authors) =>
      authors.map(({ _id, name, quantity }) =>
        getItem({
          _id,
          name,
          quantity,
        })));

const addProduct = async (dataBase, collection, name, quantity) =>
  dataBase
    .then((db) => db.collection(collection).insertOne({ name, quantity }))
    .then((item) => getItem({ id: item.insertedId, name, quantity }));

module.exports = {
  list,
  addProduct,
};
