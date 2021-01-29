import React from 'react';
//Importar el archivo que maneja la encriptacion de datos que se enviaran al lado del servidor!.
import '../../SCSS/Login.scss';
import { UserContext } from '../userContext';

export default class Login extends React.Component{
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
        redirect: null,
        id_cliente: 0,
        email: "",
        contrasena: "",
        nombre: '',
        isLoggedIn: false,
        formSubmiting: false,
    }; 
  } 

  componentDidMount(){
    let state = localStorage["appState"];
    if(state) {
      let AppState = JSON.parse(state);
      this.setState({
        isLoggedIn: AppState.isLoggedIn, 
        email: AppState.user.email,
        id_cliente: AppState.user.id_cliente,
        nombre: AppState.user.nombre,
      })
    }
  }

  render() {
    return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} action="http://localhost:8000/login">
          <label htmlFor="email">Correo Electronico</label>
          <input value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="Ingrese correo electronico"></input>
          <label htmlFor="password">Contraseña</label>
          <input value={this.state.contrasena} onChange={this.handleChange} name="contrasena" type="password" placeholder="Ingrese la contraseña"></input>
          <input type="submit" value="Log In"></input>
          <a href="/">Olvidaste tu contraseña?</a><br></br>
          <a href="/register">No tienes una cuenta?</a>
        </form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { setUser } = this.context;
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let body = JSON.stringify({
      email: this.state.email, 
      contrasena: this.state.contrasena
    });
    console.log(body);
    fetch("http://localhost:8000/login", {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
          redirect: resultado.redirect,
          nombre: resultado.nombre,
          isLoggedIn: resultado.success,
          id_cliente: resultado.id_cliente,
      });
      if(resultado.status_code === 1){
        setUser(true);
        let appState = {
          isLoggedIn: true,
          user: {
            email: resultado.email,
            nombre: resultado.nombre,
            id_cliente: resultado.id_cliente,
          }
        };
        localStorage["appState"] = JSON.stringify(appState);
      } else {
        setUser(false);
        let appState = {
          isLoggedIn: false,
          user: {
            email: "",
            nombre: "",
            id_cliente: resultado.id_cliente,
          }
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isLoggedIn: appState.isLoggedIn,
        })
      }
      this.props.history.push(resultado.redirect, resultado);
    })
    .catch((err) => console.log("Error: ", err));
  };

};
