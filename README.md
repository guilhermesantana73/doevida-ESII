Doevida 🩸

Conectando doadores, salvando vidas.

📌 Status: Em Desenvolvimento 🚧

Sobre o Projeto

Doar sangue salva vidas. Simples assim. No entanto, os hemocentros no Brasil frequentemente enfrentam dificuldades para manter seus estoques em níveis seguros. A falta de informação e a complexidade no processo de agendamento podem desestimular novos doadores.

Criamos o Doevida para atacar esse problema de frente. Nossa plataforma web foi projetada para ser a ponte entre quem quer ajudar e quem precisa de ajuda, simplificando o processo de doação de sangue através de funcionalidades como:

    Agendamento online rápido e intuitivo.

    Gamificação e benefícios para incentivar a doação regular.

    Ferramentas poderosas para gestores de campanhas monitorarem seus resultados em tempo real.

Este projeto foi desenvolvido como parte da disciplina de Engenharia de Software II, unindo conceitos de desenvolvimento full-stack para criar uma solução de impacto social.

✨ Funcionalidades Principais

O sistema é construído em torno de três perfis de usuário principais:

🩸 Para Doadores:

    Cadastro e Login seguros com autenticação via JWT.

    Painel de controle (Dashboard) para visualizar a próxima doação agendada.

    Fluxo de agendamento com triagem rápida online para verificar a aptidão básica.

    Histórico completo de todas as doações realizadas ou agendadas.

    Visualização de benefícios oferecidos por organizações parceiras.

👥 Para Gestores de Campanhas:

    Painel de controle para visualizar e gerenciar todas as suas campanhas.

    Criação, edição e remoção de campanhas de doação.

    Visualização da agenda de doações para uma campanha específica.

    Funcionalidade para enviar notificações para grupos de doadores.

⚙️ Para Administradores:

    Painel de controle para visualização e gerenciamento de todos os usuários do sistema.

    Funcionalidade para suspender, reativar ou remover usuários.

    Gerenciamento completo de Organizações Parceiras e os serviços que elas oferecem.

🔧 Tecnologias Utilizadas

Este projeto é uma aplicação full-stack que utiliza tecnologias modernas e populares no mercado.

Frontend:

    React.js (com Hooks)

    Vite como ambiente de desenvolvimento

    React Router para navegação

    Tailwind CSS para estilização

    fetch API para comunicação com o backend

Backend:

    Node.js

    Express.js como framework para a API RESTful

    PostgreSQL como banco de dados relacional

    JWT (JSON Web Tokens) para autenticação

    bcrypt.js para hashing de senhas

🚀 Como Rodar o Projeto

Para rodar este projeto localmente, você precisará ter o Git, Node.js (versão LTS) e o PostgreSQL instalados.

    Clone o repositório:
    Bash

git clone https://github.com/guilhermesantana73/doevida-ESII.git
cd doevida-ESII

Configure o Backend:

    Navegue até a pasta do backend: cd doevida-backend

    Crie um arquivo .env baseado no .env.example (se houver um) ou com as seguintes variáveis, preenchendo com suas credenciais do PostgreSQL:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=sua_senha_secreta
    DB_NAME=doevida
    JWT_SECRET=sua_chave_jwt_super_secreta

    Instale as dependências: npm install

Configure o Frontend:

    Navegue até a pasta do frontend: cd ../doevida-frontend

    Instale as dependências: npm install

Configure o Banco de Dados:

    Abra o pgAdmin ou psql e crie um novo banco de dados chamado doevida.

    Execute o script de criação das tabelas (doevida-schema.sql) e, em seguida, o script para popular o banco com dados de teste.

Inicie a Aplicação:
Você precisará de dois terminais abertos.

    No Terminal 1 (Backend):
    Bash

cd doevida-backend
node server.js 
# O servidor estará rodando em http://localhost:3000

No Terminal 2 (Frontend):
Bash

        cd doevida-frontend
        npm run dev
        # A aplicação estará acessível em http://localhost:5173 (ou outra porta indicada)

👨‍💻 Autores

    Guilherme Almeida Santana - guilhermesantana73

    Rodrigo Santos França - Ruifranca8
