// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Pega o token do cabeçalho 'Authorization'
    const authHeader = req.header('Authorization');

    // 2. Verifica se o cabeçalho existe
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
    }

    // O formato do token é "Bearer <token>". Precisamos extrair apenas o token.
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Formato de token inválido.' });
    }

    try {
        // 3. Verifica se o token é válido usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Adiciona as informações do usuário (que estavam no token) ao objeto 'req'
        // Assim, as rotas protegidas saberão quem está fazendo a requisição
        req.usuario = decoded;

        // 5. Chama a próxima função no fluxo da requisição (o controlador)
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};