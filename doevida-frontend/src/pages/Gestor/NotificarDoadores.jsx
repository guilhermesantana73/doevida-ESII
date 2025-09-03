import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificarDoadores() {
  const [form, setForm] = useState({
    tipoSanguineo: 'O',
    fatorRH: 'positivo',
    sexo: 'todos',
    notificarTodos: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/notificacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao enviar notificação.');
      
      alert('Notificação enviada com sucesso!');
      navigate('/dashboard');

    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="page-container">
      <h1 className="titulo-principal">Notificar Doadores</h1>
      <form onSubmit={handleSubmit} className="formulario-cadastro">
        <div className="grupo-campo">
          <label htmlFor="tipoSanguineo">Tipo sanguíneo</label>
          <select id="tipoSanguineo" name="tipoSanguineo" className="campo-select" value={form.tipoSanguineo} onChange={handleChange} disabled={form.notificarTodos}>
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </select>
        </div>
        
        {/* Adicione os outros campos (Fator RH, Sexo) aqui, seguindo o padrão */}

        <div className="grupo-campo">
          <label>
            <input type="checkbox" name="notificarTodos" checked={form.notificarTodos} onChange={handleChange} />
            <span style={{marginLeft: '10px'}}>Notificar todos os doadores</span>
          </label>
        </div>

        <div className="container-botao">
          <button type="submit" className="botao-cadastrar">Notificar</button>
        </div>
      </form>
    </div>
  );
}

export default NotificarDoadores;