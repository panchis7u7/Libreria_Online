import React from 'react';
import {Container, Image,Form, FormControl, FormLabel, Button, Alert, Col, DropdownButton, InputGroup} from 'react-bootstrap';
import '../../SCSS/libreria.scss'

export default class Libros extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id_libro: "",
            titulo: "",
            isbn: "",
            anio_publicacion: "",
            descripcion: "",
            autor: "",
            editorial: "",
            //categoria: "",
            ebook: "",
            precio_electronico: "",
            tamanio: "",
            papel: "",
            precio_fisico: "",
            fecha_impresion: "",
            lugar_impresion: "",
            //pdf: "",
            //portada: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
        };
        this.fetchRegistros();
    }

    //componentDidMount(){this.fetchRegistros()};

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };
    
    fetchRegistros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3001/libros", {
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
            id_libro: this.state.id_libro,
            titulo: this.state.titulo,
            isbn: this.state.isbn,
            anio_publicacion: this.state.anio_publicacion,
            descripcion: this.state.descripcion,
            autor: this.state.autor,
            editorial: this.state.editorial,
            //categoria: this.state.categoria,
            ebook: this.state.ebook,
            precio_electronico: this.state.precio_electronico,
            tamanio: this.state.tamanio,
            papel: this.state.papel,
            precio_fisico: this.state.precio_fisico,
            lugar_impresion: this.state.lugar_impresion,
            fecha_impresion: this.state.fecha_impresion,
        })
        fetch("http://localhost:3001/libros", {
            method: "POST",
            headers: headers,
            body: body
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);     //para verificar que se haya recibido
                this.setState({
                    id_libro: "",
                    titulo: "",
                    isbn: "",
                    anio_publicacion: "",
                    descripcion: "",
                    autor: "",
                    editorial: "",
                    //categoria: "",
                    ebook: "",
                    precio_electronico: "",
                    tamanio: "",
                    papel: "",
                    precio_fisico: "",
                    fecha_impresion: "",
                    lugar_impresion: "",
                    //pdf: "",
                    //portada: "",
                    alerta: true,
                    msgAlerta: resultado.response,
                    tipoAlerta: "success",
                })
            })
    }

    render(){
        return(
            <div>
                <Container className="contenedor">
                    <h2>Registro de libro</h2>
                    <FormLabel>Titulo:</FormLabel>
                    <FormControl type="text" name="titulo" placeholder="Ingrese el título." onChange={this.handleChange} value={this.state.titulo} required={true}/>
                    <FormLabel>ISBN:</FormLabel>
                    <FormControl type="text" name="isbn" placeholder="Ingrese el ISBN." onChange={this.handleChange} value={this.state.isbn} required={true}/>
                    <FormLabel>Año de publicación:</FormLabel> 
                    <FormControl type="text" name="anio_publicacion" placeholder="Ingrese el año de publicación." onChange={this.handleChange} value={this.state.anio_publicacion}/>
                    <FormLabel>Descripcion:</FormLabel>
                    <FormControl type="text" name="descripcion" placeholder="Ingrese el descripción." onChange={this.handleChange} value={this.state.descripcion}/>
                    
                    <FormLabel>Electrónico:</FormLabel>
                    <FormControl type="checkbox" name="ebook" onChange={this.handleChange} value={this.state.ebook}/>
                    <FormLabel>Precio:</FormLabel>
                    <InputGroup className="precio_e">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" name="precio_electronico" placeholder="Precio del ebook." onChange={this.handleChange} value={this.state.precio_electronico}/>
                    </InputGroup>
                    <FormLabel>Tamaño:</FormLabel>
                    <FormControl type="text" name="tamanio" onChange={this.handleChange} value={this.state.tamanio}/>

                    <FormLabel>En papel:</FormLabel>
                    <FormControl type="checkbox" name="papel" onChange={this.handleChange} value={this.state.papel}/>
                    <FormLabel>Precio:</FormLabel>
                    <InputGroup className="precio_f">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="number" name="precio_fisico" placeholder="Precio del libro impreso." onChange={this.handleChange} value={this.state.precio_fisico}/>
                    </InputGroup>
                    <FormLabel>Lugar de impresion:</FormLabel>
                    <FormControl type="text" name="lugar_impresion" onChange={this.handleChange} value={this.state.lugar_impresion}/>
                    <FormLabel>Fecha de impresion:</FormLabel>
                    <FormControl type="text" name="fecha_impresion" onChange={this.handleChange} value={this.state.fecha_impresion}/><br></br>
                    <Button type="submit" onClick={this.addRegistro} variant="primary" block>
                        Agregar libro
                    </Button><br></br>
                </Container>
            </div>
        );
    }
}

/*
                    <DropdownButton id="dropdown-basic-button" title="Tipo del libro ..?">
                        <Dropdown.Item href="#/action-1">Electrónico</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Papel</Dropdown.Item>
                    </DropdownButton> 

                    esto sirve para hacer un menu desplegable en caso de que se requiera para elegir tipo
*/
