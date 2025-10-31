import React from 'react';
import { Briefcase } from 'lucide-react';

function Titulo() {
  return (
    <div className="flex justify-center items-center flex-col md:flex-row mt-12">
      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-glow-primary">
        <Briefcase className="w-12 h-12 text-white" />
      </div>
      <h1 className="pt-0 md:pt-0 md:ml-4 text-center md:text-left text-3xl md:text-4xl font-bold text-gradient">
        FreelanceHub
      </h1>
    </div>
  );
}

export default Titulo;
