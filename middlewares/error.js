module.exports = (err, _req, res, _next) => {
  console.log(err);

  if (err.code === 'invalid_data') {
    res.status(422).json({ err });
  }

  if (err.code === 'not_found') {
    res.status(404).json({ err });
  }
};
