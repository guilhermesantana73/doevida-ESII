import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuAbertoId, setMenuAbertoId] = useState(null);


  useEffect(() => {
    const fetchUsuarios = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/usuarios', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Falha ao buscar usuários');
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const toggleMenu = (usuarioId) => {
    setMenuAbertoId(menuAbertoId === usuarioId ? null : usuarioId);
  };

  const handleStatusChange = async (usuarioId, novoStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: novoStatus })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao atualizar status.');

      // Atualiza a lista de usuários no frontend instantaneamente
      setUsuarios(usuarios.map(u => u.id === usuarioId ? { ...u, status: data.status } : u));
      setMenuAbertoId(null); // Fecha o menu
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  const handleDeletar = async (usuarioId) => {
    if (!window.confirm('Tem certeza que deseja REMOVER este usuário? Esta ação é permanente.')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        // Se o backend retornar um erro (ex: admin tentando se auto-deletar), ele será capturado
        const data = await response.json();
        throw new Error(data.error || 'Falha ao remover o usuário.');
      }
      
      // Atualiza a lista no frontend para refletir a remoção
      setUsuarios(usuarios.filter(u => u.id !== usuarioId));
      alert('Usuário removido com sucesso.');

    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  return (
    <div className="page-container" onClick={() => setMenuAbertoId(null)}>
      <div className="cabecalho-conteudo">
        <h1 className="titulo-principal">Usuários (Administrador)</h1>
        <Link to="/admin/usuarios/novo" className="botao-adicionar">
          <i className="fas fa-plus"></i>
          Adicionar Usuário
        </Link>
      </div>
      
      {loading && <p>Carregando usuários...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="lista-cards">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="cartao-geral">
              <div className="info-esquerda">
                <div className="linha-superior">
                  <span className="id-usuario">#{usuario.id} - {usuario.nome}</span>
                </div>
                <span>{usuario.email}</span>
              </div>
              <div className="info-direita">
                <div className="status">
                  <div className={`indicador-status status-${usuario.status.toLowerCase()}`}></div>
                  <span>{usuario.status}</span>
                </div>
                <span className="tipo-usuario">{usuario.tipo_usuario}</span>
                <div className="menu-acoes" onClick={(e) => e.stopPropagation()}>
                  <button className="botao-menu-card" onClick={() => toggleMenu(usuario.id)}>
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  <div className={`menu-suspenso ${menuAbertoId === usuario.id ? 'mostrar' : ''}`}>
                    <button className="opcao-menu">
                      <i className="fas fa-edit"></i><span>Editar</span>
                    </button>
                    {/* Lógica condicional para o botão de status */}
                    {usuario.status === 'ATIVO' ? (
                      <button className="opcao-menu" onClick={() => handleStatusChange(usuario.id, 'SUSPENSO')}>
                        <i className="fas fa-ban"></i><span>Suspender</span>
                      </button>
                    ) : (
                      <button className="opcao-menu" onClick={() => handleStatusChange(usuario.id, 'ATIVO')}>
                        <i className="fas fa-check-circle"></i><span>Ativar</span>
                      </button>
                    )}
                    <button className="opcao-menu" onClick={() => handleDeletar(usuario.id)}>
                      <i className="fas fa-trash-alt"></i><span>Remover</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;