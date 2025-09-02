import React from "react";
import "../styles/login.css"; // importa seu CSS
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  // Funções do JS original
  const handleLogin = () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email && senha) {
      alert("Login realizado com sucesso! Redirecionando...");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const handleCadastro = () => {
    alert("Redirecionando para a página de cadastro...");
  };

  return (
    <div>
      {/* 🔝 Cabeçalho Superior */}
      <header className="cabecalho">
        <div className="logotipo">
          D<span className="gota-logo"></span>EVIDA
        </div>
      </header>

      {/* 🧱 Área de Login */}
      <main className="container-login">
        <div className="cartao-login">
          {/* 🔠 Título */}
          <h1 className="titulo-login">Login</h1>

          {/* 📨 Campo de E-mail */}
          <div className="grupo-entrada">
            <label htmlFor="email">E-mail</label>
            <div className="container-icone">
              <i className="fas fa-envelope icone-entrada"></i>
              <input
                type="email"
                id="email"
                className="campo-entrada"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          {/* 🔒 Campo de Senha */}
          <div className="grupo-entrada">
            <label htmlFor="senha">Senha</label>
            <div className="container-icone">
              <i className="fas fa-lock icone-entrada"></i>
              <input
                type="password"
                id="senha"
                className="campo-entrada"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {/* 🔘 Botão Entrar */}
          <button type="button" className="botao-entrar" onClick={handleLogin}>
            Entrar
          </button>

          {/* 🆕 Link de Cadastro */}
          <div className="container-cadastro">
            <p className="texto-cadastro">Ainda não tem uma conta?</p>
            <button className="botao-cadastro" onClick={handleCadastro}>
              Cadastre-se
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="rodape">
        <p>DOEVIDA - Plataforma de doação de sangue</p>
        <div className="links-rodape">
          <a href="#">Sobre nós</a>
          <a href="#">Contato</a>
          <a href="#">Termos de uso</a>
          <a href="#">Política de privacidade</a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
