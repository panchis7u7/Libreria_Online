import React from 'react';
import {Container,Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/otros.scss'
import Popup from 'reactjs-popup';
import mexico from '../../Data/México.min.json';

export default class Editoriales extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            localidades: [],
            id_cliente: "",
            nombre: "",
            apellidos: "",
            direccion: "",
            email: "",
            localidad: "",
            provincia: "",
            telefono: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
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
        fetch("http://localhost:8000/clientes", {
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

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Clientes</h1>
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
                      <th className="align-middle">Email</th>
                      <th className="align-middle">Localidad</th>
                      <th className="align-middle">Provincia</th>
                      <th className="align-middle">Telefono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item) => {
                      return (
                        <tr onClickCapture={() => this.updateInput(item)} key={item.id_cliente}>
                          <td className="align-middle">{item.nombre}</td>
                          <td className="align-middle">{item.apellidos}</td>
                          <td className="align-middle">{item.direccion}</td>
                          <td className="align-middle">{item.email}</td>
                          <td className="align-middle">{item.localidad}</td>
                          <td className="align-middle">{item.provincia}</td>
                          <td className="align-middle">{item.telefono}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
            </div>
        );
    }
}