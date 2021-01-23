import React from 'react';
import {Container, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/Base.scss';
import Popup from 'reactjs-popup';


export default class Autores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
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
            open: false,
        };
    }

    componentDidMount(){
        this.fetchRegistros()
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };

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
                    open: false,
                });
                this.fetchRegistros();
            });
    };
    
    editRegistro(){
        
    }

    updateInput(){

    }

    eliminarRegistro() {

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
                            <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                    onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                    onClick={() => {this.editRegistro(item.id_autor); this.setState({open: true,});}} variant="info">Actualizar</Button>
                          </td>
                          <td key="button2" className="align-middle">
                            <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                    onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                    onClick={() => {this.eliminarRegistro(item.id_autor)}} variant="danger">Eliminar</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
            <Button variant="info" onClick={() => {this.setState({open: true,})}}>Añadir nuevo</Button>
            <Popup open={this.state.open} onClose={() => {this.setState({open: false,});}} position="bottom center">
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
                            <FormLabel>Localidad:</FormLabel>
                            <FormControl type="text" name="localidad" placeholder="Localidad." onChange={this.handleChange} value={this.state.localidad}/>
                            <FormLabel>Teléfono:</FormLabel>
                            <FormControl type="tel" name="telefono" placeholder="Telefono (10 digitos)." onChange={this.handleChange} value={this.state.telefono}/>
                        </div>
                        <div className="propietarios">
                            <FormLabel>Provincia:</FormLabel>
                            <FormControl type="text" name="provincia" placeholder="Provincia" onChange={this.handleChange} value={this.state.provincia}/>
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