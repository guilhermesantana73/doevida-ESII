const express = require('express');
const router = express.Router();
const doacaoController = require('../controllers/doacaoController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para um doador agendar uma nova doação
router.post('/', authMiddleware, doacaoController.agendarDoacao);
router.get('/me', authMiddleware, doacaoController.listarMinhasDoacoes);
router.get('/:id', authMiddleware, doacaoController.buscarDoacaoPorId);
router.patch('/:id/cancelar', authMiddleware, doacaoController.cancelarDoacao);

module.exports = router;