import React from 'react';
import { Navigate } from 'react-router-dom';

// Este componente é um "Wrapper". Ele recebe outros componentes como 'children'.
// A responsabilidade dele é decidir se renderiza os 'children' ou se redireciona.
function RotaProtegida({ children }) {
  // 1. Buscamos o token no armazenamento local do navegador.
  const token = localStorage.getItem('token');

  // 2. Verificamos se o token existe.
  if (!token) {
    // Se NÃO houver token, nós não renderizamos os 'children'.
    // Em vez disso, usamos o componente <Navigate> do react-router-dom
    // para redirecionar o usuário para a página de login.
    console.log("Acesso negado. Redirecionando para /login.");
    return <Navigate to="/login" replace />;
  }

  // 3. Se o token existir, o componente simplesmente renderiza os filhos que recebeu.
  // (Neste caso, será a página do Dashboard).
  return children;
}

export default RotaProtegida;