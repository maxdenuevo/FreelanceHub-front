
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from "react";
import { createContext } from "react";
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import Contactanos from './pages/Contactanos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Nuevoproyecto from './pages/Nuevoproyecto';
import Nuevocliente from './pages/Nuevocliente';
import Dashboardpage from './pages/Dashboardpage';
import Dashhome from './pages/Dashhome';
import Dashproyectos from './pages/Dashproyectos';
import Dashclientes from './pages/Dashclientes';
import Dashcontratos from './pages/Dashcontratos';
import Perfil from './pages/Perfil';
import Ingresarcorreo from './pages/Ingresarcorreo';
import Validarcodigo from './pages/Validarcodigo';
import Cambiarcontraseña from './pages/Cambiarcontraseña';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RecoveryContext = createContext();

function App() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState(null);
  const [codigoVerificado, setCodigoVerificado] = useState(false);


  return (
    <RecoveryContext.Provider value={{ email, setEmail, codigo, setCodigo, codigoVerificado, setCodigoVerificado }}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/ingresarcorreo" element={<Ingresarcorreo />} />
        <Route path="/validarcodigo" element={<Validarcodigo />} />
        <Route path="/cambiarcontraseña" element={<Cambiarcontraseña />} />
        <Route path="/nuevocliente/nuevoproyecto" element={<Nuevoproyecto />} />
        <Route path="/nuevocliente" element={<Nuevocliente />} />
        <Route path="/dashboardpage" element={<Dashboardpage />}>
          <Route index element={<Dashhome />} />
          <Route path="/dashboardpage/proyectos" element={<Dashproyectos />} />
          <Route path="/dashboardpage/clientes" element={<Dashclientes />} />
          <Route path="/dashboardpage/contratos" element={<Dashcontratos />} />
          <Route path="/dashboardpage/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
    </RecoveryContext.Provider>
  );
}

export default App;
