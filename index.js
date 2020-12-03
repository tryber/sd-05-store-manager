const express = require('express');

const bodyParse = require('body-parser');

const app = express(bodyParse);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
