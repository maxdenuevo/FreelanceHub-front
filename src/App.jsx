
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
import Ingresarcorreo from './pages/Ingresarcorreo';
import Validarcodigo from './pages/Validarcodigo';
import Cambiarcontraseña from './pages/Cambiarcontraseña';
import Rutaprotegida from './components/Rutaprotegida';
import Rutasapp from './components/Rutasapp';
import ComponentShowcase from './pages/ComponentShowcase';

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
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="/*"
        element={
        <Rutaprotegida>
          <Rutasapp />
        </Rutaprotegida>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/ingresarcorreo" element={<Ingresarcorreo />} />
        <Route path="/validarcodigo" element={<Validarcodigo />} />
        <Route path="/cambiarcontraseña" element={<Cambiarcontraseña />} />
      </Routes>
    </Router>
    </RecoveryContext.Provider>
  );
}

export default App;
