const db = require('../config/database');

// Função para criar uma campanha
exports.criarCampanha = async (req, res) => {
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas gestores podem criar campanhas.' });
    }
    const { titulo, data_inicio, data_termino, meta_doacoes } = req.body;
    const gestorId = req.usuario.id;
    if (!titulo || !data_inicio || !data_termino) {
        return res.status(400).json({ error: 'Título, data de início e data de término são obrigatórios.' });
    }
    try {
        const novaCampanha = await db.query(
            `INSERT INTO campanhas (fk_gestor_id, titulo, data_inicio, data_termino, meta_doacoes)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [gestorId, titulo, data_inicio, data_termino, meta_doacoes]
        );
        res.status(201).json({
            message: 'Campanha criada com sucesso!',
            campanha: novaCampanha.rows[0]
        });
    } catch (error) {
        if (error.code === '23514') {
            return res.status(400).json({ error: 'A data de término deve ser igual ou posterior à data de início.' });
        }
        console.error('Erro ao criar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para listar todas as campanhas (pública para usuários logados)
exports.listarCampanhas = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM campanhas ORDER BY data_inicio DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar campanhas:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para listar as campanhas do GESTOR LOGADO
exports.listarMinhasCampanhas = async (req, res) => {
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const gestorId = req.usuario.id;
    try {
        const { rows } = await db.query(
            'SELECT * FROM campanhas WHERE fk_gestor_id = $1 ORDER BY data_inicio DESC',
            [gestorId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar campanhas do gestor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Função para buscar uma campanha por ID
exports.buscarCampanhaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM campanhas WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para atualizar uma campanha
exports.atualizarCampanha = async (req, res) => {
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    const { titulo, data_inicio, data_termino, meta_doacoes } = req.body;
    if (!titulo || !data_inicio || !data_termino) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
    try {
        const campanhaAtualizada = await db.query(
            `UPDATE campanhas SET titulo = $1, data_inicio = $2, data_termino = $3, meta_doacoes = $4 
             WHERE id = $5 AND fk_gestor_id = $6 RETURNING *`,
            [titulo, data_inicio, data_termino, meta_doacoes, id, req.usuario.id]
        );
        if (campanhaAtualizada.rowCount === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada ou você não tem permissão para editá-la.' });
        }
        res.status(200).json({
            message: 'Campanha atualizada com sucesso!',
            campanha: campanhaAtualizada.rows[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para deletar uma campanha
exports.deletarCampanha = async (req, res) => {
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    const { id } = req.params;
    try {
        const resultado = await db.query('DELETE FROM campanhas WHERE id = $1 AND fk_gestor_id = $2', [id, req.usuario.id]);
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada ou você não tem permissão para deletá-la.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.listarDoacoesDaCampanha = async (req, res) => {
    // Apenas Gestores podem acessar
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { id: campanhaId } = req.params;
    const gestorId = req.usuario.id;

    try {
        // Primeiro, verificamos se o gestor é o dono da campanha, por segurança
        const campanhaResult = await db.query('SELECT id FROM campanhas WHERE id = $1 AND fk_gestor_id = $2', [campanhaId, gestorId]);
        if (campanhaResult.rowCount === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada ou você não tem permissão para acessá-la.' });
        }

        // Se for o dono, busca as doações associadas
        const { rows } = await db.query(
            `SELECT d.id, d.data_agendamento, d.local_doacao, d.status, u.nome as nome_doador
             FROM doacoes d
             JOIN usuarios u ON d.fk_doador_id = u.id
             WHERE d.fk_campanha_id = $1
             ORDER BY d.data_agendamento DESC`,
            [campanhaId]
        );
        res.status(200).json(rows);
    } catch (error)
    {
        console.error('Erro ao listar doações da campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
