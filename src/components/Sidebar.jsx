import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Users, FileText, LogOut } from 'lucide-react';
import { Modal } from './ui/Modal';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    function cerrarSesion() {
        localStorage.removeItem('usuario_email');
        localStorage.removeItem('usuario_id');
        setShowLogoutModal(false);
        navigate('/login', { state: { message: 'Sesión cerrada correctamente' } });
    }

    const usuarioEmail = localStorage.getItem('usuario_email');

    const navItems = [
        { to: '/dashboardpage', icon: Home, label: 'Home' },
        { to: '/dashboardpage/proyectos', icon: Briefcase, label: 'Proyectos' },
        { to: '/dashboardpage/clientes', icon: Users, label: 'Clientes' },
        { to: '/dashboardpage/contratos', icon: FileText, label: 'Contratos' },
    ];

    return (
        <>
            <div className="flex">
                <div className="sidebar min-h-screen bg-[#003598] text-white p-4 flex flex-col items-center md:items-start fixed w-[90px] md:w-[200px] transition-all duration-300">
                    <h1 className="hidden md:block text-lg font-semibold mb-2 text-white">
                        Tu Panel de Proyectos
                    </h1>
                    {usuarioEmail && (
                        <p className="text-sm text-gray-200 mb-4 hidden md:block truncate w-full">
                            {usuarioEmail}
                        </p>
                    )}

                    <nav className="flex flex-col items-center md:items-start w-full mt-4 space-y-2" role="navigation" aria-orientation="vertical">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.to;

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
                                        transition-colors duration-200
                                        ${isActive
                                            ? 'bg-white/20 text-white font-medium'
                                            : 'text-gray-200 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon className="w-6 h-6 flex-shrink-0" />
                                    <span className="hidden md:inline">{item.label}</span>
                                </Link>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setShowLogoutModal(true)}
                            className="
                                flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
                                text-gray-200 hover:bg-white/10 hover:text-white
                                transition-colors duration-200 mt-4
                            "
                        >
                            <LogOut className="w-6 h-6 flex-shrink-0" />
                            <span className="hidden md:inline">Cerrar Sesión</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Modal de confirmación usando el componente Modal moderno */}
            <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Cerrar Sesión"
            >
                <div className="p-4">
                    <p className="text-gray-700 mb-6">
                        ¿Estás seguro de que deseas cerrar sesión?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowLogoutModal(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={cerrarSesion}
                            className="px-4 py-2 bg-[#003598] text-white rounded-lg hover:bg-[#002570] transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Sidebar;
