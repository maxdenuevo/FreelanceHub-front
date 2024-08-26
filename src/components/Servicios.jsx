import React from 'react';
import Tareas from '../images/tareas.png'
import Progreso from '../images/progreso.png'
import Contrato from '../images/contrato.png'
import Pago from '../images/Pago.png'
import Recordatorio from '../images/Recordatorio.png'

function Servicios() {
  return (
    <div className="servicios-home">
        <div className="titulo-servicios mb-5">
            <h2><strong>Descubre las características que hacen que FreelanceHub sea tan fácil de usar.</strong></h2>
        </div>
        <div className="herramientas-home pt-5">
        <img className="img-servicios" src={Tareas} alt=""/>
        <div>
        <h4 className="pt-5"><strong>Creacion de tareas</strong></h4>
        <p className="p-2">Organiza tu flujo de trabajo asignando tareas específicas a miembros del equipo o a ti mismo, asegurando que cada detalle del proyecto esté cubierto.</p>
        </div>
        </div>
        <div className="herramientas-home2">
        <img className="img-servicios2 p-4" src={Progreso} alt=""/>
        <div>
        <h4 className="pt-5"><strong>Seguimiento del Progreso</strong></h4>
        <p className="p-1">Monitorea el avance de cada tarea con herramientas de seguimiento visual, facilitando la identificación de posibles retrasos y la gestión efectiva del tiempo.</p>
        </div>
        </div>
        <div className="herramientas-home">
        <img className="img-servicios p-4" src={Contrato} alt=""/>
        <div>
        <h4 className="pt-5"><strong>Creación de Contratos</strong></h4>
        <p className="p-1">Genera y gestiona contratos directamente desde la plataforma, asegurando que todos los acuerdos sean claros y estén fácilmente accesibles.</p>
        </div>
        </div>
        <div className="herramientas-home2">
        <img className="img-servicios p-4" src={Pago} alt=""/>
        <div>
        <h4 className="pt-5"><strong>Seguimiento de pagos</strong></h4>
        <p className="p-1">Monitorea los pagos con herramientas integradas que facilitan el seguimiento de transacciones, garantizando una gestión financiera eficiente.</p>
        </div>
        </div>
        <div className="herramientas-home">
        <img className="img-servicios2 p-4" src={Recordatorio} alt=""/>
        <div>
        <h4 className="pt-5"><strong>Recordatorios Automáticos</strong></h4>
        <p className="p-1">Establece recordatorios para fechas importantes, entregas de tareas o pagos pendientes, para que nunca pierdas un plazo crucial y mantengas tu proyecto siempre a tiempo.</p>
        </div>
        </div>
    </div>
  );
}

export default Servicios;