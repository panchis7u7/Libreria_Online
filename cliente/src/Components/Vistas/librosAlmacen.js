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
            id_autor: "",
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
      this.getAutores();
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
        console.log("name: ", evt.target.name);
        console.log("value: ", evt.target.value);
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

    almacenChange = (e) => {
      this.handleChange(e);
      this.fetchRegistros(e.target.value);
    }

    autorChange = (e) => {
      this.handleChange(e);
      if (e.target.value !== ''){
        //let autor = this.state.autores.find(item => item.id_autor === e.target.value).id_autor;
        console.log(e.target.value)
        this.getLibrosAutores(e.target.value);
      } else {
        this.setState({
          libros: [],
        })
      }
    } 

/************************************************************************************************************************/
    
    getAutores = () => {
        let headers = new Headers();
          headers.append("Content-Type", "application/json");
          fetch("http://localhost:8000/autores", {
            method: "GET",
            headers: headers,
          })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
              console.log(resultado);
                this.setState({
                  autores: resultado,
                });
          })
          .catch((error) => {
            console.log("error: ", error)
            return error;
        });
    }

    getLibrosAutores = (id_autor) => {
      let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch(`http://localhost:8000/libros/${id_autor}`, {
          method: "GET",
          headers: headers,
        })
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            console.log(resultado);
              this.setState({
                libros: resultado,
              });
        })
        .catch((error) => {
          console.log("error: ", error)
          return error;
      });
  }

    fetchAlmacenes = () => {
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
          almacenes: resultado,
        });
    })
      .catch((error) => console.log("error: ", error));
    };

    fetchRegistros = (id_almacen) => {
      if(id_almacen !== ''){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch(`http://localhost:8000/librosAlmacenados/${id_almacen}`, {
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
      } else {
        this.setState({
          registros: [],
        });
      }
    };

    addRegistro = (e) => {
        e.preventDefault();
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_almacen: this.state.id_almacen,
            id_libro: this.state.id_libro,
            stock: this.state.stock,
        })
        console.log("A enviar: ",body);
        fetch("http://localhost:8000/librosAlmacenados", {        //revisar que efectivamente sea ../insert
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
                    msgAlerta: resultado.status,
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
              <FormControl as="select" name="id_almacen" placeholder="Nombre de almacen" onChange={this.almacenChange} value={this.state.id_almacen}>
                <option value="">Seleccione el almacen</option>
                  {this.state.almacenes.map((item, index) =>{
                    return (
                      <option key={index} value={item.id_almacen}>{item.nombre}</option>
                    );
                  })
                }
              </FormControl>
              <Row>
                <Table striped bordered hover size="sm" >
                  <thead>
                    <tr>
                    <th className="align-middle">ID</th>
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
                                <FormControl as="select" name="id_autor" placeholder="Nombre de autor" onChangeCapture={this.autorChange} value={this.state.id_autor}>
                                  <option></option>
                                  {this.state.autores.map((item, index) => {
                                      return(
                                        <option key={index} value={item.id_autor}>{item.nombre}</option>
                                      );
                                    })
                                  }
                                </FormControl>
                                <FormLabel>Titulo:</FormLabel>
                                <FormControl as="select" name="id_libro" placeholder="Título." onChangeCapture={this.handleChange} value={this.state.id_libro} required={true}>
                                <option></option>
                                  {this.state.libros.map((item, index) => {
                                      return(
                                        <option key={index} value={item.id_libro} >{item.titulo}</option>
                                      );
                                    })
                                  }
                                </FormControl>
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