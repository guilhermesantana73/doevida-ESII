import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/login.css'; 

function Footer() {
  return (
    <footer className="rodape">
      <p>DOEVIDA - Plataforma de doação de sangue</p>
      <div className="links-rodape">
        <Link to="/sobre-nos">Sobre nós</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/termos-de-uso">Termos de uso</Link>
        <Link to="/politica-de-privacidade">Política de privacidade</Link>
      </div>
    </footer>
  );
}
export default Footer;