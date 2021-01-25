import React from 'react';
import Carousel from 'react-multi-carousel';
import { Container } from 'react-bootstrap'; 
import "react-multi-carousel/lib/styles.css";
import '../../SCSS/libreria.scss';
import Popup from 'reactjs-popup';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
            open: false,
        }
    }

    createNotification = (type) => {
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
                                    <Book titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} ></Book>
                                    <button className="btn-agregar-carro" onClick={this.createNotification('error')}>+</button><NotificationContainer/>
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
                                    <Book titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} ></Book>
                                    <button className="btn-agregar-carro" onClick={() => {this.setState({open: true})}}>+</button>
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
                                    <Book titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} ></Book>
                                    <button className="btn-agregar-carro" onClick={() => {this.setState({open: true})}}>+</button>
                                    <Popup position="center center" open={this.state.open} onClose={this.onCloseHandler}>
                                        <div>Producto anadido!</div>
                                    </Popup>
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
            <div className="book-footer">
                <div className="book-price">Precio: ${this.state.precio}</div>
            </div>
        </div>
        );
    };
};

//4k -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_3840x2400.jpg
//HD -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg
//https://wallpaperscraft.com/download/monstera_leaves_art_128418/3840x2400
//Muy buena imagen para algun fondo!