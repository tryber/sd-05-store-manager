const express = require('express');

const app = express();
const PORT = 3000;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
