import React from 'react';
import {Container, Alert, Button} from 'react-bootstrap';
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

    /*fetchLibros = () => {
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
    };*/

    fetchLibros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            email: JSON.parse(localStorage["appState"]).user.email,
        });
        fetch("http://127.0.0.1:8000/getCarritos", {
            method: "POST",
            headers: headers,
            body: body,
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
                        <Container key={index} className="carrito">
                                <Book titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} 
                                    anio_publicacion={item.anio_publicacion} descripcion={item.descripcion}></Book>
                        </Container>
                    );
                })}
                <Button id="btnSend" type="submit" variant="primary" block>
                    Generar pago
                </Button><br></br>
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
        }
    }

    render(){
        return (
            <Container className="libro-descrip">
                <div className="libro-cover"
                    style={{
                        width: 128,
                        height: 190,
                        backgroundImage:
                        `url('${this.state.portada}')`,
                }}/>
                <div className="libro-contenido">
                    <div className="libro-title">{this.state.titulo}</div><br></br>
                    <div className="libro-mas">
                        <p>
                            Autor: <br></br>
                            Año de publicación: <br></br>
                            Descripción: <br></br>
                        </p>
                    </div>
                    <button className="btn-eliminar">Eliminar</button>
                </div>
            </Container>
        );
    };
};

//<div className="libro-mas">{this.state.autor}{this.state.anio_publicacion}{this.state.autor}{this.state.descripcion}</div>
                    
