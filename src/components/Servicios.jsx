import React from 'react';
import Tareas from '../images/Tareas.png'
import Progreso from '../images/Progreso.png'
import Contrato from '../images/Contrato.png'
import Pago from '../images/Pago.png'
import Recordatorio from '../images/Recordatorio.png'

function Servicios() {
  const services = [
    { img: Tareas, title: "Creación de tareas", description: "Organiza tu flujo de trabajo asignando tareas específicas a miembros del equipo o a ti mismo, asegurando que cada detalle del proyecto esté cubierto." },
    { img: Progreso, title: "Seguimiento del Progreso", description: "Monitorea el avance de cada tarea con herramientas de seguimiento visual, facilitando la identificación de posibles retrasos y la gestión efectiva del tiempo." },
    { img: Contrato, title: "Creación de Contratos", description: "Genera y gestiona contratos directamente desde la plataforma, asegurando que todos los acuerdos sean claros y estén fácilmente accesibles." },
    { img: Pago, title: "Seguimiento de pagos", description: "Monitorea los pagos con herramientas integradas que facilitan el seguimiento de transacciones, garantizando una gestión financiera eficiente." },
    { img: Recordatorio, title: "Recordatorios Automáticos", description: "Establece recordatorios para fechas importantes, entregas de tareas o pagos pendientes, para que nunca pierdas un plazo crucial y mantengas tu proyecto siempre a tiempo." }
  ];

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2 className="titulo-servicios fw-bold">Descubre las características que hacen que FreelanceHub sea tan fácil de usar.</h2>
        </div>
      </div>
      {services.map((service, index) => (
        <div key={index} className={`row align-items-center mb-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
          <div className="col-md-6 mb-3 mb-md-0">
            <img id='img-servicios' className="img-fluid" src={service.img} alt={service.title} />
          </div>
          <div className="col-md-6">
            <h4 id='herramientas-home' className="fw-bold mb-3">{service.title}</h4>
            <p id='herramientas-descripcion'>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Servicios;