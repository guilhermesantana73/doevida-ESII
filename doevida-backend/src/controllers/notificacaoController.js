exports.enviarNotificacao = async (req, res) => {
    // Apenas Gestores podem enviar notificações
    if (req.usuario.tipo !== 'GESTOR') {
        return res.status(403).json({ error: 'Acesso negado.' });
    }

    const criterios = req.body;

    // Em um app real, aqui entraria a lógica para buscar os doadores
    // no banco com base nos critérios e enviar e-mails/notificações.

    // Para nosso aprendizado, vamos apenas simular.
    console.log('>>> SIMULAÇÃO DE ENVIO DE NOTIFICAÇÃO <<<');
    console.log('Notificação enviada pelo Gestor ID:', req.usuario.id);
    console.log('Critérios recebidos:', criterios);
    console.log('============================================');

    res.status(200).json({ message: 'Simulação de notificação enviada com sucesso!' });
};