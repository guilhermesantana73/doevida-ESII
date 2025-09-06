import React from 'react';
import { Navigate } from 'react-router-dom';

function RotaProtegida({ children }) {
  // Se Busca o token no armazenamento local do navegador.
  const token = localStorage.getItem('token');

  // É verificado se o token existe.
  if (!token) {
    // Se NÃO houver token, não tem renderização
    // Em vez disso, usamos o componente <Navigate> do react-router-dom
    // para redirecionar o usuário para a página de login.
    console.log("Acesso negado. Redirecionando para /login.");
    return <Navigate to="/login" replace />;
  }

  // Se o token existir, o componente simplesmente renderiza os filhos que recebeu.
  // (Neste caso, será a página do Dashboard).
  return children;
}

export default RotaProtegida;