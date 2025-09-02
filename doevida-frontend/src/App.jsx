import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RotaProtegida from './components/RotaProtegida.jsx';

// Páginas Públicas
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';

// O "Despachante" do Dashboard
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';

// Páginas de Informação
import SobreNos from './pages/Info/SobreNos';
import Contato from './pages/Info/Contato';
import TermosDeUso from './pages/Info/TermosDeUso';
import PoliticaDePrivacidade from './pages/Info/PoliticaDePrivacidade';

//Agendar Doação, Triagem, Históricos, Informações e Benefícios
import Triagem from './pages/Triagem.jsx';
import Agendamento from './pages/Agendamento.jsx';
import Historico from './pages/Historico.jsx';
import Informacoes from './pages/Informacoes.jsx';
import Beneficios from './pages/Beneficios.jsx';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas de Informação */}
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
          
          {/* Rotas Protegidas que levam para o Dashboard correspondente */}
          {/* Todas elas agora usam o DESPACHANTE 'DashboardPage' */}
          <Route path="/dashboard" element={<RotaProtegida><DashboardPage /></RotaProtegida>} />
          <Route path="/triagem" element={<RotaProtegida><Triagem /></RotaProtegida>} />
          <Route path="/agendar-doacao" element={<RotaProtegida><Agendamento /></RotaProtegida>} />
          <Route path="/historico" element={<RotaProtegida><Historico /></RotaProtegida>} />
          <Route path="/beneficios" element={<RotaProtegida><Beneficios /></RotaProtegida>} />
          <Route path="/informacoes" element={<RotaProtegida><Informacoes /></RotaProtegida>} />

          {/* Rota Padrão */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;