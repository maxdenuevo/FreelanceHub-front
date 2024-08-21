import React from 'react';

function Encabezado() {
  return (
    <div className="encabezado-container">
    <div className="GrupoText">
    <h6 className="pb-2"><strong>"Organiza, colabora y conquista tus metas. Tu éxito, un proyecto a la vez."</strong></h6>
    <p className="parrafo-titulo pt-3">Nuestra plataforma ayuda a freelancers a gestionar proyectos de manera efectiva, desde la asignación de tareas hasta la creación de contratos, con herramientas completas para mantener la organización. Es intuitiva y flexible, adaptándose a diversas áreas como diseño, programación y escritura, para llevar tus proyectos al siguiente nivel.</p>
    <div className="botones-titulo d-flex justify-content-center">
    <button type="button" className="btn m-4">Contactanos</button>
    <button type="button" className="btn m-4">Únete al Hub</button>
    </div>
    </div>
    <div>
    <img id='imghome' src="src/assets/images/imagen principal.png" alt=""/>
    </div>
    </div>
  );
}

export default Encabezado;