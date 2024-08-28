import Sidebar from './Sidebar';
import Proyectos from './Proyectos';
import Contratos from './Contratos';
import Home from './Home';

  function Dashboard() {

  return (
    <div className="dashboard d-flex">
    <Sidebar />
    <div className="tab-content mt-5" id="v-pills-tabContent">
        <div className="tab-pane fade" id="v-pills-proyectos" role="tabpanel" aria-labelledby="v-pills-proyectos-tab" tabIndex="0">
            <Proyectos />
        </div>
        <div className="tab-pane fade" id="v-pills-contratos" role="tabpanel" aria-labelledby="v-pills-contratos-tab" tabIndex="0">
            <Contratos />
        </div>
        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
          <Home />
        </div>
    </div>     
</div>
  );
}

export default Dashboard;