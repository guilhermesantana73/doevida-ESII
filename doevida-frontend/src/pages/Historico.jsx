import React, { useState, useEffect } from 'react';

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
        // Uo mesmo endpoint do dashboard
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
    <div className="page-container">
      <div className="cabecalho-conteudo">
        <h1 className="titulo-principal">Meu Histórico de Doações</h1>
      </div>

      {loading && <p>Carregando histórico...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="lista-cards">
          {doacoes.length > 0 ? (
            doacoes.map(doacao => (
              <div key={doacao.id} className="cartao-item">
                <div className="cartao-info-principal">
                  <span className="cartao-titulo">{doacao.local_doacao}</span>
                  <span className="cartao-subtitulo">
                    Agendado para: {new Date(doacao.data_agendamento).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="cartao-info-secundaria">
                  <span className={`status status-${doacao.status.toLowerCase()}`}>{doacao.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Você ainda não possui doações no seu histórico.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Historico;