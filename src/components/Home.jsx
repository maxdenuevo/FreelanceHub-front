import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hello from '../images/Hello.png'

function Home() {
  const navigate = useNavigate();
    
    const irAProyectos = () => {
      navigate('/dashboardpage/proyectos');
  };

    const irAContratos = () => {
      navigate('/dashboardpage/contratos');
  };

  return (
    <div className="home">
      <div className="tarjeta-bienvenida">
        <div className='card-body-text ms-5'>
          <h1>¡Bienvenido!</h1>
          <p className="card-text pt-3">En esta plataforma podrás gestionar tareas, pagos y contratos de tus proyectos de manera eficiente. Utiliza estas herramientas para mantener todo organizado y al día.</p>
        </div>
        <div className='p-0'>
          <img src={Hello} className="img-home me-5" alt="..."></img>
        </div>
      </div>
      <div className="d-flex justify-content-center m-5">
        <div className="card-home m-3">
          <div className="card-body ">
            <h3 className="card-title">Proyectos</h3>
            <p className="card-text">Gestiona tus proyectos con facilidad: visualiza el estado, controla tareas y pagos, y añade nuevos proyectos.</p>
            <button className="btn d-flex justify-content-center" role="button" onClick={irAProyectos}>Ir a mis proyectos</button>
          </div>
        </div>
        <div className="card-home m-3">
          <div className="card-body">
            <h3 className="card-title">Contratos</h3>
            <p className="card-text">Administra tus contratos de manera eficiente: revisa contratos existentes, añade nuevos y realiza un seguimiento de los detalles importantes.</p>
            <button className="btn d-flex justify-content-center" role="button" onClick={irAContratos}>Ir a mis contratos</button>
          </div>
        </div>
        <div className="calendar m-3">
          <iframe src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Your_Time_Zone"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;