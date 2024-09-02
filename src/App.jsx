
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
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
import Dashcontratos from './pages/Dashcontratos';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nuevocliente/nuevoproyecto" element={<Nuevoproyecto />} />
        <Route path="/nuevocliente" element={<Nuevocliente />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/dashboardpage" element={<Dashboardpage />}>
          <Route index element={<Dashhome />} />
          <Route path="/dashboardpage/proyectos" element={<Dashproyectos />} />
          <Route path="/dashboardpage/contratos" element={<Dashcontratos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
