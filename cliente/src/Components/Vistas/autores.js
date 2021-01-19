import React from 'react';
import {Container, Image,Form, FormControl, FormLabel, Button, Alert, Col, DropdownButton, InputGroup,ListGroup} from 'react-bootstrap';
import '../../SCSS/libro.scss'

export default class Autores extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
        };
        this.fetchRegistros();
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

    render(){
        return(
            <div className = "main">
                <h2>Registro de autor</h2><hr></hr>
                <Container className="contenedor-2">
                    <div className="largos">
                        <FormLabel>Nombre(s):</FormLabel>
                        <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre}  required={true}/>
                        <FormLabel>Apellidos:</FormLabel>
                        <FormControl type="text" name="apellidos" placeholder="Ingrese los apellidos." onChange={this.handleChange} value={this.state.apellidos} required={true}/>
                        <FormLabel>Dirección:</FormLabel>
                        <FormControl type="text" name="direccion" placeholder="Ingrese la dirección." onChange={this.handleChange} value={this.state.direccion} required={true}/>
                        <FormLabel>URL:</FormLabel>
                        <FormControl type="url" name="url" placeholder="Ingrese el url para contactar al autor." onChange={this.handleChange} value={this.state.url}/>    
                    </div>
                </Container>
                <Container className="contenedor-1">
                    <div className="propietarios">
                        <FormLabel>Localidad:</FormLabel>
                        <FormControl type="text" name="localidad" placeholder="Ingrese la localidad." onChange={this.handleChange} value={this.state.localidad}/>
                        <FormLabel>Teléfono:</FormLabel>
                        <FormControl type="tel" name="telefono" placeholder="Ingrese el telefono de 10 digitos." onChange={this.handleChange} value={this.state.telefono}/>
                    </div>
                    <div className="propietarios">
                        <FormLabel>Provincia:</FormLabel>
                        <FormControl type="text" name="provincia" placeholder="Ingrese la provincia" onChange={this.handleChange} value={this.state.provincia}/>
                    </div>
                </Container>
                <Button type="submit" onClick={this.addRegistro} variant="primary" block>
                    Agregar autor
                </Button><br></br>
            </div>
        );
    }
}