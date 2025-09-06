const express = require('express');
const router = express.Router();
const campanhaController = require('../controllers/campanhaController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para o gestor ver suas próprias campanhas
router.get('/me', authMiddleware, campanhaController.listarMinhasCampanhas);

// Rota para listar TODAS as campanhas (mantive a ordem de GETs juntos)
router.get('/', authMiddleware, campanhaController.listarCampanhas);

// Rota genérica para buscar qualquer campanha por ID
router.get('/:id', authMiddleware, campanhaController.buscarCampanhaPorId);

// Rota para criar uma nova campanha
router.post('/', authMiddleware, campanhaController.criarCampanha);

// Rota para ATUALIZAR uma campanha
router.put('/:id', authMiddleware, campanhaController.atualizarCampanha);

// Rota para DELETAR uma campanha
router.delete('/:id', authMiddleware, campanhaController.deletarCampanha);

module.exports = router;