module.exports = (err, _req, res, _next) => {
  if (err.code === 'invalid_data') {
    res.status(422).json({ err });
  }
};
