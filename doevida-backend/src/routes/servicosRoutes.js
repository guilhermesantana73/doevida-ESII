const express = require('express');
const servicoController = require('../controllers/servicoController');
const authMiddleware = require('../middleware/authMiddleware');

// Isso permite que este router acesse parâmetros da rota pai (como o :orgId)
const router = express.Router({ mergeParams: true });

router.post('/', authMiddleware, servicoController.criarServico);

// Rota para listar todos os serviços de uma OP (pública para usuários logados)
router.get('/', authMiddleware, servicoController.listarServicosDaOrganizacao);

// Rotas para atualizar e deletar um serviço específico (restritas a Admins)
router.put('/:servicoId', authMiddleware, servicoController.atualizarServico);
router.delete('/:servicoId', authMiddleware, servicoController.deletarServico);

module.exports = router;

