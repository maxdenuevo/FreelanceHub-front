import React from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../images/Imagen-principal.png'

function Encabezado() {

  const navigate = useNavigate();

  const irAContactanos = () => {
    navigate('/contactanos');
  };

  const irARegistro = () => {
    navigate('/registro');
  };


  return (
    <div className="encabezado-container">
    <div className="GrupoText">
    <h6 className="pb-2"><strong>"Organiza, colabora y conquista tus metas. Tu éxito, un proyecto a la vez."</strong></h6>
    <p className="parrafo-titulo pt-3">Nuestra plataforma ayuda a freelancers a gestionar proyectos de manera efectiva, desde la asignación de tareas hasta la creación de contratos, con herramientas completas para mantener la organización. Es intuitiva y flexible, adaptándose a diversas áreas como diseño, programación y escritura, para llevar tus proyectos al siguiente nivel.</p>
    <div className="botones-titulo d-flex justify-content-center">
    <button className="btn m-4" onClick={irAContactanos}>Contáctanos</button>
    <button className="btn m-4" role="button" onClick={irARegistro}>Únete al Hub</button>
    </div>
    </div>
    <div>
    <img id='imghome' src={Img} alt=""/>
    </div>
    </div>
  );
}

export default Encabezado;