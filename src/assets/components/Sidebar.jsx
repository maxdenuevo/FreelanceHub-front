import React from 'react';


function Sidebar() {
    return (
        <div className="Dashboard d-flex">
            <div className="sidebar p-3" style={{ width: "200px", height: "150vh" }}>
                <h1 className="mt-5">Tu Panel de Proyectos</h1>
                <h5>Nombre usuario</h5>
                <h6>tucorreo@gmail.com</h6>
                <div className="nav d-flex align-items-start flex-column nav-pills mt-5 me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
                    <button className="nav-link" id="v-pills-proyectos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-proyectos" type="button" role="tab" aria-controls="v-pills-proyectos" aria-selected="false">Proyectos</button>
                    <button className="nav-link" id="v-pills-contratos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-contratos" type="button" role="tab" aria-controls="v-pills-contratos" aria-selected="false">Contratos</button>
                    <button type="button" class="btn" id="btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">Cerrar Sesion</button>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-body">
                        <p className='d-flex justify-content-center'><strong>¿Seguro que desea cerrar sesion?</strong></p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn" data-bs-dismiss="modal">Cancelar</button>
                        <a class="btn" href="/login" role="button">Cerrar Sesion</a>
                        </div>
                        </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;