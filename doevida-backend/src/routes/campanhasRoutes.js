// src/routes/campanhasRoutes.js
const express = require('express');
const router = express.Router();
const campanhaController = require('../controllers/campanhaController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para criar uma nova campanha.
// Note que estamos REUTILIZANDO nosso middleware de autenticação.
router.post('/', authMiddleware, campanhaController.criarCampanha);

// Rota para criar uma nova campanha
router.post('/', authMiddleware, campanhaController.criarCampanha);

// Nova rota para listar todas as campanhas
router.get('/', authMiddleware, campanhaController.listarCampanhas);

// Nova rota para buscar uma campanha específica por ID
// O ':id' é um parâmetro. O Express vai capturar o valor e colocá-lo em req.params.id
router.get('/:id', authMiddleware, campanhaController.buscarCampanhaPorId);

// Rota para buscar uma campanha específica por ID
router.get('/:id', authMiddleware, campanhaController.buscarCampanhaPorId);

// Nova rota para ATUALIZAR uma campanha
router.put('/:id', authMiddleware, campanhaController.atualizarCampanha);

// Nova rota para DELETAR uma campanha
router.delete('/:id', authMiddleware, campanhaController.deletarCampanha);

router.get('/me', authMiddleware, campanhaController.listarMinhasCampanhas);



module.exports = router;
