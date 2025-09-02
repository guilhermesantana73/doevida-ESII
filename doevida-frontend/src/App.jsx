// src/App.jsx - COM A ROTA PROTEGIDA
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import RotaProtegida from './components/RotaProtegida.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Estas rotas são públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Esta rota agora está protegida */}
        <Route 
          path="/dashboard" 
          element={
            <RotaProtegida> 
              <Dashboard />
            </RotaProtegida>
          } 
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;