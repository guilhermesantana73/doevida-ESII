import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function GestorDashboard() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuAbertoId, setMenuAbertoId] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchMinhasCampanhas = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/campanhas/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Falha ao buscar campanhas');
        setCampanhas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMinhasCampanhas();
  }, []);
  
  const toggleMenu = (campanhaId) => {
    setMenuAbertoId(menuAbertoId === campanhaId ? null : campanhaId);
  };

  const handleDeletar = async (campanhaId) => {
    if (!window.confirm('Tem certeza que deseja deletar esta campanha? Esta ação não pode ser desfeita.')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/campanhas/${campanhaId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar a campanha.');
      }

      setCampanhas(campanhas.filter(c => c.id !== campanhaId));
      alert('Campanha deletada com sucesso!');

    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

 return (
    <div className="page-container" onClick={() => setMenuAbertoId(null)}>
      <div className="cabecalho-conteudo">
        <h1 className="titulo-principal">Minhas Campanhas</h1>
        <Link to="/gestor/campanhas/nova" className="botao-adicionar">
          <i className="fas fa-plus"></i>
          Nova Campanha
        </Link>
      </div>

      {loading && <p>Carregando campanhas...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && (
        <div className="lista-cards">
          {campanhas.length > 0 ? (
            campanhas.map(campanha => (
              <Link key={campanha.id} to={`/gestor/campanhas/${campanha.id}`} className="cartao-item" style={{textDecoration: 'none'}}>
                <div className="cartao-info-principal">
                  <span className="cartao-titulo">{campanha.titulo}</span>
                  <span className="cartao-subtitulo">
                    {new Date(campanha.data_inicio).toLocaleDateString('pt-BR')} - {new Date(campanha.data_termino).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="cartao-info-secundaria">
                  <span className="cartao-status">Meta: {campanha.meta_doacoes || 'N/A'}</span>
                  
                  <div className="menu-acoes" onClick={(e) => e.stopPropagation()}>
                    <button className="botao-menu-card" onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        toggleMenu(campanha.id);
                      }}>
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <div className={`menu-suspenso ${menuAbertoId === campanha.id ? 'mostrar' : ''}`}>
                      <button className="opcao-menu" onClick={(e) => {
                          e.preventDefault();
                          navigate(`/gestor/campanhas/editar/${campanha.id}`);
                        }}>
                        <i className="fas fa-edit"></i>
                        <span>Editar</span>
                      </button>
                      <button className="opcao-menu" onClick={(e) => {
                          e.preventDefault();
                          handleDeletar(campanha.id);
                        }}>
                        <i className="fas fa-trash-alt"></i>
                        <span>Deletar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhuma campanha encontrada. Clique em "Nova Campanha" para começar.</p>
          )}
        </div>
      )}
    </div>
  );
}


export default GestorDashboard;