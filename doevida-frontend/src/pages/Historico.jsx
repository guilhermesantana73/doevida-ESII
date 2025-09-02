import React, { useState, useEffect } from 'react';
import '../styles/historico.css'; // Um novo CSS para esta página

function Historico() {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistorico = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Sessão inválida. Por favor, faça o login novamente.');
        setLoading(false);
        return;
      }

      try {
        // Usamos o mesmo endpoint que já usamos no dashboard
        const response = await fetch('http://localhost:3000/api/doacoes/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Não foi possível carregar seu histórico.');
        }

        const data = await response.json();
        setDoacoes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  if (loading) return <div className="historico-container"><p>Carregando histórico...</p></div>;
  if (error) return <div className="historico-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="historico-container">
      <h2>Meu Histórico de Doações</h2>
      {doacoes.length === 0 ? (
        <p>Você ainda não possui doações no seu histórico.</p>
      ) : (
        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Data do Agendamento</th>
              <th>Local</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {doacoes.map(doacao => (
              <tr key={doacao.id}>
                <td>{new Date(doacao.data_agendamento).toLocaleString('pt-BR')}</td>
                <td>{doacao.local_doacao}</td>
                <td>
                  <span className={`status status-${doacao.status.toLowerCase()}`}>{doacao.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Historico;