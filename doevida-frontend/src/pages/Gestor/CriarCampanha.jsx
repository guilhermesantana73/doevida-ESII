import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarCampanha() {
  const [form, setForm] = useState({
    titulo: '',
    data_inicio: '',
    data_termino: '',
    meta_doacoes: '',
    descricao: '' // Adicionando descrição se necessário no futuro
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/campanhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao criar campanha.');

      alert('Campanha criada com sucesso!');
      navigate('/dashboard'); // Redireciona de volta para o painel do gestor

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="titulo-principal">Cadastrar Nova Campanha</h1>

      <form onSubmit={handleSubmit} className="formulario-cadastro">
        {error && <p className="error-message">{error}</p>}

        <div className="grupo-campo">
          <label htmlFor="titulo">Nome da Campanha</label>
          <input type="text" id="titulo" name="titulo" className="campo-entrada" placeholder="Ex: Campanha de Inverno" value={form.titulo} onChange={handleChange} required />
        </div>

        <div className="grupo-campo">
          <label htmlFor="data_inicio">Data de Início</label>
          <input type="date" id="data_inicio" name="data_inicio" className="campo-entrada" value={form.data_inicio} onChange={handleChange} required />
        </div>

        <div className="grupo-campo">
          <label htmlFor="data_termino">Data de Término</label>
          <input type="date" id="data_termino" name="data_termino" className="campo-entrada" value={form.data_termino} onChange={handleChange} required />
        </div>

        <div className="grupo-campo">
          <label htmlFor="meta_doacoes">Meta (nº de doações)</label>
          <input type="number" id="meta_doacoes" name="meta_doacoes" className="campo-entrada" placeholder="Ex: 150" value={form.meta_doacoes} onChange={handleChange} min="1" />
        </div>

        <div className="container-botao">
          <button type="submit" className="botao-cadastrar" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Campanha'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CriarCampanha;