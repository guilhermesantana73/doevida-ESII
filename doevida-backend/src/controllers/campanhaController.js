// src/controllers/campanhaController.js
const db = require('../config/database');

exports.criarCampanha = async (req, res) => {
    // A. AUTORIZAÇÃO: Verificar se o usuário é um Gestor
    // As informações do usuário (incluindo o tipo) vêm do token, através do nosso middleware
    if (req.usuario.tipo !== 'GESTOR') {
        // 403 Forbidden: O usuário está autenticado, mas não tem permissão para este recurso.
        return res.status(403).json({ error: 'Acesso negado. Apenas gestores podem criar campanhas.' });
    }

    // B. LÓGICA: Se a autorização passar, continuamos...
    const { titulo, data_inicio, data_termino, meta_doacoes } = req.body;
    const gestorId = req.usuario.id; // Pegamos o ID do gestor logado

    // Validação dos dados
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
        // Verifica se o erro é de violação de constraint (ex: data_termino < data_inicio)
        if (error.code === '23514') { // Código de erro do PostgreSQL para check_violation
            return res.status(400).json({ error: 'A data de término deve ser igual ou posterior à data de início.' });
        }
        console.error('Erro ao criar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Nova função para LISTAR TODAS as campanhas
exports.listarCampanhas = async (req, res) => {
    try {
        // Simplesmente seleciona todas as campanhas do banco
        // Adicionamos um ORDER BY para mostrar as mais recentes primeiro
        const { rows } = await db.query('SELECT * FROM campanhas ORDER BY data_inicio DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar campanhas:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Nova função para BUSCAR UMA campanha pelo ID
exports.buscarCampanhaPorId = async (req, res) => {
    // O ID virá como um "parâmetro de rota" na URL
    const { id } = req.params;

    try {
        const { rows } = await db.query('SELECT * FROM campanhas WHERE id = $1', [id]);

        // Verifica se a campanha foi encontrada
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada.' }); // 404 Not Found
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Nova função para ATUALIZAR uma campanha
exports.atualizarCampanha = async (req, res) => {
    // Autorização: Apenas Gestores
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas gestores podem atualizar campanhas.' });
    }

    const { id } = req.params;
    const { titulo, data_inicio, data_termino, meta_doacoes } = req.body;

    // Validação
    if (!titulo || !data_inicio || !data_termino) {
        return res.status(400).json({ error: 'Título, data de início e data de término são obrigatórios.' });
    }

    try {
        const campanhaAtualizada = await db.query(
            `UPDATE campanhas SET titulo = $1, data_inicio = $2, data_termino = $3, meta_doacoes = $4 
             WHERE id = $5 RETURNING *`,
            [titulo, data_inicio, data_termino, meta_doacoes, id]
        );

        // Verifica se a campanha existia para ser atualizada
        if (campanhaAtualizada.rowCount === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada.' });
        }

        res.status(200).json({
            message: 'Campanha atualizada com sucesso!',
            campanha: campanhaAtualizada.rows[0]
        });

    } catch (error) {
        if (error.code === '23514') {
            return res.status(400).json({ error: 'A data de término deve ser igual ou posterior à data de início.' });
        }
        console.error('Erro ao atualizar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Nova função para DELETAR uma campanha
exports.deletarCampanha = async (req, res) => {
    // Autorização: Apenas Gestores
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas gestores podem deletar campanhas.' });
    }

    const { id } = req.params;

    try {
        const resultado = await db.query('DELETE FROM campanhas WHERE id = $1', [id]);

        // Verifica se a campanha existia para ser deletada
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Campanha não encontrada.' });
        }

        // 204 No Content é a resposta padrão para um delete bem-sucedido
        res.status(204).send();

    } catch (error) {
        console.error('Erro ao deletar campanha:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};