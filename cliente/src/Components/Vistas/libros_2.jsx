import React from 'react';
import MaterialTable from 'material-table';
import {Container, Form, FormControl, FormLabel, Button, Alert, Row, Table} from 'react-bootstrap';
import '../../SCSS/Base.scss';
import Popup from 'reactjs-popup';

const columnas = [
    {
      title: 'ID',
      field: 'id',
      type: 'numeric'
    },
    {
      title: 'Titulo',
      field: 'titulo'
    },
    {
      titlle: 'ISBN',
      field: 'isbn'
    },
    {
      title: 'Autor',
      field: 'autor'
    },
    {
      title: 'Editorial',
      field: 'editorial'
    },
    {
      title: 'Año Publicacion',
      field: 'anio_publicacion'
    },
    {
      title: 'Descripcion',
      field: 'descripcion'
    },
    {
      title: 'Precio Fisico',
      field: 'precio_fisico'
    },
    {
      titlle: 'Precio Electronico',
      field: 'precio_electronico'
    },
    {
      title: 'Tamaño',
      field: 'tamanio'
    },
    {
      title: 'Genero',
      field: 'genero'
    },
    {
      title: 'Fecha Impresion',
      field: 'fecha_impresion'
    },
];

export default class Libros extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            autores: [],
            generos: [],
            editoriales: [],
        }
    }

    componentDidMount(){
        this.fetchLibros();
    }

    fetchLibros = async () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        await fetch("http://localhost:8000/libros", {
          method: "GET",
          headers: headers,
        })
          .then((respuesta) => respuesta.json())
          .then((resultado) => {
            console.log("resultado: ", resultado);
            this.setState({data: resultado})
        })
        .catch((error) => console.log("error: ", error));
    };

    getAutores = async() => {
        let headers = new Headers();
          headers.append("Content-Type", "application/json");
          await fetch("http://localhost:8000/autores", {
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
  
      getEditoriales = async() => {
        let headers = new Headers();
          headers.append("Content-Type", "application/json");
          await fetch("http://localhost:8000/editoriales", {
            method: "GET",
            headers: headers,
          })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
              console.log(resultado);
                this.setState({
                  editoriales: resultado,
                });
          })
          .catch((error) => {
            console.log("error: ", error)
            return error;
        });
      }
  
      getGeneros = async() => {
        let headers = new Headers();
          headers.append("Content-Type", "application/json");
          await fetch("http://localhost:8000/generos", {
            method: "GET",
            headers: headers,
          })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
              console.log(resultado);
                this.setState({
                  generos: resultado,
                });
          })
          .catch((error) => {
            console.log("error: ", error)
            return error;
        });
      }

    render(){
        return (
            <div className="tabla-material">
                <MaterialTable
                title = "Libros."
                columns={columnas}
                data={this.state.data}
                actions = {[
                    {
                        icon: 'edit',
                        tooltip: 'Editar Libro',
                        onClick: (e, fila)=>alert('Hola')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar Libro',
                        onClick: (e, fila)=>alert('Hola')
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    }
                }}>
                </MaterialTable>
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
                        <FormControl as="select" name="autor" onChange={this.handleChange} value={this.state.autor} required>
                          <option value="">Seleccione el autor</option>
                            {this.state.autores.map((item, index) =>{
                              return (
                                <option key={index} value={item.autor}>{item.nombre}</option>
                              );
                            })
                          }
                        </FormControl>
                        <FormLabel>Editorial:</FormLabel>
                        <FormControl as="select" name="editorial" onChange={this.handleChange} value={this.state.editorial} required>
                        <option value="">Seleccione la editorial</option>
                            {this.state.editoriales.map((item, index) =>{
                              return (
                                <option key={index} value={item.editorial}>{item.nombre}</option>
                              );
                            })
                          }
                        </FormControl>
                        <FormLabel>Categoria:</FormLabel>
                        <FormControl as="select" name="categoria" onChange={this.handleChange} value={this.state.categoria} required>
                          <option value="">Seleccione la categoria</option>
                          {this.state.generos.map((item, index) =>{
                              return (
                                <option key={index} value={item.genero}>{item.genero}</option>
                              );
                            })
                          }
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
                        <FormControl type="number" name="tamanio"  placeholder="Tamaño en MB." onChange={this.handleChange} value={this.state.tamanio}/>
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
                <Button type="submit" id="btnSend" variant="primary" block>{this.state.update_message}</Button><br></br>
                </Form>
            </Popup>
            </div>
        );
    }
}