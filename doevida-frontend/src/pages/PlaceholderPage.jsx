import React from 'react';

function PlaceholderPage({ title }) {
  return (
    <div className="page-container">
      <h1 className="titulo-principal">{title || 'Página em Construção'}</h1>
      <p>Esta funcionalidade será implementada em breve.</p>
    </div>
  );
}

export default PlaceholderPage;