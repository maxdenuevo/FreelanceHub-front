import React, { useState } from 'react';

function Dashboard() {

  return (
    <div className='Dashboard'>
      <h1 className='form-title mt-5'>Tu Panel de Proyectos</h1>
      <div className="d-flex justify-content-around align-items-center m-5">
        <div>
          <label htmlFor="project-select" className="form-label">Selecciona un Proyecto:</label>
          <select id="project-select" className="form-select">
            <option value="">Selecciona un proyecto...</option>
            <option value="1">Proyecto 1</option>
            <option value="2">Proyecto 2</option>
            <option value="3">Proyecto 3</option>
          </select>
        </div>
        <button id="nuevoproyecto-btn" className="btn">Nuevo Proyecto</button>
      </div>
      <div class="d-flex align-items-start">
  <div class="nav flex-column nav-pills mt-5 me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className="nav-link active" id="v-pills-proyectos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-proyectos" type="button" role="tab" aria-controls="v-pills-proyectos" aria-selected="true">Proyectos</button>
        <button className="nav-link" id="v-pills-tareas-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tareas" type="button" role="tab" aria-controls="v-pills-tareas" aria-selected="false">Tareas</button>
        <button className="nav-link" id="v-pills-contratos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-contratos" type="button" role="tab" aria-controls="v-pills-contratos" aria-selected="false">Contratos</button>
        <button className="nav-link" id="v-pills-pagos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-pagos" type="button" role="tab" aria-controls="v-pills-pagos" aria-selected="false">Pagos</button>
  </div>
  <div class="tab-content mt-5" id="v-pills-tabContent">
    <div class="tab-pane fade show active" id="v-pills-proyectos" role="tabpanel" aria-labelledby="v-pills-proyectos-tab" tabindex="0">...</div>
    <div class="tab-pane fade" id="v-pills-tareas" role="tabpanel" aria-labelledby="v-pills-tareas-tab" tabindex="0">...</div>
    <div class="tab-pane fade" id="v-pills-contratos" role="tabpanel" aria-labelledby="v-pills-contratos-tab" tabindex="0">...</div>
    <div class="tab-pane fade" id="v-pills-pagos" role="tabpanel" aria-labelledby="v-pills-pagos-tab" tabindex="0">...</div>
  </div>
</div>
</div>
  );
}

export default Dashboard;