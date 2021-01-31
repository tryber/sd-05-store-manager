const getNewAuthor = (authorData) => {
  let x = { _id: '', name: '' };
  x = authorData;
  return x;
};
const list = async (collection, p) => {
  const k = await p
    .then((db) => db.collection(collection).find().toArray())
    .then((authors) =>
      authors.map(({ _id, name }) =>
        getNewAuthor({
          _id,
          name,
        })));
  return k;
};

module.exports = list;
