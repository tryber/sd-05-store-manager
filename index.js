const express = require('express');

const app = express();
// const rescue = require('express-rescue');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
