import React, { useState, useEffect } from 'react';
import '../styles/beneficios.css'; 

function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/servicos', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Falha ao buscar benefícios');
        setBeneficios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBeneficios();
  }, []);

  return (
    <div className="beneficios-container">
      <h2>Benefícios ao doador</h2>
      {loading ? (
        <p>Carregando benefícios...</p>
      ) : (
        <div className="lista-beneficios">
          {beneficios.map(b => (
            <div key={b.id} className="beneficio-card">
              <span className="beneficio-op">{b.nome_fantasia}</span>
              <p className="beneficio-titulo">{b.titulo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Beneficios;