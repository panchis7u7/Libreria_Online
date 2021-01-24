import React from 'react';
import Carousel from 'react-multi-carousel'; 
import "react-multi-carousel/lib/styles.css";
import '../../SCSS/libreria.scss';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
        }
    }

    componentDidMount(){
        this.fetchLibros();
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

                {/*----------------------------------------------------------------------------------------------------------------*/} 
                {/*Recepcion automatica de libros de la BD. En cuanto la base de datos este lista, jalar los libros dinamicamente de la BD.*/}

                <Carousel ssr containerClass="first-carousel-container" className="popular" responsive={responsive} infinite={true} swipeable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                    {this.state.libros.map((item, index) => {
                        return (
                            <Book key={index} titulo={item.titulo} author="prueba" precio={item.precio_fisico} portada={item.url} ></Book>
                        );
                    })}
                </Carousel>

                {/*----------------------------------------------------------------------------------------------------------------*/}
                {/*
                <Carousel ssr containerClass="first-carousel-container container" className="popular" responsive={responsive} infinite={true} swipeable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" autor="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" autor="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" autor="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" autor="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" autor="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                </Carousel>
                */}
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