const db = require('../config/database');

exports.agendarDoacao = async (req, res) => {
    // Autorização: Apenas Doadores podem agendar
    if (req.usuario.tipo !== 'DOADOR') {
        return res.status(403).json({ error: 'Acesso negado. Apenas doadores podem agendar doações.' });
    }

    const doadorId = req.usuario.id;
    const { data_agendamento, local_doacao, fk_campanha_id } = req.body;

    if (!data_agendamento || !local_doacao) {
        return res.status(400).json({ error: 'Data do agendamento e local são obrigatórios.' });
    }

    try {
        // Busca a data da última doação do usuário.
        const { rows: usuarioRows } = await db.query('SELECT data_ultima_doacao FROM usuarios WHERE id = $1', [doadorId]);
        const dataUltimaDoacao = usuarioRows[0].data_ultima_doacao;

        if (dataUltimaDoacao) {
            const dataAtual = new Date();
            const ultimaDoacao = new Date(dataUltimaDoacao);
            
            // Calcula a diferença de dias.
            // A OMS recomenda intervalos diferentes para homens e mulheres.
            // Para simplificar aqui, vamos usar um intervalo fixo de 90 dias
            const intervaloMinimoDias = 90; 
            const diffTime = Math.abs(dataAtual - ultimaDoacao);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Bloquea se o intervalo for menor que o permitido.
            if (diffDays < intervaloMinimoDias) {
                const diasRestantes = intervaloMinimoDias - diffDays;
                return res.status(403).json({ 
                    error: `Você precisa aguardar mais ${diasRestantes} dia(s) para poder doar novamente.` 
                });
            }
        }

        // Se passar na regra, agendar a nova doação.
        const novaDoacao = await db.query(
            `INSERT INTO doacoes (fk_doador_id, fk_campanha_id, data_agendamento, local_doacao, status)
             VALUES ($1, $2, $3, $4, 'AGENDADA') RETURNING *`,
            [doadorId, fk_campanha_id, data_agendamento, local_doacao]
        );

        res.status(201).json({
            message: 'Doação agendada com sucesso!',
            doacao: novaDoacao.rows[0]
        });

    } catch (error) {
        console.error('Erro ao agendar doação:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Função para LISTAR as doações do usuário logado
exports.listarMinhasDoacoes = async (req, res) => {
    // O ID do doador vem do token, que foi validado pelo middleware
    const doadorId = req.usuario.id;

    try {
        // Seleciona todas as doações pertencentes ao doador logado
        // Ordenado pela data de agendamento para mostrar as mais recentes/próximas primeiro
        const { rows } = await db.query(
            'SELECT * FROM doacoes WHERE fk_doador_id = $1 ORDER BY data_agendamento DESC',
            [doadorId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar doações:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Nova função para BUSCAR UMA doação específica
exports.buscarDoacaoPorId = async (req, res) => {
    const { id: doacaoId } = req.params; // ID da doação vindo da URL
    const doadorId = req.usuario.id;    // ID do doador vindo do token

    try {
        // A consulta SQL aqui é crucial para a segurança:
        // Ela busca a doação pelo seu ID E TAMBÉM verifica se ela pertence ao doador logado.
        // Isso impede que um usuário veja os detalhes da doação de outro.
        const { rows } = await db.query(
            'SELECT * FROM doacoes WHERE id = $1 AND fk_doador_id = $2',
            [doacaoId, doadorId]
        );

        if (rows.length === 0) {
            // Retorno de 404 se a doação não existe OU não pertence ao usuário.
            // Não damos detalhes por questões de segurança.
            return res.status(404).json({ error: 'Agendamento de doação não encontrado.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar doação:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


// Nova função para CANCELAR um agendamento
exports.cancelarDoacao = async (req, res) => {
    const { id: doacaoId } = req.params; // ID da doação vindo da URL
    const doadorId = req.usuario.id;    // ID do doador vindo do token

    try {
        // Busca a doação para garantir que ela pertence ao usuário e está agendada
        const { rows } = await db.query(
            "SELECT * FROM doacoes WHERE id = $1 AND fk_doador_id = $2 AND status = 'AGENDADA'",
            [doacaoId, doadorId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado ou já processado.' });
        }
        
        const doacao = rows[0];

        // Verificação se o cancelamento está dentro do prazo permitido
        const agora = new Date();
        const dataAgendamento = new Date(doacao.data_agendamento);
        const diffHoras = (dataAgendamento - agora) / (1000 * 60 * 60);

        if (diffHoras < 24) {
            return res.status(403).json({ 
                error: 'Cancelamento não permitido. O prazo para cancelar é de até 24 horas antes do agendamento.' 
            });
        }

        // Se a regra passar, atualiza o status para 'CANCELADA'
        const doacaoCancelada = await db.query(
            "UPDATE doacoes SET status = 'CANCELADA' WHERE id = $1 RETURNING *",
            [doacaoId]
        );

        res.status(200).json({
            message: 'Agendamento cancelado com sucesso!',
            doacao: doacaoCancelada.rows[0]
        });

    } catch (error) {
        console.error('Erro ao cancelar doação:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};