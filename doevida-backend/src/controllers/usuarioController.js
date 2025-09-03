const db = require('../config/database');
const bcrypt = require('bcryptjs');

exports.cadastrarDoador = async (req, res) => {
    // 1. Extrair dados do corpo da requisição (o que o frontend envia)
    const { nome, email, cpf, senha, tipo_sanguineo } = req.body;

    // 2. Validação simples dos dados
    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, email, cpf e senha.' });
    }

    try {
        // 3. Verificar se o email ou CPF já existem (RN02)
        const checkUser = await db.query('SELECT * FROM usuarios WHERE email = $1 OR cpf = $2', [email, cpf]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ error: 'Email ou CPF já cadastrado.' }); // 409 Conflict
        }

        // 4. Criptografar a senha
        const salt = await bcrypt.genSalt(10); // Gera uma "dificuldade" para o hash
        const senhaHash = await bcrypt.hash(senha, salt);

        // 5. Salvar o novo usuário no banco de dados
        const novoUsuario = await db.query(
            `INSERT INTO usuarios (nome, email, cpf, senha_hash, tipo_usuario, tipo_sanguineo, status) 
             VALUES ($1, $2, $3, $4, 'DOADOR', $5, 'ATIVO') RETURNING id, nome, email, tipo_usuario`,
            [nome, email, cpf, senhaHash, tipo_sanguineo]
        );

        // 6. Enviar uma resposta de sucesso
        res.status(201).json({
            message: 'Doador cadastrado com sucesso!',
            usuario: novoUsuario.rows[0]
        });

    } catch (error) {
        console.error('Erro ao cadastrar doador:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// src/controllers/usuarioController.js
// ... (imports do 'db' e 'bcrypt' já existem) ...
const jwt = require('jsonwebtoken'); // Adicione este import

// ... (sua função cadastrarDoador fica aqui) ...

// Nova função de login
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
        // 1. Procurar o usuário pelo email
        const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const usuario = rows[0];

        if (!usuario) {
            // Se o usuário não for encontrado, retornamos um erro genérico por segurança
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 2. Comparar a senha enviada com o hash salvo no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // 3. Se a senha estiver correta, gerar o token JWT (o crachá)
        const payload = {
            id: usuario.id,
            tipo: usuario.tipo_usuario
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // O crachá expira em 1 hora
        );

        // 4. Enviar o token para o cliente
        res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Nova função para buscar o perfil
exports.getPerfilUsuario = async (req, res) => {
    try {
        // O ID do usuário foi adicionado ao 'req' pelo nosso middleware
        const userId = req.usuario.id;

        // Buscamos o usuário no banco para garantir que os dados estão atualizados
        const { rows } = await db.query('SELECT id, nome, email, cpf, tipo_usuario, tipo_sanguineo FROM usuarios WHERE id = $1', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.listarTodosUsuarios = async (req, res) => {
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
    try {
        // Seleciona todos os usuários, exceto a própria senha hash
        const { rows } = await db.query('SELECT id, nome, email, cpf, status, tipo_usuario, criado_em FROM usuarios ORDER BY nome');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

exports.atualizarStatusUsuario = async (req, res) => {
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { id } = req.params; // ID do usuário a ser modificado
    const { status } = req.body; // Novo status (ex: 'SUSPENSO', 'ATIVO')

    // Validação simples
    if (!status || !['ATIVO', 'INATIVO', 'SUSPENSO'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido.' });
    }

    try {
        const resultado = await db.query(
            'UPDATE usuarios SET status = $1 WHERE id = $2 RETURNING id, status',
            [status, id]
        );
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar status do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


exports.deletarUsuario = async (req, res) => {
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { id } = req.params;

    if (Number(id) === req.usuario.id) {
        return res.status(403).json({ error: 'Você não pode deletar sua própria conta de administrador.' });
    }

    try {
        // Passo 1: Buscar o usuário que será deletado para saber seu tipo
        const { rows: userRows } = await db.query('SELECT tipo_usuario FROM usuarios WHERE id = $1', [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        const userToDelete = userRows[0];

        // Passo 2: Se o usuário for um GESTOR, verificar se ele tem campanhas
        if (userToDelete.tipo_usuario === 'GESTOR') {
            const { rows: campanhaRows } = await db.query('SELECT id FROM campanhas WHERE fk_gestor_id = $1', [id]);
            if (campanhaRows.length > 0) {
                // Se ele tiver campanhas, retorna um erro amigável em vez de quebrar
                return res.status(409).json({ error: 'Este gestor não pode ser removido pois ainda possui campanhas associadas.' }); // 409 Conflict
            }
        }
        
        // Passo 3: Se todas as verificações passarem, deletar o usuário
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(204).send();

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};exports.deletarUsuario = async (req, res) => {
    if (req.usuario.tipo !== 'ADMINISTRADOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const { id } = req.params; // ID do usuário a ser deletado

    // Regra de negócio: Admin não pode deletar a própria conta
    // Convertemos para Number para garantir a comparação correta
    if (Number(id) === req.usuario.id) {
        return res.status(403).json({ error: 'Você não pode deletar sua própria conta de administrador.' });
    }

    try {
        const resultado = await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(204).send(); // Sucesso, sem conteúdo para retornar
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
