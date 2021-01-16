import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './Vistas/main'
import Libros from './Vistas/libros';
import NavBar from './navBar';

export default function Rutas() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route path="/libros" component={Libros}></Route>
        </Switch>
      </Router>
    </div>
  );
}
