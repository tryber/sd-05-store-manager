module.exports = (err, _req, res, _next) => {
  console.log(err);

  if (err.code === 'invalid_data') {
    res.status(422).json({ err });
  }
};
