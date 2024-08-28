import React from 'react';
import Titulo from '../components/Titulo';
import Encabezado from '../components/Encabezado';
import Servicios from '../components/Servicios';
import Piedepagina from '../components/Piedepagina';

function HomePage() {
  return (
    <div>
      <Titulo />
      <Encabezado />
      <Servicios />
      <Piedepagina />
    </div>
  );
}

export default HomePage;