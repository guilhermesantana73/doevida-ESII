// server.js
const express = require('express');
const cors = require('cors');
const db = require('./src/config/database');
require('dotenv').config();

// Importa o novo arquivo de rotas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const campanhasRoutes = require('./src/routes/campanhasRoutes');
const doacoesRoutes = require('./src/routes/doacoesRoutes');
const organizacoesRoutes = require('./src/routes/organizacoesRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Rota principal de teste
app.get('/', (req, res) => {
    res.send('<h1>Backend Doevida no ar!</h1>');
});

// Diz ao Express para usar o arquivo de rotas de usuários
// Todas as rotas definidas em usuariosRoutes.js terão o prefixo /api/usuarios
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/campanhas', campanhasRoutes);
app.use('/api/doacoes', doacoesRoutes);
app.use('/api/organizacoes', organizacoesRoutes);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
