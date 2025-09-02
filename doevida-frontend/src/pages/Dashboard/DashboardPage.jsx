import React from 'react';
import { jwtDecode } from 'jwt-decode'; // Importe a função
import DoadorDashboard from './DoadorDashboard';
import GestorDashboard from './GestorDashboard';
import AdminDashboard from './AdminDashboard';

function DashboardPage() {
  const token = localStorage.getItem('token');

  // Se não houver token, não renderiza nada (a RotaProtegida já deve ter redirecionado)
  if (!token) {
    return null;
  }

  // Decodifica o token para extrair as informações (o payload)
  const userData = jwtDecode(token);
  const userType = userData.tipo; // Lembre-se que no backend definimos o campo como 'tipo'

  // Renderiza o dashboard correto com base no tipo do usuário
  switch (userType) {
    case 'DOADOR':
      return <DoadorDashboard />;
    case 'GESTOR':
      return <GestorDashboard />;
    case 'ADMINISTRADOR':
      return <AdminDashboard />;
    default:
      // Se o tipo de usuário for desconhecido, mostra uma mensagem de erro
      return <div className="dashboard-content"><h1>Perfil de usuário inválido.</h1></div>;
  }
}

export default DashboardPage;