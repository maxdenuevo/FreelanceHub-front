import React from 'react';
import { CheckSquare, TrendingUp, FileText, DollarSign, Bell } from 'lucide-react';

function Servicios() {
  const services = [
    {
      icon: CheckSquare,
      title: "Organiza tus tareas sin estrés",
      description: "¿Sabes esa sensación de tener mil cosas en la cabeza? Con FreelanceHub, puedes crear y organizar todas tus tareas en un solo lugar. Así tu mente queda libre para crear, no para recordar.",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Mira tu progreso en tiempo real",
      description: "Nada se siente mejor que ver cómo avanzas. Visualiza el estado de cada proyecto con gráficos claros y sencillos. Celebra tus logros y ajusta el rumbo cuando lo necesites.",
      color: "text-warning"
    },
    {
      icon: FileText,
      title: "Contratos profesionales en minutos",
      description: "Deja de buscar plantillas en Google. Genera contratos profesionales directamente desde la plataforma. Todo claro, todo en orden, todo en un click.",
      color: "text-primary"
    },
    {
      icon: DollarSign,
      title: "Controla tus finanzas fácilmente",
      description: "Tu tiempo vale oro, literalmente. Lleva un registro claro de todos tus pagos, facturas pendientes e ingresos. Sin sorpresas, sin dolores de cabeza.",
      color: "text-info"
    },
    {
      icon: Bell,
      title: "Nunca más olvides una fecha importante",
      description: "Déjanos recordarte lo importante. Configura alertas para entregas, pagos o reuniones. Así puedes enfocarte en tu trabajo sin preocuparte por los detalles.",
      color: "text-success"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary border-b-3 border-primary inline-block pb-2">
          Todo lo que necesitas para trabajar tranquilo
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Creamos estas herramientas pensando en ti y en lo que realmente necesitas día a día.
        </p>
      </div>

      {services.map((service, index) => {
        const Icon = service.icon;
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-8 items-center mb-12 ${isReverse ? 'md:grid-flow-dense' : ''}`}
          >
            <div className={`flex justify-center ${isReverse ? 'md:col-start-2' : ''}`}>
              <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Icon className={`w-24 h-24 ${service.color}`} />
              </div>
            </div>
            <div className={isReverse ? 'md:col-start-1' : ''}>
              <h4 className="text-2xl font-bold mb-4 text-[#003598]">{service.title}</h4>
              <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Servicios;
