import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './doadorDashboard.css';

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

        // --- LÓGICA PARA ACHAR A PRÓXIMA DOAÇÃO ---
        const agendadas = data
          .filter(d => d.status === 'AGENDADA' && new Date(d.data_agendamento) > new Date())
          .sort((a, b) => new Date(a.data_agendamento) - new Date(b.data_agendamento));

        if (agendadas.length > 0) {
          setProximaDoacao(agendadas[0]); // A primeira da lista ordenada é a próxima
        }
        // --- FIM DA LÓGICA ---
        
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
    <div className="dashboard-page">
      <section className="dashboard-section">
        <h2>Página Inicial - Doador</h2>
        <div className="action-grid">
          <Link to="/triagem" className="action-button">
            <i className="fas fa-calendar-plus"></i>
            <span>Agendar doação</span>
          </Link>
          <Link to="/historico" className="action-button">
            <i className="fas fa-history"></i>
            <span>Histórico de doações</span>
          </Link>
          <Link to="/beneficios" className="action-button">
            <i className="fas fa-gift"></i>
            <span>Benefícios ao doador</span>
          </Link>
          <Link to="/informacoes" className="action-button">
            <i className="fas fa-info-circle"></i>
            <span>Informações</span>
          </Link>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Próxima doação</h2>
        {proximaDoacao ? (
          <div className="info-card">
            <p><strong>Local:</strong> {proximaDoacao.local_doacao}</p>
            <p><strong>Data:</strong> {new Date(proximaDoacao.data_agendamento).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
          </div>
        ) : (
          <div className="info-card">
            <p>Nenhuma doação agendada no momento.</p>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Notificações</h2>
        {/* Por enquanto, estas são notificações fixas (placeholders) */}
        <div className="info-card">
          <p>Tá chegando a hora! Você tem 1 doação a fazer no dia dd/mm/aaaa às hh:mm</p>
        </div>
        <div className="info-card">
          <p>Ei, estamos precisando de doações de sangue do tipo X. Agende a sua!</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;