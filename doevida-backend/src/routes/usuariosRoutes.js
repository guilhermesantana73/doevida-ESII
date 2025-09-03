// src/routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware'); // Importe o middleware

// Rotas públicas
router.post('/', usuarioController.cadastrarDoador);
router.post('/login', usuarioController.loginUsuario);

// Nova rota protegida de perfil
// Note como o 'authMiddleware' é colocado ANTES da função do controlador.
// Ele é o "segurança na porta".
router.get('/perfil', authMiddleware, usuarioController.getPerfilUsuario);

// Rota protegida para o admin listar todos os usuários
router.get('/', authMiddleware, usuarioController.listarTodosUsuarios);

router.patch('/:id/status', authMiddleware, usuarioController.atualizarStatusUsuario);

router.delete('/:id', authMiddleware, usuarioController.deletarUsuario);

module.exports = router;