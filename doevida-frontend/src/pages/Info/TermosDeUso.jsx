// src/pages/Info/SobreNos.jsx
import React from 'react';
import '../../styles/info-pages.css'; // Um novo CSS para essas páginas

function TermosDeUso() {
  return (
    <div className="info-container">
      <h1>Termos de Uso</h1>

      <h2>1. Aceitação dos Termos</h2>
      <p>Ao acessar e usar a plataforma Doevida ("Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com estes termos, não deverá usar o Serviço.</p>

      <h2>2. Descrição do Serviço</h2>
      <p>O Doevida é uma plataforma tecnológica que visa facilitar a conexão entre doadores de sangue voluntários e hemocentros ou campanhas de doação. Nosso serviço se limita ao agendamento e à comunicação. Não nos responsabilizamos pela triagem médica, coleta, armazenamento, ou qualquer procedimento clínico, que são de inteira responsabilidade dos hemocentros e profissionais de saúde qualificados.</p>

      <h2>3. Responsabilidades do Usuário</h2>
      <p>Você concorda em fornecer informações verdadeiras, precisas e completas em seu cadastro. Você é o único responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorram em sua conta.</p>

      <h2>4. Conduta do Usuário</h2>
      <p>Você concorda em não usar o Serviço para qualquer finalidade ilegal ou proibida por estes termos. O não comparecimento reiterado a agendamentos sem cancelamento prévio pode resultar na suspensão temporária da conta.</p>

      <h2>5. Limitação de Responsabilidade</h2>
      <p>A plataforma Doevida é fornecida "como está". Não garantimos que o serviço será ininterrupto, seguro ou livre de erros. Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de usar o serviço.</p>
    </div>
  );
}
export default TermosDeUso;