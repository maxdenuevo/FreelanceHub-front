import React from 'react';
import { useNavigate } from 'react-router-dom';


function Contacto() {
    const navigate = useNavigate();

    function ClickAtras() {
        navigate(-1);
    }

    return (
            <div className="contacto card mb-5">
                <div className="card-body">
                    <h2>Contáctanos</h2>
                    <p>Si tienes alguna pregunta o deseas más información, no dudes en contactarnos:</p>
                    <div className="mb-3">
                    <h5>• Correo Electrónico:</h5>
                    <p><a href="mailto:contacto@freelancehub.cl">contacto@freelancehub.cl</a></p>
                    <h5>• Números de Contacto:</h5>
                    <p><a href="tel:+56931798920">+56 9 3179 8920</a></p>
                    <button onClick={ClickAtras} className="btn mt-2">Atrás</button>
                    </div>
                </div>
            </div> 
    );
}

export default Contacto;
