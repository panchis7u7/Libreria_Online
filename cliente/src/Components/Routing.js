import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './Vistas/main'
import Libros from './Vistas/libros';
import Autores from './Vistas/autores';
import Editoriales from './Vistas/editoriales';
import NavBar from './navBar';

export default function Rutas() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/libros" component={Libros}></Route>
          <Route path="/autores" component={Autores}></Route>
          <Route path="/editoriales" component={Editoriales}></Route>
        </Switch>
      </Router>
    </div>
  );
}
