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
                    <h2>¡Hablemos! 💬</h2>
                    <p>¿Tienes dudas? ¿Necesitas ayuda? ¿Quieres contarnos tu experiencia? Estamos aquí para ti.</p>
                    <div className="mb-3">
                    <h5>📧 Correo Electrónico:</h5>
                    <p><a href="mailto:contacto@freelancehub.cl" className="text-primary hover:text-primary-dark transition-colors">contacto@freelancehub.cl</a></p>
                    <h5>📱 WhatsApp:</h5>
                    <p><a href="tel:+56931798920" className="text-primary hover:text-primary-dark transition-colors">+56 9 3179 8920</a></p>
                    <p className="text-muted mt-3">Normalmente respondemos en menos de 24 horas.</p>
                    <button onClick={ClickAtras} className="btn mt-4 btn-primary">Volver</button>
                    </div>
                </div>
            </div> 
    );
}

export default Contacto;
