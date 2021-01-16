//import React from 'react';

import React from 'react';
import {Container, Image} from 'react-bootstrap';
import '../../SCSS/libreria.scss'

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
        }
        //this.fetchLibros();
    }

    fetchLibros = () => {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        fetch("http://localhost:3001/cliente", {
            method: "GET",
            headers: headers,
        })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            this.setState({
                libros: resultado.respuesta,
            });
        }).catch((error) => console.log("error: ", error));
    }

    render(){
        return(
            <main className="cuerpo">
                <div className="banner">
                    <Image className="banner-img" src="https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg" fluid></Image>
                 {/*<Image className="banner-img" src="https://i.pinimg.com/originals/09/2b/8e/092b8e002e1e7b3ddc6fec7cf70b1b88.jpg" fluid></Image> */}
                    <p className="centered"><strong>Suscribete</strong></p>
                </div>

                {/*---------------------------------------------------------------------------------------------------------------- 
                Recepcion automatica de libros de la BD.
                En cuanto la base de datos este lista, jalar los libros dinamicamente de la BD.

                <Container className="popular"></Container>
                    {this.state.libros.map((item) => {
                        return (
                            <Book titulo={item.titulo} author={item.autor} precio={item.precio} portada={item.portada} ></Book>
                        );
                    })}
                <Container className="popular"></Container> 

                ----------------------------------------------------------------------------------------------------------------*/}
                
                <Container className="popular">
                    <Book titulo="C# 7.0 in a nutshell" autor="Joseph Albahari" precio="0.00" portada="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book titulo="Teach yourself c++" author="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="Teach yourself c++" author="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="Teach yourself c++" author="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="Teach yourself c++" author="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book titulo="Teach yourself c++" author="Jesse Liberty" precio="0.00" portada="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                </Container>
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