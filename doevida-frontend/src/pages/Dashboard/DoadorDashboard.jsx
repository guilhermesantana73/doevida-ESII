import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [doacoes, setDoacoes] = useState([]);
  const [proximaDoacao, setProximaDoacao] = useState(null); // Novo estado para a próxima doação
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoacoes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setError('Você precisa estar logado.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/doacoes/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Falha ao buscar os dados.');

        const data = await response.json();
        setDoacoes(data);

        const agendadas = data
          .filter(d => d.status === 'AGENDADA' && new Date(d.data_agendamento) > new Date())
          .sort((a, b) => new Date(a.data_agendamento) - new Date(b.data_agendamento));

        if (agendadas.length > 0) {
          setProximaDoacao(agendadas[0]); // A primeira da lista ordenada é a próxima
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoacoes();
  }, []);

  if (loading) return <p className="dashboard-content">Carregando...</p>;
  if (error) return <p className="dashboard-content" style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="page-container">
      <div className="cabecalho-conteudo">
        <h1 className="titulo-principal">Painel do Doador</h1>
      </div>

      <div className="action-grid-doador">
        <Link to="/triagem" className="action-button-doador">
          <i className="fas fa-calendar-plus"></i>
          <span>Agendar Doação</span>
        </Link>
        <Link to="/historico" className="action-button-doador">
          <i className="fas fa-history"></i>
          <span>Histórico de Doações</span>
        </Link>
        <Link to="/beneficios" className="action-button-doador">
          <i className="fas fa-gift"></i>
          <span>Benefícios</span>
        </Link>
        <Link to="/informacoes" className="action-button-doador">
          <i className="fas fa-info-circle"></i>
          <span>Informações</span>
        </Link>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Próxima Doação</h2>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Notificações</h2>
      </div>
    </div>
  );
}

export default Dashboard;