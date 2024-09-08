import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem('usuario_email');
        localStorage.removeItem('usuario_id');
        navigate('/login', { state: { message: 'Sesión cerrada correctamente' } });
    }

    const usuarioEmail = localStorage.getItem('usuario_email');

    return (
        <div className="Dashboard d-flex">
            <div className="sidebar p-3 d-flex flex-column align-items-center align-items-md-start">
                <h1 className="d-none d-md-block">Tu Panel de Proyectos</h1>
                {usuarioEmail && <p className="d-none d-md-block">{usuarioEmail}</p>}
                <div className="nav d-flex align-items-center flex-column nav-pills mt-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <Link to="/dashboardpage" className={`nav-link ${location.pathname === '/dashboardpage' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-house pe-2 pb-1" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                        <span className="d-none d-md-inline">Home</span>
                    </Link>
                    <Link to="/dashboardpage/proyectos" className={`nav-link ${location.pathname === '/dashboardpage/proyectos' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-kanban pe-2 pb-1" viewBox="0 0 16 16">
                            <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" />
                        </svg>
                        <span className="d-none d-md-inline">Proyectos</span>
                    </Link>
                    <Link to="/dashboardpage/clientes" className={`nav-link ${location.pathname === '/dashboardpage/clientes' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-person pe-2 pb-1" viewBox="0 0 16 16">
                            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z" />
                        </svg>
                        <span className="d-none d-md-inline">Clientes</span>
                    </Link>
                    <Link to="/dashboardpage/contratos" className={`nav-link ${location.pathname === '/dashboardpage/contratos' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-text pe-2 pb-1" viewBox="0 0 16 16">
                            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        </svg>
                        <span className="d-none d-md-inline">Contratos</span>
                    </Link>
                    <button type="button" className="btn" id="btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right pe-2 pb-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                            <path fillRule="evenodd" d="M14.354 7.854a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L13.293 7H5.5a.5.5 0 0 0 0 1h7.793l-2.647 2.646a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                        <span className="d-none d-md-inline">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas cerrar sesión?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={cerrarSesion} data-bs-dismiss="modal">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;