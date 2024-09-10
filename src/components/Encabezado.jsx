import React from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../images/Imagen-principal.png';

const Encabezado = () => {
  const navigate = useNavigate();

  const irAContactanos = () => navigate('/contactanos');
  const irARegistro = () => navigate('/registro');

  return (
    <div className="encabezado-container container-fluid py-3 py-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 order-2 order-md-1">
          <h4 className="mb-3 px-3 px-md-4 ms-5 me-5 pb-4">
            Organiza, colabora y conquista tus metas. Tu éxito, un proyecto a la vez.
          </h4>
          <p className="mb-4 px-3 px-md-4 ms-5 me-5 pb-4">
            Nuestra plataforma ayuda a freelancers a gestionar proyectos de manera efectiva, 
            desde la asignación de tareas hasta la creación de contratos, con herramientas 
            completas para mantener la organización. Es intuitiva y flexible, adaptándose a 
            diversas áreas como diseño, programación y escritura, para llevar tus proyectos 
            al siguiente nivel.
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
            <button className="btn m-2" onClick={irAContactanos}>Contáctanos</button>
            <button className="btn m-2" onClick={irARegistro}>Únete al Hub</button>
          </div>
        </div>
        <div className="col-12 col-md-6 order-1 order-md-2 mb-4 mb-md-0">
          <img className="img-fluid" src={Img} alt="Imagen Principal" />
        </div>
      </div>
    </div>
  );
};

export default Encabezado;