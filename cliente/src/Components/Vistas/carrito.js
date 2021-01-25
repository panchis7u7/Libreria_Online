import React from 'react';
import {Container, Alert} from 'react-bootstrap';
import '../../SCSS/Base.scss'

export default class Carrito extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
            open: false,
        };
    }

    componentDidMount(){
        this.fetchLibros()
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    }; 

    fetchLibros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://127.0.0.1:8000/basic", {
            method: "GET",
            headers: headers,
        })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log(resultado);
            this.setState({
                libros: resultado,
            });
        }).catch((error) => console.log("error: ", error));
    };

/************************************************************************************************************************/

    render(){
      return(
          <div className="main">
            <Container>
            <h1 className="h1">Carrito de compras</h1><hr></hr>
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
                {this.state.libros.map((item, index) => {
                            return (
                                <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <Book titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} ></Book>
                                    <button className="btn-agregar-carro" onClick={() => {this.createNotification(item)}}>+</button>
                                </div>
                            );
                        })}
            </Container>
            </div>
        );
    }
}

class Book extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            titulo: props.titulo,
            autor: props.autor,
            portada: props.portada,
            anio_publicacion: props.anio_publicacion,
            descripcion: props.descripcion,
            precio: props.precio,
            categoria: props.categoria,
        }
    }

    render(){
        return (
            <div className="book">
            <div className="book-top">
                <div className="book-title">{this.state.titulo}</div>
                <div className="book-authors">{this.state.autor}</div>
            </div>
            <div className="book-cover"
                style={{
                    width: 256,
                    height: 386,
                    backgroundImage:
                    `url('${this.state.portada}')`,
                }}/>
            <div className="book-footer">
                <div className="book-price">Precio: ${this.state.precio}</div>
            </div>
        </div>
        );
    };
};
