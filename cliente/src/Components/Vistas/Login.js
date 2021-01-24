import React from 'react';
//Importar el archivo que maneja la encriptacion de datos que se enviaran al lado del servidor!.
import { encrypt } from '../EncryptionHandler';
import '../../SCSS/Login.scss';


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: null,
        user: "",
        password: "",
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
          <input value={this.state.password} onChange={this.handleChange} name="password" type="password" placeholder="Enter Password"></input>
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
    let body = JSON.stringify({user: this.state.user, password: encrypt(this.state.password)});
    console.log(body);
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      this.setState({
          redirect: resultado.redirect,
          user: resultado.user,
      });
      this.props.history.push(`${this.state.redirect}`, {user: this.state.user});
    })
    .catch((err) => console.log("Error: ", err));
  };

};

export default Login;
