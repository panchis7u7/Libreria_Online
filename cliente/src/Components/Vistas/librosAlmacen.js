import React from 'react';
import {Container,Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/Base.scss'
import Popup from 'reactjs-popup';

export default class Almacenes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            almacenes: [],
            libros: [],
            autores: [],
            id_libro: "",
            id_almacen: "",
            titulo: "",
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
        this.fetchAlmacenes();
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
        titulo: "",
        nombre_alm: "",
        autor: "",
        stock: "",
        disable_localidades: true,
        open: false,
        update: false,
        update_message: "Agregar libro en almacen",
      });
    }

    fetchAlmacenes = () => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
        fetch("http://localhost:8000/librosAlmacenados", {
          method: "GET",
          headers: headers,
      })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log("resultado: ", resultado);
        this.setState({
          almacenes: resultado,
        });
    })
      .catch((error) => console.log("error: ", error));
    };

    fetchRegistros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch(`http://localhost:8000/librosAlmacen`, {
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

    addRegistro = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_libro: this.state.id_libro,
            id_almacen: this.state.id_almacen,
            stock: this.state.stock,
        })
        console.log("A enviar: ",body);
        fetch("http://localhost:8000/librosAlmacen", {        //revisar que efectivamente sea ../insert
            method: "POST",
            headers: headers,
            body: body
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);     //para verificar que se haya recibido
                this.setState({
                    id_libro: "",
                    id_almacen: "",
                    stock: "",
                    alerta: true,
                    sgAlerta: resultado.status,
                    tipoAlerta: "success",
                    disable_localidades: true,
                    open: false,
                });
                this.fetchRegistros();
            });
    };
    
    eliminarRegistro(id_almacen) {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(`http://localhost:8000/librosAlmacen/${id_almacen}`, {        //revisar que efectivamente sea ../insert
          method: "DELETE",
          headers: headers,
          body: JSON.stringify({})
      }).then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log(resultado);    
            this.setState({
                id_almacen: "",
                id_libro: "",
                stock: "",
                alerta: true,
                msgAlerta: resultado.status,
                tipoAlerta: "success",
                disable_localidades: true,
                open: false,
                update: false,
            });
            this.fetchRegistros();
        });
    }

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Libros almacenados</h1><hr></hr><br></br>
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
              <FormLabel>Almacén:</FormLabel>                
              <FormControl as="select" name="nombre_alm" placeholder="Nombre de almacen" onChangeCapture={this.handleChange} value={this.state.nombre_alm}>
                  {this.state.almacenes.map((item, index) =>{
                    return (
                      <option key={index}>{item.nombre}</option>
                    );
                  })
                }
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
                    {this.state.registros.map((item, index) => {
                      return (
                        <tr key={item.id_libro}>
                          <td className="align-middle">{index+1}</td>
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
                        <h2>Registro de libro en almacén</h2><hr></hr>
                        <Container className="contenedor-2">
                            <div className="largos">
                                <FormLabel>Autor:</FormLabel>
                                <FormControl as="select" name="autor" placeholder="Nombre de autor" onChangeCapture={this.handleChange} value={this.state.autor}>
                                </FormControl>
                                <FormLabel>Titulo:</FormLabel>
                                <FormControl as="select" name="titulo" placeholder="Título." onChangeCapture={this.handleChange} value={this.state.titulo} required={true}/>
                                <FormLabel>Libros en stock:</FormLabel>
                                <FormControl type="number" name="stock" placeholder="Cantidad de libros en stock" onChange={this.handleChange} value={this.state.stock} required={true}/>
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