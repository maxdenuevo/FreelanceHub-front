import React from 'react';


function Contacto() {
    return (
            <div className="contacto card">
                <div className="card-body">
                    <h2>Contáctanos</h2>
                    <p>Si tienes alguna pregunta o deseas más información, no dudes en contactarnos:</p>
                    <div className="mb-3">
                    <h5>Correo Electrónico:</h5>
                    <p><a href="mailto:freelancehub17@gmail.com">contrato@freelancehub.cl</a></p>
                    <h5>Números de Contacto:</h5>
                    <p><a href="tel:+56931798920">+56 9 3179 8920</a></p>
                    <p><a href="tel:+56991536865">+56 9 9153 6865</a></p>
                    <p><a href="tel:+56994770080">+56 9 9477 0080</a></p>
                    <a href="/" className="btn">Atrás</a>
                    </div>
                </div>
            </div>

);
}

export default Contacto;