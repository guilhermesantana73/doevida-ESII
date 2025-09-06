const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/', usuarioController.cadastrarDoador);
router.post('/login', usuarioController.loginUsuario);

// Nova rota protegida de perfil
router.get('/perfil', authMiddleware, usuarioController.getPerfilUsuario);

// Rota protegida para o admin listar todos os usuários
router.get('/', authMiddleware, usuarioController.listarTodosUsuarios);

router.patch('/:id/status', authMiddleware, usuarioController.atualizarStatusUsuario);

router.delete('/:id', authMiddleware, usuarioController.deletarUsuario);

module.exports = router;