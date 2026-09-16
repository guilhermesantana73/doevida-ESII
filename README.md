# 🩸 Doevida

**Plataforma web que conecta doadores de sangue com hemocentros, simplificando agendamentos e aumentando taxas de doação.**

---

## 📊 Impacto

Hemocentros brasileiros perdem doadores porque o processo é complicado. Doevida resolve isso com:
- **Agendamento 10x mais rápido** que os sistemas tradicionais  
- **Triagem online** que reduz tempo no hemocentro
- **Painel em tempo real** para gestores acompanharem campanhas
- **Gamificação** para estimular doações regulares

---

## 🛠️ Stack Tecnológico

**Frontend:** React 19 | Vite | TailwindCSS | React Router  
**Backend:** Node.js | Express | PostgreSQL | JWT + bcrypt  
**Arquitetura:** REST API | Monorepo  

---

## 🎯 Três Perfis de Usuário

| Doador | Gestor de Campanha | Admin |
|--------|-------------------|-------|
| Dashboard pessoal | Gerenciar campanhas | Painel de controle geral |
| Agendar doação | Monitorar agendamentos | Gerenciar usuários |
| Histórico de doações | Enviar notificações | Configurar organizações |
| Ver benefícios parceiros | Relatórios em tempo real | Suspender/reativar contas |

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ | PostgreSQL 12+ | Git

### Setup (3 passos)

**1. Clone e instale**
```bash
git clone https://github.com/guilhermesantana73/doevida-ESII.git
cd doevida-ESII

# Backend
cd doevida-backend && npm install
cd ../doevida-frontend && npm install
```

**2. Configure variáveis (.env)**
```env
# Backend (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=seu_password
DB_NAME=doevida
JWT_SECRET=seu_secret_key
```

**3. Rode**
```bash
# Terminal 1: Backend
cd doevida-backend && npm start
# http://localhost:3000

# Terminal 2: Frontend  
cd doevida-frontend && npm run dev
# http://localhost:5173
```

---

## 🎓 O que Aprendemos

- ✅ **Full-stack development** com React + Express + PostgreSQL
- ✅ **Autenticação JWT** com token refresh e middleware
- ✅ **Design de banco relacional** com múltiplos perfis de usuário
- ✅ **Componentes reutilizáveis** em React com estado compartilhado
- ✅ **API RESTful** seguindo boas práticas
- ✅ **Engenharia de software** — versionamento, documentação, design patterns

---

## 📁 Estrutura

```
doevida-ESII/
├── doevida-backend/          # Node.js + Express + PostgreSQL
│   ├── src/                  # Rotas, controllers, models
│   └── server.js
├── doevida-frontend/         # React + Vite + TailwindCSS
│   ├── src/                  # Componentes, páginas, hooks
│   └── vite.config.js
└── README.md
```

---

## 🔐 Segurança

- Senhas com **bcrypt.js** (salted hashing)
- **JWT** para autenticação stateless
- **CORS** configurado para APIs seguras
- Validação de entrada no backend

---

## 👨‍💻 Autores

**Guilherme Almeida Santana** · [GitHub](https://github.com/guilhermesantana73)  
**Rodrigo Santos França** · [GitHub](https://github.com/Ruifranca8)

---

## 📝 Licença

ISC

---

## 📌 Status

🚧 Em Desenvolvimento — Recursos em progresso: testes automatizados, notificações via email, painel analytics avançado
