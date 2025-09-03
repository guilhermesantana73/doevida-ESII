import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MonitorarCampanha() {
  const { id } = useParams(); // Pega o ID da campanha da URL
  const [campanha, setCampanha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampanha = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/api/campanhas/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Campanha não encontrada.');
        setCampanha(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanha();
  }, [id]);

  if (loading) return <div className="page-container"><p>Carregando dados da campanha...</p></div>;
  if (error) return <div className="page-container"><p className="error-message">{error}</p></div>;
  if (!campanha) return <div className="page-container"><p>Campanha não encontrada.</p></div>;

  // Lógica de placeholder para as estatísticas
  const doacoesConcluidas = 80; // Exemplo fixo
  const percentualMeta = campanha.meta_doacoes ? Math.round((doacoesConcluidas / campanha.meta_doacoes) * 100) : 0;

  return (
    <div className="page-container">
      <div className="cabecalho-campanha">
        <h1 className="titulo-campanha">{campanha.titulo}</h1>
        <div className="acoes-rapidas">
          <Link to="/gestor/notificar" className="botao-acao">
            <i className="fas fa-bell"></i> Notificar Doadores
          </Link>
          <Link to={`/gestor/campanhas/${campanha.id}/agenda`} className="botao-acao">
            <i className="fas fa-calendar-alt"></i> Agenda
          </Link>
        </div>
      </div>

      <div className="area-campanha">
        <div className="grafico-container">
          {/* Por enquanto, exibimos apenas o número, sem o gráfico complexo */}
          <div className="percentual">{percentualMeta}%</div>
          <p className="texto-meta">Meta atingida</p>
        </div>

        <div className="informacoes-campanha">
          <ul className="lista-informacoes">
            <li className="item-informacao">
              <span className="rotulo">Período da campanha:</span>
              <span className="valor">{new Date(campanha.data_inicio).toLocaleDateString('pt-BR')} a {new Date(campanha.data_termino).toLocaleDateString('pt-BR')}</span>
            </li>
            <li className="item-informacao">
              <span className="rotulo">Meta da campanha:</span>
              <span className="valor">{campanha.meta_doacoes} doações</span>
            </li>
            {/* Dados de placeholder para estatísticas que virão do backend no futuro */}
            <li className="item-informacao"><span className="rotulo">Doações concluídas:</span><span className="valor">{doacoesConcluidas} doações</span></li>
            <li className="item-informacao"><span className="rotulo">Ausências/cancelamentos:</span><span className="valor">20 faltas</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MonitorarCampanha;