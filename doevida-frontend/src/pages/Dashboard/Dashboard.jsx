import React from 'react';
import './dashboard.css'; // Vamos criar este CSS também

function Dashboard() {
  const handleLogout = () => {
    // Lógica de logout virá aqui no futuro
    alert('Logout realizado!');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DOEVIDA</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>
      <main className="dashboard-content">
        <h2>Bem-vindo ao seu Painel!</h2>
        <p>Aqui você poderá gerenciar suas doações e ver seu histórico.</p>
      </main>
    </div>
  );
}

export default Dashboard;