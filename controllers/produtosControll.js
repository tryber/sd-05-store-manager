// recebe as requisições do client e consulta o service
// "garçom" do restaurante

const { Router } = require('express');
const servicos = require('../services/produtosService');

const products = Router();
products.post('/', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const new = await servicos.create(name, quantity);
        res.status(201).json(new);
    } catch (err) {
        if (err.code === 'invalid_data') {
            return res.status(422).json(err.message);
        }
        res.status(500).json({ message: 'Algo deu errado.' });
    }
});

module.exports = products;