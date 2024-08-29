import React from 'react';
import Hello from '../images/Hello.png'

function Home() {
  return (
    <div className="home">
      <div className="tarjeta-bienvenida">
        <div className='card-body-text ms-5'>
          <h1>¡Hola, usuario!</h1>
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
            <a className="btn d-flex justify-content-center" href="/nuevoproyecto" role="button">Agrega un nuevo proyecto</a>
          </div>
        </div>
        <div className="card-home m-3">
          <div className="card-body">
            <h3 className="card-title">Contratos</h3>
            <p className="card-text">Administra tus contratos de manera eficiente: revisa contratos existentes, añade nuevos y realiza un seguimiento de los detalles importantes.</p>
            <a className="btn d-flex justify-content-center" href="#" role="button">Revisa las plantillas</a>
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