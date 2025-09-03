import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarCampanha() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    data_inicio: '',
    data_termino: '',
    meta_doacoes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  //useEffect para buscar os dados da campanha assim que a página carrega
  useEffect(() => {
    const fetchCampanha = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3000/api/campanhas/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Campanha não encontrada.');

        // Formata as datas para o formato que o input type="date" espera (AAAA-MM-DD)
        const formattedData = {
          ...data,
          data_inicio: new Date(data.data_inicio).toISOString().split('T')[0],
          data_termino: new Date(data.data_termino).toISOString().split('T')[0],
        };
        setForm(formattedData); // Pré-preenche o formulário
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanha();
  }, [id]); // O efeito depende do ID da campanha

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/campanhas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao atualizar campanha.');

      alert('Campanha atualizada com sucesso!');
      navigate('/dashboard'); // Redireciona de volta para o painel
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><p>Carregando campanha...</p></div>;

  return (
    <div className="page-container">
      <h1 className="titulo-principal">Editar Campanha</h1>
      <form onSubmit={handleSubmit} className="formulario-cadastro">
        {error && <p className="error-message">{error}</p>}
        <div className="grupo-campo">
          <label htmlFor="titulo">Nome da Campanha</label>
          <input type="text" id="titulo" name="titulo" className="campo-entrada" value={form.titulo} onChange={handleChange} required />
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
          <input type="number" id="meta_doacoes" name="meta_doacoes" className="campo-entrada" value={form.meta_doacoes || ''} onChange={handleChange} min="1" />
        </div>
        <div className="container-botao">
          <button type="submit" className="botao-cadastrar" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarCampanha;