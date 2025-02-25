import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Piedepagina';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Login from '@/features/auth/components/Forminicio';
import Register from '@/features/auth/components/Formregistro';
import ForgotPassword from '@/features/auth/components/Correo';
import VerifyCode from '@/features/auth/components/Codigo';
import ResetPassword from '@/features/auth/components/Contraseña';
import Dashboard from '@/features/dashboard/Dashboard';
import Projects from '@/features/projects/Projects';
import Clients from '@/features/clients/Clients';
import Contracts from '@/features/contracts/Contracts';
import Profile from '@/features/profile/Profile';
import NewProject from '@/features/projects/components/Formnuevoproyecto';
import ProjectDetails from '@/features/projects/components/ProjectDetails';
import NewClient from '@/features/clients/components/Formnuevocliente';
import Contact from '@/components/Contacto';
export const RecoveryContext = createContext();
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('usuario_id');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  // State for password recovery flow
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  
  // Recovery context values
  const recoveryValues = {
    email,
    setEmail,
    codigo,
    setCodigo,
    codigoVerificado,
    setCodigoVerificado
  };

  return (
    <RecoveryContext.Provider value={recoveryValues}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Toaster />
          
          <Routes>
            {/* Public Routes with Main Layout */}
            <Route 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Outlet />
                  </main>
                  <Footer />
                </>
              }
            >
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/ingresarcorreo" element={<ForgotPassword />} />
              <Route path="/validarcodigo" element={<VerifyCode />} />
              <Route path="/cambiarcontraseña" element={<ResetPassword />} />
              <Route path="/contactanos" element={<Contact />} />
            </Route>
            
            {/* Dashboard Routes with Dashboard Layout */}
            <Route 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboardpage" element={<Dashboard />} />
              <Route path="/dashboardpage/proyectos" element={<Projects />} />
              <Route path="/dashboardpage/proyectos/:id" element={<ProjectDetails />} />
              <Route path="/dashboardpage/clientes" element={<Clients />} />
              <Route path="/dashboardpage/contratos" element={<Contracts />} />
              <Route path="/dashboardpage/perfil" element={<Profile />} />
            </Route>
            
            <Route element={<Navbar />}>
              <Route path="/nuevocliente" element={
                <ProtectedRoute>
                  <div className="flex-grow">
                    <NewClient />
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/nuevocliente/nuevoproyecto" element={
                <ProtectedRoute>
                  <div className="flex-grow">
                    <NewProject />
                  </div>
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </RecoveryContext.Provider>
  );
}

// Landing page component
const Landing = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold mb-6">Bienvenido a FreelanceHub</h1>
    <p className="text-xl mb-8">La plataforma para gestionar tus proyectos freelance de manera eficiente</p>
    <div className="flex justify-center gap-4">
      <button 
        onClick={() => window.location.href = '/login'} 
        className="px-6 py-3 bg-primary text-white rounded-md"
      >
        Iniciar Sesión
      </button>
      <button 
        onClick={() => window.location.href = '/registro'} 
        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md"
      >
        Registrarse
      </button>
    </div>
  </div>
);

// 404 page component
const NotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold mb-6">404 - Página no encontrada</h1>
    <p className="text-xl mb-8">La página que estás buscando no existe o ha sido movida.</p>
    <button 
      onClick={() => window.location.href = '/'} 
      className="px-6 py-3 bg-primary text-white rounded-md"
    >
      Volver al inicio
    </button>
  </div>
);

export default App;
