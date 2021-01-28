import React, {createContext} from 'react';
import {Container, Alert, Button} from 'react-bootstrap';
import '../../SCSS/Base.scss'
import Carousel from 'react-multi-carousel';

const statusContext = createContext();

export default class Carrito extends React.Component {
    static contextType = statusContext;
    constructor(props){
        super(props);
        this.state = {
            libros: [],
            historial: [],
            libros_historial: [],
            open: false,
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
        };
        let status = {

        }
    }

    
    setStatus = (status) => {
        this.setState(({ status }));
      }

    componentDidMount(){
        this.fetchLibros()
        this.fetchHistory();
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    }; 

 /************************************************************************************************************************/


    onCompra = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let today = new Date();
        var body = JSON.stringify({
            email: JSON.parse(localStorage["appState"]).user.email,
            fecha_compra: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(),
        });
        console.log(body);
        fetch("http://127.0.0.1:8000/cestas", {
            method: "POST",
            headers: headers,
            body: body,
        })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log(resultado);
            this.fetchHistory();
        }).catch((error) => console.log("error: ", error));
    }

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

    fetchHistory = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            email: JSON.parse(localStorage["appState"]).user.email,
        });
        fetch("http://127.0.0.1:8000/history", {
            method: "POST",
            headers: headers,
            body: body,
        })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log(resultado);
            this.setState({
                historial: resultado.cestas,
                libros_historial: resultado.libros
            });
        }).catch((error) => console.log("error: ", error));
    }

/************************************************************************************************************************/

    render(){
        const responsive = {
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 5
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };
      return(
          <Container className="main">
            <h1 className="h1">Carrito de compras</h1><hr></hr>
            {this.state.alerta === true ? (
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
                        <statusContext.Provider value={{setStatus: this.setStatus, fetchLibros: this.fetchLibros}}>
                            <Book titulo={item.titulo} author="prueba" id_libro={item.id_libro} id_cesta={item.id_cesta}
                                precio={item.precio_fisico} portada={item.url} 
                                anio_publicacion={item.anio_publicacion} descripcion={item.descripcion}
                                nombre={item.nombre} apellidos={item.apellidos}></Book>
                        </statusContext.Provider>
                    </Container>
                );
            })}
            <Button id="btn-generar-pago" type="button" onClick={this.onCompra} variant="primary" block>
                Generar pago
            </Button><br></br><br></br>
            <h1 className="h1">Historial de compras</h1>
            <hr></hr>
            {this.state.historial.map((cesta, index) => {
                    return (
                        <Container className="container_history">
                            <h3>Compra de {cesta.fecha_compra}</h3>
                            <Carousel key={index} ssr containerClass="first-carousel-container" responsive={responsive} infinite={true} swipeable={false} removeArrowOnDeviceType={["tablet", "mobile"]}>
                            {this.state.libros_historial.map((item, index) => {
                                {if(cesta.id_cesta === item.id_cesta)
                                return(
                                    <img key={index} alt="" className="history" src={item.url}></img>
                                );
                                }
                            })}
                            </Carousel>
                        </Container>
                    );
                })}
            </Container>
        );
    }
}

class Book extends React.Component {
    static contextType = statusContext;

    constructor(props){
        super(props);
        this.state = {
            id_cesta: props.id_cesta,
            id_libro: props.id_libro,
            titulo: props.titulo,
            autor: props.autor,
            portada: props.portada,
            anio_publicacion: props.anio_publicacion,
            descripcion: props.descripcion,
            precio: props.precio,
            nombre: props.nombre,
            apellidos: props.apellidos
        }
    }

    onRemove = (id_cesta, id_libro) => {
        const {setStatus, fetchLibros} = this.context;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify({
            id_cesta: id_cesta,
            id_libro: id_libro
        });
        console.log(body);
        fetch("http://127.0.0.1:8000/remove", {
            method: "POST",
            headers: headers,
            body: body,
        })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            let status = {
                alerta: true,
                msgAlerta: "Libro removido del carrito",
                tipo: resultado.tipo
            }
            setStatus(status);
            fetchLibros();
        }).catch((error) => console.log("error: ", error));
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
                            Autor: {this.state.nombre} {this.state.apellidos}<br></br>
                            Año de publicación: {this.state.anio_publicacion}<br></br>
                            Descripción: {this.state.descripcion}<br></br>
                        </p>
                        <div>
                            <h3>
                                $65.80
                            </h3>
                            <button className="btn-eliminar" onClick={() => {this.onRemove(this.props.id_cesta, this.props.id_libro)}}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </Container>
        );
    };
};

//<div className="libro-mas">{this.state.autor}{this.state.anio_publicacion}{this.state.autor}{this.state.descripcion}</div>
                    
