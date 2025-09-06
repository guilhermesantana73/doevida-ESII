import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RotaProtegida from './components/RotaProtegida.jsx';

// Páginas Públicas e de Info
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import SobreNos from './pages/Info/SobreNos';
import Contato from './pages/Info/Contato';
import TermosDeUso from './pages/Info/TermosDeUso';
import PoliticaDePrivacidade from './pages/Info/PoliticaDePrivacidade';

// Páginas do Doador
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';
import Triagem from './pages/Triagem.jsx';
import Agendamento from './pages/Agendamento.jsx';
import Historico from './pages/Historico.jsx';
import Beneficios from './pages/Beneficios.jsx';
import Informacoes from './pages/Informacoes.jsx';

// Página de Placeholder
import CriarCampanha from './pages/Gestor/CriarCampanha';
import EditarCampanha from './pages/Gestor/EditarCampanha';
import MonitorarCampanha from './pages/Gestor/MonitorarCampanha';
import AgendaCampanha from './pages/Gestor/AgendaCampanha';
import NotificarDoadores from './pages/Gestor/NotificarDoadores';

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
          
          {/* Rotas Protegidas do Doador */}
          <Route path="/dashboard" element={<RotaProtegida><DashboardPage /></RotaProtegida>} />
          <Route path="/triagem" element={<RotaProtegida><Triagem /></RotaProtegida>} />
          <Route path="/agendar-doacao" element={<RotaProtegida><Agendamento /></RotaProtegida>} />
          <Route path="/historico" element={<RotaProtegida><Historico /></RotaProtegida>} />
          <Route path="/beneficios" element={<RotaProtegida><Beneficios /></RotaProtegida>} />
          <Route path="/informacoes" element={<RotaProtegida><Informacoes /></RotaProtegida>} />
          
          {/* Rota Protegida do Gestor */}
           <Route path="/gestor/campanhas/nova" element={<RotaProtegida><CriarCampanha /></RotaProtegida>} />
           <Route path="/gestor/campanhas/editar/:id" element={<RotaProtegida><EditarCampanha /></RotaProtegida>} />
           <Route path="/gestor/campanhas/:id" element={<RotaProtegida><MonitorarCampanha /></RotaProtegida>} />
           <Route path="/gestor/campanhas/:id/agenda" element={<RotaProtegida><AgendaCampanha /></RotaProtegida>} />
           <Route path="/gestor/notificar" element={<RotaProtegida><NotificarDoadores /></RotaProtegida>} />

          
          {/* Rota Padrão */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;