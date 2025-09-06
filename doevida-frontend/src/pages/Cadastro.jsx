import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    tipo_sanguineo: '', // O backend espera 'tipo_sanguineo'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      // Faz a chamada de API para o endpoint de cadastro
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // O backend espera 'tipo_sanguineo', então é renomeado no objeto enviado
        body: JSON.stringify({
          nome: form.nome,
          cpf: form.cpf,
          email: form.email,
          senha: form.senha,
          tipo_sanguineo: form.tipoSanguineo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se o backend retornar um erro (ex: 409 - CPF duplicado), ele será capturado aqui
        throw new Error(data.error || 'Falha ao cadastrar.');
      }

      // Se o cadastro for bem-sucedido
      alert('Cadastro realizado com sucesso! Você será redirecionado para a tela de login.');
      navigate('/login'); // Redireciona para o login

    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err.message); // Exibe o erro para o usuário
    }
  };

  return (
    <div className="container-login">
      <div className="cartao-login">
        <h1 className="titulo-login">Cadastro</h1>
        {error && <p style={{ color: '#8a0303', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grupo-entrada">
            <label htmlFor="nome">Nome Completo</label>
            <div className="container-icone">
              <i className="fas fa-user icone-entrada"></i>
              <input type="text" name="nome" id="nome" className="campo-entrada" placeholder="Digite seu nome" value={form.nome} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="grupo-entrada">
            <label htmlFor="cpf">CPF</label>
            <div className="container-icone">
              <i className="fas fa-id-card icone-entrada"></i>
              <input type="text" name="cpf" id="cpf" className="campo-entrada" placeholder="Digite seu CPF" value={form.cpf} onChange={handleChange} required />
            </div>
          </div>

          <div className="grupo-entrada">
            <label htmlFor="email">E-mail</label>
            <div className="container-icone">
              <i className="fas fa-envelope icone-entrada"></i>
              <input type="email" name="email" id="email" className="campo-entrada" placeholder="Digite seu e-mail" value={form.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="grupo-entrada">
            <label htmlFor="senha">Senha</label>
            <div className="container-icone">
              <i className="fas fa-lock icone-entrada"></i>
              <input type="password" name="senha" id="senha" className="campo-entrada" placeholder="Digite sua senha" value={form.senha} onChange={handleChange} required />
            </div>
          </div>

          <div className="grupo-entrada">
            <label htmlFor="tipoSanguineo">Tipo Sanguíneo</label>
            <div className="container-icone">
              <i className="fas fa-tint icone-entrada"></i>
              <select name="tipoSanguineo" id="tipoSanguineo" className="campo-entrada" value={form.tipoSanguineo} onChange={handleChange} required >
                <option value="">Selecione...</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
              </select>
            </div>
          </div>

          <button type="submit" className="botao-entrar">Cadastrar</button>
        </form>

        <div className="container-cadastro">
          <p className="texto-cadastro">Já tem uma conta?</p>
          <button onClick={() => navigate('/login')} className="botao-cadastro">Faça o login</button>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;