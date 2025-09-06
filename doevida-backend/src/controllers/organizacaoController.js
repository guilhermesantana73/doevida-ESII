const db = require('../config/database');

exports.cadastrarOrganizacao = async (req, res) => {
    // Autorização: Apenas Administradores podem cadastrar OPs
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    const { nome_fantasia, razao_social, cnpj, email_contato } = req.body;

    if (!nome_fantasia || !razao_social || !cnpj || !email_contato) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verificar se o CNPJ já está cadastrado
        const { rows: cnpjExistente } = await db.query('SELECT id FROM organizacoes_parceiras WHERE cnpj = $1', [cnpj]);
        if (cnpjExistente.length > 0) {
            return res.status(409).json({ error: 'Este CNPJ já está cadastrado.' });
        }

        // Inserir a nova organização no banco de dados
        const novaOrganizacao = await db.query(
            `INSERT INTO organizacoes_parceiras (nome_fantasia, razao_social, cnpj, email_contato)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [nome_fantasia, razao_social, cnpj, email_contato]
        );

        res.status(201).json({
            message: 'Organização Parceira cadastrada com sucesso!',
            organizacao: novaOrganizacao.rows[0]
        });

    } catch (error) {
        console.error('Erro ao cadastrar organização:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Função para LISTAR TODAS as organizações
exports.listarOrganizacoes = async (req, res) => {
    // Qualquer usuário autenticado pode ver a lista de parceiros
    try {
        const { rows } = await db.query('SELECT * FROM organizacoes_parceiras ORDER BY nome_fantasia');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar organizações:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para BUSCAR UMA organização pelo ID
exports.buscarOrganizacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('SELECT * FROM organizacoes_parceiras WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Organização não encontrada.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar organização:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para ATUALIZAR uma organização
exports.atualizarOrganizacao = async (req, res) => {
    // Apenas Administradores
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    const { id } = req.params;
    const { nome_fantasia, razao_social, cnpj, email_contato } = req.body;

    if (!nome_fantasia || !razao_social || !cnpj || !email_contato) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const orgAtualizada = await db.query(
            `UPDATE organizacoes_parceiras 
             SET nome_fantasia = $1, razao_social = $2, cnpj = $3, email_contato = $4 
             WHERE id = $5 RETURNING *`,
            [nome_fantasia, razao_social, cnpj, email_contato, id]
        );

        if (orgAtualizada.rowCount === 0) {
            return res.status(404).json({ error: 'Organização não encontrada.' });
        }

        res.status(200).json({
            message: 'Organização atualizada com sucesso!',
            organizacao: orgAtualizada.rows[0]
        });
    } catch (error) {
        console.error('Erro ao atualizar organização:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Função para DELETAR uma organização
exports.deletarOrganizacao = async (req, res) => {
    // Apenas Administradores
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }

    const { id } = req.params;
    try {
        const resultado = await db.query('DELETE FROM organizacoes_parceiras WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Organização não encontrada.' });
        }
        // Graças à regra ON DELETE CASCADE no schema, 
        // todos os serviços associados a esta OP também serão removidos.
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar organização:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};