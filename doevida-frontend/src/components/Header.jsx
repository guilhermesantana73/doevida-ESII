import React from 'react';
import { useNavigate } from 'react-router-dom';

import logoBranca from '../assets/whiteLogo.svg'; 

function Header() {
  const navigate = useNavigate();

  // Lógica de autenticação lendo diretamente do localStorage
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token; // Converte para true/false

  const handleHomeClick = () => {
    // Leva para o dashboard se logado, ou para o login se não estiver
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Força um recarregamento completo para limpar qualquer estado da aplicação
    window.location.href = '/login'; 
  };

  return (
    <header className="cabecalho">
      <div onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <img src={logoBranca} alt="Doevida Logo" className="header-logo" />
      </div>

      {isAuthenticated && (
        <button onClick={handleLogout} className="header-logout-button">
          <i className="fas fa-sign-out-alt"></i>
          <span>Sair</span>
        </button>
      )}
    </header>
  );
}

export default Header;