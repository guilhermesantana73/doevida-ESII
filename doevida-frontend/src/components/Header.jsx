// src/components/Header.jsx - VERSÃO FINAL INTELIGENTE
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Verifica se o usuário está logado

  const handleHomeClick = () => {
    // A lógica do botão 'home' continua a mesma
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    // Nova função para fazer logout
    localStorage.removeItem('token'); // Remove o token
    navigate('/login'); // Envia o usuário para a página de login
  };

  return (
    <header className="cabecalho">
      <button onClick={handleHomeClick} className="home-button" title="Página Inicial">
        <i className="fas fa-home"></i>
      </button>
      
      <div className="logotipo">
        <Link to="/login" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>
          D<span className="gota-logo"></span>EVIDA
        </Link>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL: Mostra o botão 'Sair' APENAS se houver um token */}
      {token && (
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      )}
    </header>
  );
}

export default Header;