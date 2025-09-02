// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/login.css'; // Supondo que o estilo do cabeçalho está aqui

function Layout({ children }) {
  return (
    <div>
      <Header />
      {/* 'children' será o conteúdo da página específica (Login, Cadastro, etc.) */}
      <main>{children}</main> 
      <Footer />
    </div>
  );
}
export default Layout;