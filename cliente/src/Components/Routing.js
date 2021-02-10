import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './Vistas/main';
import Libros from './Vistas/libros';
import Libros_ from './Vistas/libros_2';
import Autores from './Vistas/autores';
import Editoriales from './Vistas/editoriales';
import Almacenes from './Vistas/almacenes';
import LibrosAlmacen from './Vistas/librosAlmacen';
import Login from './Vistas/Login';
import Register from './Vistas/Register'; 
import Clientes from './Vistas/clientes'; 
import Carrito from './Vistas/carrito';
import NavBar from './navBar'; 
import ProtectedRoute from './ProtectedRoutes';
import { UserContext } from './userContext';
import { useState, useEffect } from 'react';

export default function Rutas() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage["appState"]).isLoggedIn);
    console.log(JSON.parse(localStorage["appState"]).isLoggedIn);
  }, []);

  return (
    <div className="App">
        <Router>
            <UserContext.Provider value={{user, setUser}}>
              <NavBar></NavBar>
              <Switch>
                  <Route exact path="/" component={Login}></Route>
                  {/*<Route path="/login" component={Login}></Route>*/}
                  <Route path="/register" component={Register}></Route>
                  <ProtectedRoute path="/main" component={Main}></ProtectedRoute>
                  <ProtectedRoute path="/libros" component={Libros}></ProtectedRoute>
                  <ProtectedRoute path="/libros2" component={Libros_}></ProtectedRoute>
                  <ProtectedRoute path="/autores" component={Autores}></ProtectedRoute>
                  <ProtectedRoute path="/editoriales" component={Editoriales}></ProtectedRoute>
                  <ProtectedRoute path="/clientes" component={Clientes}></ProtectedRoute>
                  <ProtectedRoute path="/almacenes" component={Almacenes}></ProtectedRoute>
                  <ProtectedRoute path="/librosAlmacen" component={LibrosAlmacen}></ProtectedRoute>
                  <ProtectedRoute path="/carrito" component={Carrito}></ProtectedRoute>
                  <Route path="/*" component= {() => {return <div style={{paddingTop: "60px"}}>"404 not found!"</div>}}></Route>
              </Switch>
            </UserContext.Provider>
        </Router>
    </div>
  );
}
