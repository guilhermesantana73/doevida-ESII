import React from 'react';
import '../../styles/info-pages.css'; 

function PoliticaDePrivacidade() {
  return (
    <div className="info-container">
      <h1>Política de Privacidade</h1>

      <h2>1. Coleta de Dados</h2>
      <p>Coletamos dados pessoais que você nos fornece voluntariamente durante o processo de cadastro e agendamento. Isso inclui, mas não se limita a: nome completo, CPF, e-mail, senha (criptografada), tipo sanguíneo e histórico de doações na plataforma.</p>

      <h2>2. Uso dos Dados</h2>
      <p>Utilizamos seus dados para as seguintes finalidades:</p>
      <ul>
        <li>Gerenciar seus agendamentos e seu histórico de doações.</li>
        <li>Enviar lembretes de agendamentos e notificações importantes sobre o serviço.</li>
        <li>Comunicar sobre campanhas de doação relevantes para o seu tipo sanguíneo ou região.</li>
        <li>Garantir o cumprimento das regras de intervalo mínimo entre doações para sua segurança.</li>
      </ul>

      <h2>3. Compartilhamento de Dados</h2>
      <p>Seus dados de agendamento (nome, CPF e e-mail) são compartilhados exclusivamente com o hemocentro ou a campanha onde sua doação foi agendada, para fins de identificação e atendimento. Não vendemos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.</p>

      <h2>4. Segurança dos Dados</h2>
      <p>Empregamos medidas técnicas e administrativas para proteger seus dados. As senhas são armazenadas de forma criptografada (hash), e o acesso à nossa infraestrutura é restrito e monitorado.</p>

      <h2>5. Seus Direitos (LGPD)</h2>
      <p>Como titular dos dados, você tem o direito de solicitar o acesso, a correção, a anonimização ou a exclusão de suas informações a qualquer momento. Para exercer seus direitos, entre em contato conosco através do e-mail: <strong>privacidade@doevida.com.br</strong>.</p>
    </div>
  );
}
export default PoliticaDePrivacidade;