const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, notificacaoController.enviarNotificacao);

module.exports = router;