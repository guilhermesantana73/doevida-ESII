// src/controllers/servicoController.js
const db = require('../config/database');

exports.criarServico = async (req, res) => {
    // Autorização: Apenas Administradores
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    // O ID da organização vem do parâmetro da rota aninhada
    const { orgId } = req.params;
    const { titulo, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({ error: 'O campo título é obrigatório.' });
    }

    try {
        const novoServico = await db.query(
            `INSERT INTO servicos (fk_op_id, titulo, descricao)
             VALUES ($1, $2, $3) RETURNING *`,
            [orgId, titulo, descricao]
        );

        res.status(201).json({
            message: 'Serviço cadastrado com sucesso!',
            servico: novoServico.rows[0]
        });

    } catch (error) {
        // Erro comum: fk_op_id não existe. O PostgreSQL retornará um erro de foreign key.
        if (error.code === '23503') { // foreign_key_violation
            return res.status(404).json({ error: 'Organização Parceira não encontrada.' });
        }
        console.error('Erro ao cadastrar serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Função para LISTAR todos os serviços de UMA organização
exports.listarServicosDaOrganizacao = async (req, res) => {
    const { orgId } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM servicos WHERE fk_op_id = $1 ORDER BY titulo', [orgId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar serviços:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para ATUALIZAR um serviço específico
exports.atualizarServico = async (req, res) => {
    // Autorização
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    const { orgId, servicoId } = req.params;
    const { titulo, descricao } = req.body;

    if (!titulo) {
        return res.status(400).json({ error: 'O campo título é obrigatório.' });
    }

    try {
        const servicoAtualizado = await db.query(
            `UPDATE servicos SET titulo = $1, descricao = $2
             WHERE id = $3 AND fk_op_id = $4 RETURNING *`,
            [titulo, descricao, servicoId, orgId]
        );

        if (servicoAtualizado.rowCount === 0) {
            return res.status(404).json({ error: 'Serviço não encontrado nesta organização.' });
        }

        res.status(200).json({
            message: 'Serviço atualizado com sucesso!',
            servico: servicoAtualizado.rows[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para DELETAR um serviço específico
exports.deletarServico = async (req, res) => {
    // Autorização
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    const { orgId, servicoId } = req.params;

    try {
        const resultado = await db.query('DELETE FROM servicos WHERE id = $1 AND fk_op_id = $2', [servicoId, orgId]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Serviço não encontrado nesta organização.' });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar serviço:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.listarTodosServicos = async (req, res) => {
    try {
        // Este comando SQL une as tabelas 'servicos' e 'organizacoes_parceiras'
        // para que possamos ter o nome da OP junto com os detalhes do serviço.
        const { rows } = await db.query(
            `SELECT 
                s.id, s.titulo, s.descricao, op.nome_fantasia 
             FROM servicos s
             JOIN organizacoes_parceiras op ON s.fk_op_id = op.id
             ORDER BY op.nome_fantasia, s.titulo`
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar todos os serviços:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};