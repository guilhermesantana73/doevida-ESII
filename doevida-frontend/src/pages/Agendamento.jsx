import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Agendamento() {
  const [form, setForm] = useState({ local_doacao: '', data_agendamento: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const token = localStorage.getItem('token');
    if (!token) {
        setError('Sessão expirada. Faça o login novamente.');
        return;
    }

    try {
      // Conecta com o endpoint que já tínhamos criado no backend!
      const response = await fetch("http://localhost:3000/api/doacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          local_doacao: form.local_doacao,
          data_agendamento: new Date(form.data_agendamento).toISOString()
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha ao agendar.');

      alert('Agendamento realizado com sucesso!');
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container-login">
      <form onSubmit={handleSubmit} className="cartao-login">
        <h1 className="titulo-login">Agendamento</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="grupo-entrada">
          <label htmlFor="local_doacao">Local da doação</label>
          <input
            id="local_doacao" name="local_doacao" type="text"
            className="campo-entrada-triagem"
            value={form.local_doacao} onChange={handleChange} required
          />
        </div>
        
        <div className="grupo-entrada">
          <label htmlFor="data_agendamento">Data e Horário</label>
          <input
            id="data_agendamento" name="data_agendamento" type="datetime-local"
            className="campo-entrada-triagem"
            value={form.data_agendamento} onChange={handleChange} required
          />
        </div>

        <button type="submit" className="botao-entrar">Agendar</button>
      </form>
    </main>
  );
}
export default Agendamento;