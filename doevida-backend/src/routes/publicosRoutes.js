const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const authMiddleware = require('../middleware/authMiddleware');

// Qualquer usuário logado pode ver a lista de serviços
router.get('/servicos', authMiddleware, servicoController.listarTodosServicos);

module.exports = router;