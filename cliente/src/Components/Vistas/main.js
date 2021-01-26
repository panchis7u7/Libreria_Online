import React from 'react';
import Carousel from 'react-multi-carousel';
import { Container, FormControl} from 'react-bootstrap'; 
import "react-multi-carousel/lib/styles.css";
import '../../SCSS/libreria.scss';
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
            open: false,
            tipo: '',
        }
    }

    createNotification(type){
        return () => {
          switch (type) {
            case 'success':
              NotificationManager.success('', 'Agregado al carrito!');
              break;
            case 'error':
              NotificationManager.error('Intente más tarde', 'Error', 3000);
              break;
          }
        }
    };

    componentDidMount(){
        this.fetchLibros();
    }

    onCloseHandler = (e) => {
        this.setState({
            open: false,
        });
    }

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    };

    fetchLibros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://127.0.0.1:8000/libros", {
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
    }

    insertarCarrito = (item) => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var body = JSON.stringify(item)
      console.log("A enviar: ", body);
      fetch("http://localhost:8000/cesta", {        //revisar que efectivamente sea ../insert
          method: "POST",
          headers: headers,
          body: body
      }).then((respuesta) => respuesta.json())
          .then((resultado) => {
              console.log(resultado);    
          });
    }

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
            <main className="cuerpo">
                <div className="banner">
                    <p className="bottom"><strong>Conoce un mundo<br></br>lleno de imaginacion</strong></p>
                </div>
                <section className="secciones">
                    <Container className="titulos">Nuestra mejor seleccion de libros</Container>
                    <Carousel ssr containerClass="first-carousel-container" className="popular" responsive={responsive} infinite={true} swipeable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                        {this.state.libros.map((item, index) => {
                            return (
                                <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <Book titulo={item.titulo} author="prueba" portada={item.url} ></Book>
                                    <FormControl as="select" name="tipo" onChange={this.handleChange}>
                                        <option disabled={!(item.precio_fisico)} value={"Fisico"}>Fisico ${item.precio_fisico}</option>
                                        <option disabled={!(item.precio_electronico)} value={"Electronico"}>Electronico ${item.precio_electronico}</option>
                                    </FormControl>
                                    <button className="btn-agregar-carro" onClick={() => {this.insertarCarrito(item)}}>+</button>
                                </div>
                            );
                        })}
                    </Carousel>
                </section>
                <section className="secciones">
                    <Container className="titulos">Ciencia Ficcion</Container>
                    <Carousel ssr containerClass="first-carousel-container" className="popular" responsive={responsive} infinite={true} swipeable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                        {this.state.libros.map((item, index) => {
                            return (
                                <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <Book titulo={item.titulo} author="prueba" portada={item.url} ></Book>
                                    <FormControl as="select" name="tipo" onChange={this.handleChange}>
                                        <option disabled={!(item.precio_fisico)} value={"Fisico"}>Fisico ${item.precio_fisico}</option>
                                        <option disabled={!(item.precio_electronico)} value={"Electronico"}>Electronico ${item.precio_electronico}</option>
                                    </FormControl>
                                    <button className="btn-agregar-carro" onClick={() => {this.insertarCarrito(item)}}>+</button>
                                </div>
                            );
                        })}
                    </Carousel>
                </section>
                <section className="secciones">
                    <Container className="titulos">Terror!</Container>
                    <Carousel ssr containerClass="first-carousel-container" className="popular" responsive={responsive} infinite={true} swipeable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                        {this.state.libros.map((item, index) => {
                            return (
                                <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded">
                                    <Book titulo={item.titulo} author="prueba" portada={item.url} ></Book>
                                    <FormControl as="select" name="tipo" onChange={this.handleChange}>
                                        <option disabled={!(item.precio_fisico)} value={"Fisico"}>Fisico ${item.precio_fisico}</option>
                                        <option disabled={!(item.precio_electronico)} value={"Electronico"}>Electronico ${item.precio_electronico}</option>
                                    </FormControl>
                                    <button className="btn-agregar-carro" onClick={() => {this.insertarCarrito(item)}}>+</button>
                                </div>
                            );
                        })}
                    </Carousel>
                </section>
            </main>
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
            precio: props.precio,
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
                    width: 128,
                    height: 193,
                    backgroundImage:
                    `url('${this.state.portada}')`,
                }}/>
            {/*<div className="book-footer">
                <div className="book-price">Precio: ${this.state.precio}</div>
            </div>*/}
        </div>
        );
    };
};

//4k -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_3840x2400.jpg
//HD -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg
//https://wallpaperscraft.com/download/monstera_leaves_art_128418/3840x2400
//Muy buena imagen para algun fondo!