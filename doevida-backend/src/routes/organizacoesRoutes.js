const express = require('express');
const router = express.Router();
const organizacaoController = require('../controllers/organizacaoController');
const authMiddleware = require('../middleware/authMiddleware');

const servicosRoutes = require('./servicosRoutes');

// Rota para cadastrar uma nova Organização Parceira (protegida e restrita a Admins)
router.post('/', authMiddleware, organizacaoController.cadastrarOrganizacao);
router.put('/:id', authMiddleware, organizacaoController.atualizarOrganizacao);
router.delete('/:id', authMiddleware, organizacaoController.deletarOrganizacao);
router.get('/', authMiddleware, organizacaoController.listarOrganizacoes);
router.get('/:id', authMiddleware, organizacaoController.buscarOrganizacaoPorId);

router.use('/:orgId/servicos', servicosRoutes);

module.exports = router;
