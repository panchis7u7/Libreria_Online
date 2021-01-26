import React from 'react';
import {Container,Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/Base.scss'
import Popup from 'reactjs-popup';
import mexico from '../../Data/México.min.json';

export default class Almacenes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            localidades: [],
            id_almacen: "",
            nombre: "",
            direccion: "",
            localidad: "",
            provincia: "",
            telefono: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
            disable_localidades: true,
            open: false,
            update: false,
            update_message: 'Agregar almacen',
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

    handlePopupClose = () => {
      this.setState({
        id_almacen: "",
        nombre: "",
        direccion: "",
        telefono: "",
        id_localidad: "",
        provincia: "",
        localidad: "",
        localidades: [],
        disable_localidades: true,
        open: false,
        update: false,
        update_message: "Agregar almacen",
      });
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

    editControl = (item) => {
      this.setState({
        id_almacen: item.id_almacen,
        nombre: item.nombre,
        direccion: item.direccion,
        telefono: item.telefono,
        id_localidad: item.id_localidad,
        provincia: item.provincia,
        localidad: item.localidad,
        disable_localidades: false,
        update: true,
        update_message: "Actualizar almacen",
        open: true,
      });
      const e = {
        target: {
          value: item.provincia,
        }
      }
      console.log("id: ", item.id_almacen);
      this.estadoChange(e);
    }

    fetchRegistros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:8000/almacenes", {
          method: "GET",
          headers: headers,
        })
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            console.log("resultado: ", resultado);
            this.setState({
              registros: resultado,
            });
        })
        .catch((error) => console.log("error: ", error));
    };

    addRegistro = (e) => {
        e.preventDefault();
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_almacen: this.state.id_almacen,
            nombre: this.state.nombre,
            direccion: this.state.direccion,
            localidad: this.state.localidad,
            provincia: this.state.provincia,
            telefono: this.state.telefono,
            id_localidad: this.state.id_localidad,
        })
        console.log("A enviar: ",body);
        fetch("http://localhost:8000/almacenes", {        //revisar que efectivamente sea ../insert
            method: "POST",
            headers: headers,
            body: body
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);     //para verificar que se haya recibido
                this.setState({
                    id_almacen: "",
                    nombre: "",
                    direccion: "",
                    localidad: "",
                    telefono: "",
                    alerta: true,
                    msgAlerta: resultado.status,
                    tipoAlerta: "success",
                    disable_localidades: true,
                    open: false,
                });
                this.fetchRegistros();
            });
    };
    
    editRegistro(e){
      e.preventDefault();
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var body = JSON.stringify({
          nombre: this.state.nombre,
          direccion: this.state.direccion,
          telefono: this.state.telefono,
          id_localidad: this.state.id_localidad,
          localidad: this.state.localidad,
          provincia: this.state.provincia,
      })
      console.log("A enviar actualizacion: ", body);
      fetch(`http://localhost:8000/almacenes/${this.state.id_almacen}`, {        //revisar que efectivamente sea ../insert
          method: "PUT",
          headers: headers,
          body: body
      }).then((respuesta) => respuesta.json())
          .then((resultado) => {
              console.log(resultado);    
              this.setState({
                  id_almacen: "",
                  nombre: "",
                  direccion: "",
                  provincia: "",
                  localidad: "",
                  telefono: "",
                  alerta: true,
                  msgAlerta: resultado.status,
                  tipoAlerta: "success",
                  disable_localidades: true,
                  open: false,
                  update: false,
                  update_message: 'Agregar almacen',
              });
              this.fetchRegistros();
          });
    }

  //---------------------------- BAJAS ----------------------------

    eliminarRegistro(id_almacen) {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(`http://localhost:8000/almacenes/${id_almacen}`, {        //revisar que efectivamente sea ../insert
          method: "DELETE",
          headers: headers,
          body: JSON.stringify({}),
      })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
          console.log(resultado);    
          this.setState({
            alerta: true,
            msgAlerta: resultado.status,
            tipoAlerta: "success",
          });
          this.fetchRegistros();
      });
    }

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Almacenes</h1>
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
                    <th className="align-middle">ID</th>
                      <th className="align-middle">Nombre</th>
                      <th className="align-middle">Dirección</th>
                      <th className="align-middle">Localidad</th>
                      <th className="align-middle">Provincia</th>
                      <th className="align-middle">Telefono</th>
                      <th className="align-middle" colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item, index) => {
                      return (
                        <tr key={item.id_almacen}>
                          <td className="align-middle">{index+1}</td>
                          <td className="align-middle">{item.nombre}</td>
                          <td className="align-middle">{item.direccion}</td>
                          <td className="align-middle">{item.provincia}</td>
                          <td className="align-middle">{item.localidad}</td>
                          <td className="align-middle">{item.telefono}</td>
                          <td className="align-middle">
                            <Button onClick={() => {this.editControl(item)}} variant="info">Actualizar</Button>
                          </td>
                          <td key="button2" className="align-middle">
                            <Button onClick={() => {this.eliminarRegistro(item.id_almacen)}} variant="danger">Eliminar</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Row>
            </Container>
            <Button variant="info" onClick={() => {this.setState({open: true,})}}>Añadir almacen</Button>
            <Popup open={this.state.open} onClose={() => {this.handlePopupClose()}} position="bottom center">
                    <Form className = "popup-root" action="http://localhost:8000/almacenes" onSubmit={(e) => {this.state.update ?  this.editRegistro(e) : this.addRegistro(e)}}>
                        <h2>Registro de almacén</h2><hr></hr>
                        <Container className="contenedor-2">
                            <div className="largos">
                                <FormLabel>Nombre:</FormLabel>
                                <FormControl type="text" name="nombre" placeholder="Nombre." onChange={this.handleChange} value={this.state.nombre}  required={true}/>
                                <FormLabel>Dirección:</FormLabel>
                                <FormControl type="text" name="direccion" placeholder="Dirección." onChange={this.handleChange} value={this.state.direccion} />
                                <FormLabel>Teléfono:</FormLabel>
                                <FormControl type="tel" name="telefono" placeholder="Telefono (10 digitos)." onChange={this.handleChange} value={this.state.telefono}/>
                            </div>
                        </Container>
                        <Container className="contenedor-1">
                          <div className="propietarios">
                              <FormLabel>Provincia:</FormLabel>
                              <FormControl as="select" name="provincia" placeholder="Provincias" onChangeCapture={this.estadoChange} value={this.state.provincia}>
                                <option></option>
                                {mexico.map((estado, index) => {
                                  return (
                                    <option key={index}>{estado.nombre}</option>
                                  );
                                })}
                              </FormControl>
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
                        <Button id="btnSend" type="submit" variant="primary" block>
                          {this.state.update_message}
                        </Button><br></br>
                    </Form>
                </Popup>
            </div>
        );
    }
}