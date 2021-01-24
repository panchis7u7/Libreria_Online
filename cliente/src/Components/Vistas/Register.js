import React from 'react';
//Importar el archivo que maneja la encriptacion de datos que se enviaran al lado del servidor!.
import { encrypt } from '../EncryptionHandler';
import '../../SCSS/Register.scss';


export default class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: null,
        nombre: "",
        apellidos: "",
        direccion: "",
        email: "",
        telefono: "",
        password: "",
        repassword: "",
    }; 
  } 

  render() {
    return (
      <div className="register-box">
        <h2>Registrar</h2>
        <form onSubmit={this.handleSubmit} action="http://localhost:8000/login">
          <label for="nombre">Nombre</label>
          <input value={this.state.nombre} onChange={this.handleChange} name="nombre" type="text" placeholder="Ingrese su nombre"></input>
          <label for="apellidos">Nombre</label>
          <input value={this.state.apellidos} onChange={this.handleChange} name="apellidos" type="text" placeholder="Ingrese sus apeliidos"></input>
          <label for="email">Email</label>
          <input value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="Ingrese su correo electronico"></input>
          <label for="telefono">Telefono</label>
          <input value={this.state.telefono} onChange={this.handleChange} name="telefono" type="text" placeholder="Ingrese su telefono"></input>
          <label for="password">Contraseña</label>
          <input value={this.state.password} onChange={this.handleChange} name="password" type="password" placeholder="Ingrese la contraseña"></input>
          <label for="password">ReIngrese la contraseña</label>
          <input value={this.state.repassword} onChange={this.handleChange} name="repassword" type="password" placeholder="Reingrese la contraseña"></input>
          <input type="submit" value="Registrar"></input>
          <a href="/">Ya tienes una cuenta?</a><br></br>
          <a href="#">Olvidaste tu contraseña?</a>
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
        nombre: this.state.nombre,
        apellidos: this.state.apellidos,
        direccion: this.state.direccion,
        email: this.state.email,
        telefono: this.state.telefono,
        password: this.state.password,
    });
    console.log(body);
    fetch("http://localhost:8000/register", {
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
