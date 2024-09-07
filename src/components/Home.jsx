import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hello from '../images/Hello.png';

function Home() {
  const navigate = useNavigate();

  const irAProyectos = () => {
    navigate('/dashboardpage/proyectos');
  };

  const irAContratos = () => {
    navigate('/dashboardpage/contratos');
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="card-body-text col-md-6">
          <h1 className='ms-5'>¡Bienvenid@!</h1>
          <p className="pt-3 ms-5 ">
            En esta plataforma podrás gestionar tareas, pagos y contratos de tus proyectos de manera eficiente. Utiliza estas herramientas para mantener todo organizado y al día.
          </p>
        </div>
        <div className="col-md-6">
          <img src={Hello} className="img-fluid" alt="Bienvenida" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card-home text-center p-3">
            <div className="card-body">
              <h3 className="card-title">Proyectos</h3>
              <p className="card-text">
                Gestiona tus proyectos con facilidad: visualiza el estado, controla tareas y pagos, y añade nuevos proyectos.
              </p>
              <button className="btn mt-3" onClick={irAProyectos}>
                Ir a mis proyectos
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4 ">
          <div className="card-home text-center p-3">
            <div className="card-body">
              <h3 className="card-title">Contratos</h3>
              <p className="card-text">
                Administra tus contratos de manera eficiente: revisa contratos existentes, añade nuevos y realiza un seguimiento de los detalles importantes.
              </p>
              <button className="btn mt-3" onClick={irAContratos}>
                Ir a mis contratos
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="calendar">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Your_Time_Zone"
              style={{ border: 0, width: '100%', height: '164px' }}
              frameBorder="0"
              scrolling="no"
              title="Google Calendar"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
