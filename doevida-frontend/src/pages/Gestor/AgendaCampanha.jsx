import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AgendaCampanha() {
  const { id } = useParams();
  const [doacoes, setDoacoes] = useState([]);
  const [nomeCampanha, setNomeCampanha] = useState(''); // Para o título
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Primeiro, busca o nome da campanha
        const campanhaRes = await fetch(`http://localhost:3000/api/campanhas/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const campanhaData = await campanhaRes.json();
        if (!campanhaRes.ok) throw new Error('Campanha não encontrada.');
        setNomeCampanha(campanhaData.titulo);

        // Depois, busca as doações da campanha
        const doacoesRes = await fetch(`http://localhost:3000/api/campanhas/${id}/doacoes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const doacoesData = await doacoesRes.json();
        if (!doacoesRes.ok) throw new Error('Falha ao buscar agendamentos.');
        setDoacoes(doacoesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Separa as doações em próximas e anteriores
  const agora = new Date();
  const proximasDoacoes = doacoes.filter(d => new Date(d.data_agendamento) >= agora && d.status === 'AGENDADA');
  const doacoesAnteriores = doacoes.filter(d => new Date(d.data_agendamento) < agora || d.status !== 'AGENDADA');

  if (loading) return <div className="page-container"><p>Carregando agenda...</p></div>;

  return (
    <div className="page-container">
      <h1 className="titulo-principal">Agenda – {nomeCampanha}</h1>
      
      <section className="secao-doacoes">
        <h2 className="titulo-secao">Próximas doações ({proximasDoacoes.length})</h2>
        {proximasDoacoes.length > 0 ? proximasDoacoes.map(d => (
          <div key={d.id} className="cartao-doacao">
            <div className="info-doacao">
              <div className="data-hora">{new Date(d.data_agendamento).toLocaleString('pt-BR')}</div>
              <div className="doador">Doador: {d.nome_doador}</div>
            </div>
            {/* ... Menu de ações pode ser adicionado aqui no futuro ... */}
          </div>
        )) : <p>Nenhum agendamento futuro.</p>}
      </section>

      <section className="secao-doacoes">
        <h2 className="titulo-secao">Doações anteriores ({doacoesAnteriores.length})</h2>
        {doacoesAnteriores.length > 0 ? doacoesAnteriores.map(d => (
          <div key={d.id} className="cartao-doacao">
            <div className="info-doacao">
              <div className="data-hora">{new Date(d.data_agendamento).toLocaleString('pt-BR')}</div>
              <div className="doador">Doador: {d.nome_doador}</div>
            </div>
            <span className={`status status-${d.status.toLowerCase()}`}>{d.status}</span>
          </div>
        )) : <p>Nenhum agendamento anterior.</p>}
      </section>
    </div>
  );
}

export default AgendaCampanha;