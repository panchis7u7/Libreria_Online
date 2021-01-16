import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Libros from './Vistas/libros';
import NavBar from './navBar';

export default function Rutas() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Libros}></Route>
          <Route path="/" component={Libros}></Route>
        </Switch>
      </Router>
    </div>
  );
}
