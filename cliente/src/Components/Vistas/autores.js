import React from 'react';
import {Container, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/otros.scss';
import Popup from 'reactjs-popup';
import mexico from '../../Data/México.min.json';


export default class Autores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            localidades: [],
            id_autor: "",
            nombre: "",
            apellidos: "",
            direccion: "",
            localidad: "",
            provincia: "",
            url: "",
            telefono: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
            disable_localidades: true,
            open: false,
        };
    }

    componentDidMount(){
        this.fetchRegistros();
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };

    handlePopupClose = () => {
      this.setState({
        id_autor: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        url: "",
        provincia: "",
        localidad: "",
        telefono: "",
        localidades: [],
        disable_localidades: false,
        open: false,
      });
    }

    fetchRegistros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3001/autores", {
          method: "GET",
          headers: headers,
        })
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            console.log("resultado: ", resultado);
            this.setState({
              registros: resultado.response,
            });
        })
        .catch((error) => console.log("error: ", error));
    };

    addRegistro = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_autor: this.state.id_autor,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            direccion: this.state.direccion,
            localidad: this.state.localidad,
            provincia: this.state.provincia,
            url: this.state.url,
            telefono: this.state.telefono,
        })
        fetch("http://localhost:3001/autores/insert", {        //revisar que efectivamente sea ../insert
            method: "POST",
            headers: headers,
            body: body
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);    
                this.setState({
                    id_autor: "",
                    nombre: "",
                    apellidos: "",
                    direccion: "",
                    localidad: "",
                    url: "",
                    telefono: "",
                    alerta: true,
                    msgAlerta: resultado.response,
                    tipoAlerta: "success",
                    disable_localidades: true,
                    open: false,
                });
                this.fetchRegistros();
            });
    };

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

    editControl = (item) => {
      console.log(item);
      this.setState({
        id_autor: item.id_autor,
        nombre: item.nombre,
        apellidos: item.apellidos,
        direccion: item.direccion,
        url: item.url,
        provincia: item.provincia,
        localidad: item.localidad,
        telefono: item.telefono,
        disable_localidades: false,
        open: true,
      });

    }
    
    editRegistro(){
        
    }

    updateInput(){

    }

    eliminarRegistro(id) {

    }

/************************************************************************************************************************/

    render(){
        return(
            <div className="main">
            <Container>
            <h1 className="h1">Autores</h1>
              {
                this.state.alerta === true ? (
                  <Alert variant={this.state.tipoAlerta} onClose={() => {
                    this.setState({
                      alerta: false,
                    })
                  }} dismissible>
                    <Alert.Heading>{this.state.msgAlerta}</Alert.Heading>
                  </Alert>
                ) : null}
              <Row>
                <Table striped bordered hover size="sm" >
                  <thead>
                    <tr>
                      <th className="align-middle">Nombre</th>
                      <th className="align-middle">Apellidos</th>
                      <th className="align-middle">Dirección</th>
                      <th className="align-middle">Localidad</th>
                      <th className="align-middle">Provincia</th>
                      <th className="align-middle">URL</th>
                      <th className="align-middle">Telefono</th>
                      <th className="align-middle" colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item) => {
                      return (
                        <tr onClickCapture={() => this.updateInput(item)} key={item.id_autor}>
                          <td className="align-middle">{item.nombre}</td>
                          <td className="align-middle">{item.apellidos}</td>
                          <td className="align-middle">{item.direccion}</td>
                          <td className="align-middle">{item.localidad}</td>
                          <td className="align-middle">{item.provincia}</td>
                          <td className="align-middle">{item.url}</td>
                          <td className="align-middle">{item.telefono}</td>
                          <td className="align-middle">
                            <Button onClick={() => {this.editControl(item)}} variant="info">Actualizar</Button>
                          </td>
                          <td key="button2" className="align-middle">
                            <Button onClick={() => {this.eliminarRegistro(item.id_libro)}} variant="danger">Eliminar</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
            <Button variant="info" onClick={() => {this.setState({open: true,})}}>Añadir nuevo</Button>
            <Popup open={this.state.open} onClose={() => {this.handlePopupClose()}} position="bottom center">
                <div className = "popup-root">
                    <h2>Registro de autor</h2><hr></hr>
                    <Container className="contenedor-2">
                        <div className="largos">
                            <FormLabel>Nombre(s):</FormLabel>
                            <FormControl type="text" name="nombre" placeholder="Nombre." onChange={this.handleChange} value={this.state.nombre} required={true}/>
                            <FormLabel>Apellidos:</FormLabel>
                            <FormControl type="text" name="apellidos" placeholder="Apellidos." onChange={this.handleChange} value={this.state.apellidos} required={true}/>
                            <FormLabel>Dirección:</FormLabel>
                            <FormControl type="text" name="direccion" placeholder="Dirección." onChange={this.handleChange} value={this.state.direccion} required={true}/>
                            <FormLabel>URL:</FormLabel>
                            <FormControl type="url" name="url" placeholder="URL para contactar al autor." onChange={this.handleChange} value={this.state.url}/>    
                        </div>
                    </Container>
                    <Container className="contenedor-1">
                        <div className="propietarios">
                            <FormLabel>Provincia:</FormLabel>
                            <FormControl as="select" name="provincia" placeholder="Provincias" onChange={this.estadoChange} value={this.state.provincia}>
                              <option></option>
                              {mexico.map((estado, index) => {
                                return (
                                  <option key={index}>{estado.nombre}</option>
                                );
                              })}
                            </FormControl>
                            <FormLabel>Teléfono:</FormLabel>
                            <FormControl type="tel" name="telefono" placeholder="Telefono (10 digitos)." onChange={this.handleChange} value={this.state.telefono}/>
                        </div>
                        <div className="propietarios">
                            <FormLabel>Localidad:</FormLabel>
                            <FormControl as="select" disabled={this.state.disable_localidades} name="localidad" placeholder="Localidades" onChange={this.handleChange} value={this.state.localidad}>
                            {
                              this.state.localidades.map((localidad, index) => {
                                return(
                                  <option key={index}>{localidad}</option>
                                );
                              })}
                            </FormControl>
                        </div>
                    </Container>
                    <Button type="submit" onClick={this.addRegistro} variant="primary" block>
                        Agregar autor
                    </Button><br></br>
                </div>
                </Popup>
            </div>
        );
    }
}