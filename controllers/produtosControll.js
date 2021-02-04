// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const servicos = require('../services/produtosService');

const productsRoute = Router();
produ