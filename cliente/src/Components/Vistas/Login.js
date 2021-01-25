import React from 'react';
//Importar el archivo que maneja la encriptacion de datos que se enviaran al lado del servidor!.
import { encrypt } from '../EncryptionHandler';
import '../../SCSS/Login.scss';
import Authentication from '../Authentication';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: null,
        email: "",
        contrasena: "",
        nombre: '',
    }; 
  } 

  render() {
    return (
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} action="http://localhost:8000/login">
          <label for="email">Correo Electronico</label>
          <input value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="Ingrese correo electronico"></input>
          <label for="password">Contraseña</label>
          <input value={this.state.contrasena} onChange={this.handleChange} name="contrasena" type="password" placeholder="Ingrese la contraseña"></input>
          <input type="submit" value="Log In"></input>
          <a href="#">Olvidaste tu contraseña?</a><br></br>
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
      });
      Authentication.login(() => {
        this.props.history.push(`${this.state.redirect}`);
      })
    })
    .catch((err) => console.log("Error: ", err));
  };

};
