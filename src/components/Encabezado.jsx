import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Encabezado = () => {
  const navigate = useNavigate();

  const irAContactanos = () => navigate('/contactanos');
  const irARegistro = () => navigate('/registro');

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h4 className="text-2xl md:text-3xl font-semibold mb-6 text-primary px-4 md:px-8">
            Tu trabajo freelance merece estar organizado. Hagámoslo realidad juntos.
          </h4>
          <p className="text-lg mb-8 text-gray-700 px-4 md:px-8">
            Sabemos lo que es hacer malabares con múltiples proyectos, clientes y fechas límite.
            Por eso creamos FreelanceHub: para que puedas enfocarte en lo que realmente amas hacer,
            mientras nosotros te ayudamos a mantener todo en orden. Desde tu primer cliente hasta
            tu proyecto más ambicioso, estamos aquí para ti.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-8">
            <button
              className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-all hover:shadow-glow-accent w-full md:w-auto"
              onClick={irAContactanos}
            >
              Hablemos
            </button>
            <button
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all hover:shadow-glow-primary w-full md:w-auto"
              onClick={irARegistro}
            >
              Empieza gratis
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 mb-8 md:mb-0 flex justify-center">
          <div className="w-full max-w-md h-80 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow">
            <Rocket className="w-32 h-32 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encabezado;
