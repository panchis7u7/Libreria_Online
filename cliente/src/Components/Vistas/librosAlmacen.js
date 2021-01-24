import React from 'react';
import {Container,Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/otros.scss'
import Popup from 'reactjs-popup';

export default class Almacenes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            id_libro: "",
            id_almacen: "",
            nombre_lib: "",
            nombre_alm: "",
            autor: "",
            editorial: "",
            isbn: "",
            stock: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
            open: false,
            update: false,
            update_message: 'Agregar libro en almacen',
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
        id_libro: "",
        id_almacen: "",
        nombre_lib: "",
        nombre_alm: "",
        autor: "",
        editorial: "",
        isbn: "",
        stock: "",
        disable_localidades: true,
        open: false,
        update: false,
        update_message: "Agregar libro en almacen",
      });
    }

    editControl = (item) => {
      this.setState({
        id_libro: item.id_libro,
        id_almacen: item.id_almacen,
        nombre_lib: item.nombre_lib,
        nombre_alm: item.nombre_alm,
        autor: item.autor,
        editorial: item.editorial,
        isbn: item.isbn,
        stock: item.stock,
        update: true,
        update_message: "Actualizar libro en almacen",
        open: true,
      });           //revisar a partir de aqui hasta el render
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
              registros: resultado.response,
            });
        })
        .catch((error) => console.log("error: ", error));
    };

    addRegistro = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_editorial: this.state.id_editorial,
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
                    sgAlerta: resultado.status,
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

    eliminarRegistro() {

    }

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Libros almacenados</h1>
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
              <FormLabel>Almacen:</FormLabel>
                    <FormControl as="select" name="autor">
                        <option value="">ejemplo1</option>
                        <option value="">ejemplo2</option>
                    </FormControl>
              <Row>
                <Table striped bordered hover size="sm" >
                  <thead>
                    <tr>
                      <th className="align-middle">Titulo</th>
                      <th className="align-middle">ISBN</th>
                      <th className="align-middle">Autor</th>
                      <th className="align-middle">Editorial</th>
                      <th className="align-middle">Libros en stock</th>
                      <th className="align-middle">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item) => {
                      return (
                        <tr key={item.id_libro}>
                          <td className="align-middle">{item.titulo}</td>
                          <td className="align-middle">{item.isbn}</td>
                          <td className="align-middle">{item.autor}</td>
                          <td className="align-middle">{item.editorial}</td>
                          <td className="align-middle">{item.stock}</td>
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
            <Button variant="info" onClick={() => {this.setState({open: true,})}}>Añadir libro en almacen</Button>
            <Popup open={this.state.open} onClose={() => {this.handlePopupClose()}} position="bottom center">
                    <Form className = "popup-root" action="http://localhost:3001/libroAlmacen" onSubmit={(e) => {this.state.update ?  this.editRegistro(e) : this.addRegistro(e)}}>
                        <h2>Registro de almacén</h2><hr></hr>
                        <Container className="contenedor-2">
                            <div className="largos">
                                <FormLabel>Almacen:</FormLabel>
                                <FormControl as="select" name="nombre_alm" placeholder="Nombre de almacen" onChangeCapture={this.estadoChange} value={this.state.nombre_alm}>
                                </FormControl>
                                <FormLabel>Titulo:</FormLabel>
                                <FormControl type="text" name="titulo" placeholder="Título." onChange={this.handleChange} value={this.state.titulo} required={true}/>
                                <FormLabel>ISBN:</FormLabel>
                                <FormControl type="text" name="isbn" placeholder="ISBN." onChange={this.handleChange} value={this.state.isbn} required={true}/>
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