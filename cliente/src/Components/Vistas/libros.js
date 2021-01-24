import React from 'react';
import {Container, Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/Base.scss';
import Popup from 'reactjs-popup';

export default class Libros extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            id_libro: "",
            titulo: "",
            isbn: "",
            anio_publicacion: "",
            descripcion: "",
            //autor: "",
            //editorial: "",
            //categoria: "",
            precio_electronico: "",
            precio_fisico: "",
            fecha_impresion: "",
            lugar_impresion: "",
            pdf: "",
            portada_url: "",
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

    handlePopupClose = () => {
      this.setState({
        id_libro: "",
        isbn: "",
        anio_publicacion: "",
        descripcion: "",
        titulo: "",
        precio_electronico: "",
        precio_fisico: "",
        lugar_impresion: "",
        fecha_impresion: "",
        tamanio: "",
        portada_url: "",
        open: false,
        update: false,
        update_message: 'Agregar libro',
      });
    }

    editControl = (item) => {
      console.log(item);
      this.setState({
        id_libro: item.id_libro,
        isbn: item.isbn,
        anio_publicacion: item.anio_publicacion,
        descripcion: item.descripcion,
        titulo: item.titulo,
        precio_electronico: item.precio_electronico,
        precio_fisico: item.precio_fisico,
        lugar_impresion: item.lugar_impresion,
        fecha_impresion: item.fecha_impresion,
        tamanio: item.tamanio,
        portada_url: item.url,
        update: true,
        update_message: "Actualizar libro",
        open: true,
      });
      console.log("id: ", item.id_autor);
    }

    fetchRegistros = () => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch("http://localhost:8000/libros", {
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
          titulo: this.state.titulo,
          isbn: this.state.isbn,
          anio_publicacion: this.state.anio_publicacion,
          descripcion: this.state.descripcion,
          //autor: this.state.autor,
          //editorial: this.state.editorial,
          //categoria: this.state.categoria,
          ebook: this.state.ebook,
          precio_electronico: this.state.precio_electronico,
          tamanio: this.state.tamanio,
          papel: this.state.papel,
          precio_fisico: this.state.precio_fisico,
          lugar_impresion: this.state.lugar_impresion,
          fecha_impresion: this.state.fecha_impresion,
          pdf: this.state.pdf,
          portada_url: this.state.portada_url,
      });
      console.log("Solicitut mandada");
      fetch("http://localhost:8000/libros", {
          method: "POST",
          headers: headers,
          body: body
      }).then((respuesta) => respuesta.json())
          .then((resultado) => {
              console.log(resultado);     //para verificar que se haya recibido
              this.setState({
                  id_libro: resultado.id_libro,
                  titulo: '',
                  isbn: '',
                  anio_publicacion: '',
                  descripcion: '',
                  precio_electronico: '',
                  tamanio: '',
                  precio_fisico: '',
                  lugar_impresion: '',
                  fecha_impresion: '',
                  pdf: '',
                  portada_url: '',
                  alerta: true,
                  msgAlerta: resultado.status,
                  tipoAlerta: "success",
              })
          })
  }

    editRegistro(e){
      e.preventDefault();
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      var body = JSON.stringify({
        titulo: this.state.titulo,
        isbn: this.state.isbn,
        anio_publicacion: this.state.anio_publicacion,
        descripcion: this.state.descripcion,
        //autor: this.state.autor,
        //editorial: this.state.editorial,
        //categoria: this.state.categoria,
        precio_electronico: this.state.precio_electronico,
        tamanio: this.state.tamanio,
        precio_fisico: this.state.precio_fisico,
        lugar_impresion: this.state.lugar_impresion,
        fecha_impresion: this.state.fecha_impresion,
        pdf: this.state.pdf,
        portada: this.state.portada_url,
      })
      console.log("A enviar actualizacion: ", body);
      fetch(`http://localhost:8000/libros/${this.state.id_libro}`, {        //revisar que efectivamente sea ../insert
          method: "PUT",
          headers: headers,
          body: body
      })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
          console.log(resultado);    
          this.setState({
            id_libro: resultado.id_libro,
            titulo: '',
            isbn: '',
            anio_publicacion: '',
            descripcion: '',
            precio_electronico: '',
            tamanio: '',
            precio_fisico: '',
            lugar_impresion: '',
            fecha_impresion: '',
            pdf: '',
            portada: '',
            alerta: true,
            msgAlerta: resultado.status,
            tipoAlerta: "success",
            disable_localidades: true,
            open: false,
            update: false,
            update_message: 'Agregar editorial',
          });
          this.fetchRegistros();
      });
    }

    eliminarRegistro(id_libro) {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(`http://localhost:8000/libros/${id_libro}`, {        //revisar que efectivamente sea ../insert
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
            <h1 className="h1">Libros</h1>
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
                      <th className="align-middle">Id</th>
                      <th className="align-middle">ISBN</th>
                      <th className="align-middle">Año Publicacion</th>
                      <th className="align-middle">Descripcion</th>
                      <th className="align-middle">Titulo</th>
                      <th className="align-middle">Precio Fisico</th>
                      <th className="align-middle">Precio Electronico</th>
                      <th className="align-middle">Tamaño</th>
                      <th className="align-middle">Fecha impresion</th>
                      <th className="align-middle">Lugar Impresion</th>
                      <th className="align-middle" colSpan="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.registros.map((item) => {
                      return (
                        <tr key={item.id_libro}>
                          <td className="align-middle">{item.id_libro}</td>
                          <td className="align-middle">{item.titulo}</td>
                          <td className="align-middle">{item.isbn}</td>
                          <td className="align-middle">{item.anio_publicacion}</td>
                          <td className="align-middle">{item.descripcion}</td>
                          <td className="align-middle">{item.precio_electronico}</td>
                          <td className="align-middle">{item.tamanio}</td>
                          <td className="align-middle">{item.precio_fisico}</td>
                          <td className="align-middle">{item.fecha_impresion}</td>
                          <td className="align-middle">{item.lugar_impresion}</td>
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
            <Button variant="info" onClick={(e) => {this.setState({open: true,})}}>Añadir nuevo</Button>
            <Popup open={this.state.open} onClose={this.handlePopupClose} position="center center">
                <Form action="http://localhost:3001/libros" onSubmit={(e) => {this.state.update ?  this.editRegistro(e) : this.addRegistro(e)}}>
                <h2>Registro de libro</h2><hr></hr>
                <Container className="contenedor-1">
                    <Container className="propietarios">
                        <FormLabel>Titulo:</FormLabel>
                        <FormControl type="text" name="titulo" placeholder="Título." onChange={this.handleChange} value={this.state.titulo} required={true}/>
                        <FormLabel>ISBN:</FormLabel>
                        <FormControl type="text" name="isbn" placeholder="ISBN." onChange={this.handleChange} value={this.state.isbn} required={true}/>
                        <FormLabel>Año de publicación:</FormLabel> 
                        <FormControl type="text" name="anio_publicacion" placeholder="Año de publicación." onChange={this.handleChange} value={this.state.anio_publicacion}/>
                    </Container>
                    <Container className="foraneos">
                        <FormLabel>Autor:</FormLabel>
                        <FormControl as="select" name="autor">
                            <option value="">ejemplo1</option>
                            <option value="">ejemplo2</option>
                        </FormControl>
                        <FormLabel>Editorial:</FormLabel>
                        <FormControl as="select" name="editorial">
                            <option value="">ejemplo1</option>
                            <option value="">ejemplo2</option>
                        </FormControl>
                        <FormLabel>Categoria:</FormLabel>
                        <FormControl as="select" name="categoria">
                            <option value="">ejemplo1</option>
                            <option value="">ejemplo2</option>
                        </FormControl>
                    </Container>
                </Container>
                <Container className="contenedor-2">
                    <Container className="largos">
                        <FormLabel>Descripcion:</FormLabel>
                        <FormControl type="text" name="descripcion" placeholder="Descripción." onChange={this.handleChange} value={this.state.descripcion || ''}/>
                        <FormLabel>Portada (URL):</FormLabel>
                        <FormControl type="url" name="portada_url" placeholder="URL de la imagen de portada." onChange={this.handleChange} value={this.state.portada_url || ''}/>    
                    </Container>
                </Container><br></br>
                <Container className="contenedor-3">
                    <Container className="electronico">
                        <h4>Electrónico:</h4>
                        <FormLabel>Precio:</FormLabel>
                        <FormControl type="number" name="precio_electronico" placeholder="Precio del ebook." onChange={this.handleChange} value={this.state.precio_electronico}/>
                        <FormLabel>Tamaño:</FormLabel>
                        <FormControl type="number" name="tamanio"  placeholder="Tamaño del archivo en MB." onChange={this.handleChange} value={this.state.tamanio}/>
                        <FormLabel>Archivo:</FormLabel>
                        <FormControl type="file" name="pdf" placeholder="PDF del libro." onChange={this.handleChange} value={this.state.pdf}/>
                    </Container>
                    <Container className="papel">
                        <h4>Físico:</h4>
                        <FormLabel>Precio:</FormLabel>
                        <FormControl type="number" name="precio_fisico" placeholder="Precio del libro impreso." onChange={this.handleChange} value={this.state.precio_fisico}/>
                        <FormLabel>Lugar de impresión:</FormLabel>
                        <FormControl type="text" name="lugar_impresion" placeholder="Lugar de impresión." onChange={this.handleChange} value={this.state.lugar_impresion}/>
                        <FormLabel>Fecha de impresión:</FormLabel>
                        <FormControl type="date" name="fecha_impresion" onChange={this.handleChange} value={this.state.fecha_impresion}/>
                    </Container>
                </Container>
                <Button type="submit" className="submit" variant="primary" block>{this.state.update_message}</Button><br></br>
                </Form>
            </Popup>
          </div>
        );
    }
}
