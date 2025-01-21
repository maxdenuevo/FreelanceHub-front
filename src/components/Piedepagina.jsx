import React from 'react';
import { Mail, Copyright, ExternalLink } from 'lucide-react';

const Piedepagina = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-center space-x-2">
            <Copyright className="h-4 w-4" />
            <p className="text-sm">
              {currentYear} FreelanceHub. Todos los derechos reservados.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contacto</span>
            </h3>
            <a
              href="mailto:contacto@freelancehub.cl"
              className="flex items-center space-x-2 text-sm hover:text-primary-foreground/80 transition-colors"
            >
              <span>contacto@freelancehub.cl</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="space-y-4">
            {/* agregamos aca redes sociales? */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Piedepagina;