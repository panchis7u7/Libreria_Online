import React from 'react';
//Importar el archivo que maneja la encriptacion de datos que se enviaran al lado del servidor!.
import { encrypt } from '../EncryptionHandler';
import '../../SCSS/Register.scss';
import mexico from '../../Data/México.min.json';


export default class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        localidades: [],
        redirect: null,
        nombre: "",
        apellidos: "",
        direccion: "",
        email: "",
        telefono: "",
        provincia: "",
        localidad: "",
        contrasena: "",
        recontrasena: "",
        disable_localidades: true,
    }; 
  } 

  estadoChange = (e) => {
    this.handleChange(e);
    if (e.target.value !== ''){
      var municipios = mexico.find(item => item.nombre === e.target.value).municipios;
      var nombres = [];
      municipios.forEach(element => {
        nombres.push(element.nombre);
      });
      this.setState({localidades: nombres, disable_localidades: false});
      } else {
        this.setState({localidades: [], disable_localidades: true});
      }
  }

  render() {
    return (
      <div className="register-box">
        <h2>Registrar</h2>
        <form onSubmit={this.handleSubmit} action="http://localhost:8000/clientes">
        <div className="form-row">
            <div className="form-group col">
              <label htmlFor="nombre">Nombre</label>
              <input value={this.state.nombre} onChange={this.handleChange} name="nombre" type="text" placeholder="Ingrese su nombre" required></input>
            </div>
            <div className="form-group col">
              <label htmlFor="apellidos">Apellidos</label>
              <input value={this.state.apellidos} onChange={this.handleChange} name="apellidos" type="text" placeholder="Ingrese sus apeliidos" required></input>
            </div>
          </div>
          <label htmlFor="direccion">Direccion</label>
              <input value={this.state.direccion} onChange={this.handleChange} name="direccion" type="text" placeholder="Ingrese su direccion" required></input>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="email">Email</label>
              <input value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="Ingrese su correo electronico" required></input>
            </div>
            <div className="form-group col">
              <label htmlFor="provincia">Provincia</label>
              <select value={this.state.provincia} onChange={this.estadoChange} name="provincia" type="text" placeholder="Ingrese su provincia">
              <option></option>
              {mexico.map((estado, index) => {
                  return (
                    <option key={index}>{estado.nombre}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="telefono">Telefono</label>
              <input value={this.state.telefono} onChange={this.handleChange} name="telefono" type="text" placeholder="Ingrese su telefono"></input>
            </div>
            <div className="form-group col">
              <label htmlFor="localidad">Localidad</label>
              <select value={this.state.localidad} onChange={this.handleChange} name="localidad" type="text" placeholder="Ingrese su localidad" disabled={this.state.disable_localidades}>
              <option></option>
              {this.state.localidades.map((localidad, index) => {
                return(
                  <option key={index}>{localidad}</option>
                );
              })}
              </select>
            </div>
          </div>
          <label htmlFor="password">Contraseña</label>
          <input value={this.state.contrasena} onChange={this.handleChange} name="contrasena" type="password" placeholder="Ingrese la contraseña" required></input>
          <label htmlFor="password">ReIngrese la contraseña</label>
          <input value={this.state.recontrasena} onChange={this.handleChange} name="recontrasena" type="password" placeholder="Reingrese la contraseña" required></input>
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
        contrasena: this.state.contrasena,
        provincia: this.state.provincia,
        localidad: this.state.localidad,
    });
    console.log(body);
    fetch("http://localhost:8000/clientes", {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        redirect: resultado.redirect,
        nombre: "",
        apellidos: "",
        direccion: "",
        email: "",
        telefono: "",
        contrasena: "",
        provincia: "",
        localidad: "",
      });
      this.props.history.push(`${this.state.redirect}`);
    })
    .catch((err) => console.log("Error: ", err));
  };

};
