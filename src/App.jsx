import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './assets/components/Navbar';
import HomePage from './assets/pages/Homepage';
import Login from './assets/pages/Login';
import Registro from './assets/pages/Registro';
import Nuevoproyecto from './assets/pages/Nuevoproyecto';
import Nuevocliente from './assets/pages/Nuevocliente';
import Dashboardpage from './assets/pages/Dashboardpage';
import Contactanos from './assets/pages/Contactanos';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nuevoproyecto" element={<Nuevoproyecto />} />
        <Route path="/nuevoproyecto/nuevocliente" element={<Nuevocliente />} />
        <Route path="/dashboardpage" element={<Dashboardpage />} />
        <Route path="/contactanos" element={<Contactanos />} />
      </Routes>
    </Router>
    
  );
}

export default App;
