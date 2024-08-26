import React from 'react';
import Img from '../images/imagen-principal.png'

function Encabezado() {
  return (
    <div className="encabezado-container">
    <div className="GrupoText">
    <h6 className="pb-2"><strong>"Organiza, colabora y conquista tus metas. Tu éxito, un proyecto a la vez."</strong></h6>
    <p className="parrafo-titulo pt-3">Nuestra plataforma ayuda a freelancers a gestionar proyectos de manera efectiva, desde la asignación de tareas hasta la creación de contratos, con herramientas completas para mantener la organización. Es intuitiva y flexible, adaptándose a diversas áreas como diseño, programación y escritura, para llevar tus proyectos al siguiente nivel.</p>
    <div className="botones-titulo d-flex justify-content-center">
    <a class="btn m-4" href="/contactanos" role="button">Contáctanos</a>
    <a class="btn m-4" href="/registro" role="button">Únete al Hub</a>
    </div>
    </div>
    <div>
    <img id='imghome' src={Img} alt=""/>
    </div>
    </div>
  );
}

export default Encabezado;