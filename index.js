const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
