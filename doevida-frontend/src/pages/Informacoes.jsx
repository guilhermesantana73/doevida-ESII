import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/informacoes.css'; // Novo CSS para esta página

function Informacoes() {
  const navigate = useNavigate();

  return (
    <div className="info-page-container">
      <div className="info-card-conscientizacao">
        <div className="info-icon">
          <i className="fas fa-heart"></i>
        </div>
        <h1>Doar é importante!</h1>
        <p>
          A doação de sangue e seu processamento são fundamentais para garantir a disponibilização de
          componentes sanguíneos para os pacientes que necessitam de transfusão, como vítimas de
          acidentes, que necessitam de cirurgias ou outras situações clínicas.
        </p>
        <p>
          Se cada cidadão saudável doasse sangue pelo menos duas vezes por ano, não seriam necessárias
          campanhas emergenciais para coletas de reposição de estoques!
        </p>
        <p>
          O sangue não tem substituto e, por isso, a doação voluntária é fundamental. Uma simples doação
          pode salvar muitas vidas. Toda pessoa em boas condições de saúde pode doar sangue sem qualquer
          risco ou prejuízo à sua saúde.
        </p>
        <button onClick={() => navigate('/dashboard')} className="botao-continuar">
          Continuar
        </button>
      </div>
    </div>
  );
}

export default Informacoes;