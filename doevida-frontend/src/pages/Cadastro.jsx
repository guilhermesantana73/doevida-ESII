import React, { useState } from 'react';

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    tipoSanguineo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', form);
    // Aqui você pode fazer a requisição para o backend (ex: axios.post)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Doador</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <select
          name="tipoSanguineo"
          value={form.tipoSanguineo}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Selecione o tipo sanguíneo</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
