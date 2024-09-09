import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Nuevoproyecto from '../pages/Nuevoproyecto.jsx';
import Nuevocliente from '../pages/Nuevocliente.jsx';
import Dashboardpage from '../pages/Dashboardpage.jsx';
import Dashhome from '../pages/Dashhome.jsx';
import Dashproyectos from '../pages/Dashproyectos.jsx';
import Dashclientes from '../pages/Dashclientes.jsx';
import Dashcontratos from '../pages/Dashcontratos.jsx';
import Perfil from '../pages/Perfil.jsx';

const Rutasapp = () => {
    return (
       <Routes>
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
    )
}

export default Rutasapp;