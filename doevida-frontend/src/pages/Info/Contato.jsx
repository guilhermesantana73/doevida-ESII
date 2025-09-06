import React from 'react';
import '../../styles/info-pages.css'; 

function Contato() {
  return (
    <div className="info-container">
      <h1>Fale Conosco</h1>
      <p>Sua opinião, dúvida ou sugestão é muito importante para nós!</p>

      <h2>Suporte ao Usuário</h2>
      <p>
        Se você é um doador ou gestor de campanha e precisa de ajuda com a plataforma, 
        entre em contato pelo e-mail: <strong>suporte@doevida.com.br</strong>
      </p>

      <h2>Parcerias</h2>
      <p>
        Se sua organização deseja se tornar uma parceira do Doevida e oferecer 
        benefícios aos nossos heróis doadores, escreva para: <strong>parcerias@doevida.com.br</strong>
      </p>
   </div>
  );
}
export default Contato;