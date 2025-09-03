// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Não precisamos mais importar CSS específico aqui, pois o global.css já foi importado no main.jsx

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // NOSSA LÓGICA DE LOGIN QUE JÁ FUNCIONA PERMANECE EXATAMENTE A MESMA
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Falha no login.");
      }
      
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'; // Usamos window.location para forçar a recarga e o Header se atualizar

    } catch (err) {
      setError(err.message);
    }
  };

  // A MUDANÇA ESTÁ TODA AQUI NO JSX ABAIXO, USANDO AS CLASSES DO NOVO DESIGN
  return (
    <div className="container-login">
      <div className="cartao-login">
        <h1 className="titulo-login">Login</h1>
        {error && <p style={{ color: '#8a0303', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="grupo-entrada">
            <label htmlFor="email">E-mail</label>
            <div className="container-icone">
              <i className="fas fa-envelope icone-entrada"></i>
              <input
                type="email"
                id="email"
                className="campo-entrada"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="botao-entrar">Entrar</button>
        </form>
        
        <div className="container-cadastro">
          <p className="texto-cadastro">Ainda não tem uma conta?</p>
          <button onClick={() => navigate('/cadastro')} className="botao-cadastro">Cadastre-se</button>
        </div>
      </div>
    </div>
  );
}

export default Login;