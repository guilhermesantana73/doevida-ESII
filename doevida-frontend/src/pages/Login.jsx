// Login.jsx - VERSÃO ATUALIZADA COM API
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import "../styles/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 2. Inicialize o hook de navegação

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha no login.");
      }

      // --- INÍCIO DAS NOVAS AÇÕES ---
      // 3. Salve o token no armazenamento local do navegador
      localStorage.setItem('token', data.token);

      // 4. Redirecione o usuário para a página de dashboard
      navigate('/dashboard');
      // --- FIM DAS NOVAS AÇÕES ---

    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      {/* O seu JSX (HTML) permanece quase o mesmo, com pequenas mudanças */}

      <main className="container-login">
        {/* Usamos a tag <form> para melhor semântica e acessibilidade */}
        <form className="cartao-login" onSubmit={handleLogin}>
          <h1 className="titulo-login">Login</h1>

          {/* Exibe a mensagem de erro, se houver */}
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

          <div className="grupo-entrada">
            <label htmlFor="email">E-mail</label>
            <div className="container-icone">
              <i className="fas fa-envelope icone-entrada"></i>
              <input
                type="email"
                id="email"
                className="campo-entrada"
                placeholder="Digite seu e-mail"
                // Conecta o campo ao estado 'email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grupo-entrada">
            <label htmlFor="senha">Senha</label>
            <div className="container-icone">
              <i className="fas fa-lock icone-entrada"></i>
              <input
                type="password"
                id="senha"
                className="campo-entrada"
                placeholder="Digite sua senha"
                // Conecta o campo ao estado 'senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {/* O botão agora é do tipo 'submit' dentro do formulário */}
          <button type="submit" className="botao-entrar">
            Entrar
          </button>

          <div className="container-cadastro">
            <p className="texto-cadastro">Ainda não tem uma conta?</p>
            {/* Modifique este botão */}
            <button type="button" className="botao-cadastro" onClick={() => navigate('/cadastro')}>
            Cadastre-se
            </button>
          </div>
        </form>
      </main>
      
    </div>
  );
}

export default Login;