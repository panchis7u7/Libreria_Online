import React from 'react';
import {Container, Image} from 'react-bootstrap';
import '../../SCSS/libreria.scss'

export default class Libros extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            libros: [],
        }
    }

    render(){
        return(
            <main className="cuerpo">
                <Image className="banner" src="https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg" fluid></Image>
                <Container className="popular">
                    <Book cover="https://books.google.com.mx/books/content?id=HrE5DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72P6NFH_GBPZvGUdOjr2xW3m-csKeB1I0yHZV8-nCa9MMXKqXvdZzfyjtrv71UOmCvaxhnf5JCrkIXG-IgkSWnfqxxGinZ5Kz_uB4h0G6aujK_zvzcm1bsgu7-2QHrbvNoT3olX"></Book>
                    <Book cover="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book cover="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book cover="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book cover="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                    <Book cover="https://books.google.com.mx/books/content?id=hklfknZ02eMC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE734F10llLTI4kehZ9-lE2Y_uAMixskf6AFnezhhEWm8ItMX1GIF2yeIQ8TQR9LnkalqLTvSUzlLF-hfrwwx-uzlweSi3plk2EBMiHUMxKiPMyZW4VlGhnJ9tBq8UMCgcg4XYmsn"></Book>
                </Container>
            </main>
        );
    }
}

const Book = props => {
    const { cover } = props;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-title">C# in a nutshell 7.0</div>
                <div className="book-authors">Joseph Albahari</div>
            </div>
        <div className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage:
                `url('${cover}')`,
            }}/>
        </div>
    );
};

//4k -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_3840x2400.jpg
//HD -> https://images.wallpaperscraft.com/image/monstera_leaves_art_128418_1920x1080.jpg
//https://wallpaperscraft.com/download/monstera_leaves_art_128418/3840x2400
//Muy buena imagen para algun fondo!