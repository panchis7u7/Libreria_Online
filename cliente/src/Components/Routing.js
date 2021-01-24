import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './Vistas/main'
import Libros from './Vistas/libros';
import Autores from './Vistas/autores';
import Editoriales from './Vistas/editoriales';
import Almacenes from './Vistas/almacenes';
import LibrosAlmacen from './Vistas/librosAlmacen';
import Login from './Vistas/Login';
import NavBar from './navBar';

export default function Rutas() {
  return (
    <div className="App">
      <Router key="">
        <NavBar></NavBar>
        <Switch key="">
          <Route exact path="/" key="" component={Login}></Route>
          <Route path="/main" key="" component={Main}></Route>
          <Route path="/libros" key="" component={Libros}></Route>
          <Route path="/autores" key="" component={Autores}></Route>
          <Route path="/editoriales" key="" component={Editoriales}></Route>
          <Route path="/almacenes" key="" component={Almacenes}></Route>
          <Route path="/librosAlmacen" key="" component={LibrosAlmacen}></Route>
        </Switch>
      </Router>
    </div>
  );
}
